package com.interviewpocket.rag;

import com.interviewpocket.model.InterviewQuestion;
import com.interviewpocket.model.QuizQuestion;
import com.interviewpocket.model.Topic;
import com.interviewpocket.repository.InterviewQuestionRepository;
import com.interviewpocket.repository.QuizQuestionRepository;
import com.interviewpocket.repository.RagNoteChunkRepository;
import com.interviewpocket.repository.TopicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/rag")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RagController {

    private static final Logger log = LoggerFactory.getLogger(RagController.class);

    private final RagVectorStoreService vectorStoreService;
    private final RagLlmService llmService;
    private final RagValidationService validationService;
    private final RagApprovalService approvalService;
    private final RagTestService testService;
    private final TopicRepository topicRepository;
    private final InterviewQuestionRepository interviewRepo;
    private final QuizQuestionRepository quizRepo;
    private final RagNoteChunkRepository chunkRepo;

    public RagController(RagVectorStoreService vectorStoreService,
                         RagLlmService llmService,
                         RagValidationService validationService,
                         RagApprovalService approvalService,
                         RagTestService testService,
                         TopicRepository topicRepository,
                         InterviewQuestionRepository interviewRepo,
                         QuizQuestionRepository quizRepo,
                         RagNoteChunkRepository chunkRepo) {
        this.vectorStoreService = vectorStoreService;
        this.llmService = llmService;
        this.validationService = validationService;
        this.approvalService = approvalService;
        this.testService = testService;
        this.topicRepository = topicRepository;
        this.interviewRepo = interviewRepo;
        this.quizRepo = quizRepo;
        this.chunkRepo = chunkRepo;
    }

    @ExceptionHandler(RagApiException.class)
    public ResponseEntity<Map<String, Object>> handleRagApiException(RagApiException e) {
        log.error("RAG API Exception: {}", e.getMessage());
        Map<String, Object> body = new HashMap<>();
        body.put("status", "ERROR");
        body.put("error", "AI Model Error");
        body.put("message", e.getMessage());
        body.put("statusCode", e.getStatusCode());
        return ResponseEntity.status(e.getStatusCode()).body(body);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalStateException(IllegalStateException e) {
        Map<String, Object> body = new HashMap<>();
        body.put("status", "ERROR");
        body.put("error", "Pilot Scope Restriction or State Error");
        body.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    /**
     * Ingests, chunks, and embeds approved notes for a Frontend topic.
     */
    @PostMapping("/ingest/{topicId}")
    public ResponseEntity<Map<String, Object>> ingestTopic(@PathVariable Long topicId) {
        int chunkCount = vectorStoreService.ingestTopicNotes(topicId);
        Map<String, Object> res = new HashMap<>();
        res.put("status", "SUCCESS");
        res.put("topicId", topicId);
        res.put("chunksIngested", chunkCount);
        res.put("message", "Notes successfully chunked, embedded, and indexed in vector store.");
        return ResponseEntity.ok(res);
    }

    /**
     * Generates 20 interview questions using RAG (5 Beginner, 5 Intermediate, 5 Advanced, 5 Tricky).
     */
    @PostMapping("/generate-questions/{topicId}")
    public ResponseEntity<Map<String, Object>> generateQuestions(@PathVariable Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found: " + topicId));

        if (topic.getSubject() == null || topic.getSubject().getId() != 2L) {
            throw new IllegalStateException("RAG Pilot restriction: Generation is strictly allowed only for Frontend topics.");
        }

        // 1. Retrieve top context chunks
        List<RagVectorStoreService.ScoredChunk> chunks = vectorStoreService.retrieveTopK(
                topicId, topic.getTitle() + " interview questions core concepts working tricky answers", 8);

        // 2. LLM / Grounded generation
        List<InterviewQuestion> rawQuestions = llmService.generateInterviewQuestions(topic, chunks);

        // 3. Validation and duplicate detection
        RagValidationService.ValidationResult<InterviewQuestion> val =
                validationService.validateInterviewQuestions(topicId, rawQuestions);

        // 4. Save to MySQL with status PENDING_REVIEW
        List<InterviewQuestion> saved = interviewRepo.saveAll(val.getValidItems());

        Map<String, Object> res = new HashMap<>();
        res.put("status", "SUCCESS");
        res.put("topicId", topicId);
        res.put("topicTitle", topic.getTitle());
        res.put("generatedCount", rawQuestions.size());
        res.put("savedPendingReviewCount", saved.size());
        res.put("duplicateCountDetected", val.getDuplicateCount());
        res.put("rejectedReasons", val.getRejectedReasons());
        res.put("questions", saved);
        return ResponseEntity.ok(res);
    }

    /**
     * Generates 10 MCQs using RAG.
     */
    @PostMapping("/generate-quiz/{topicId}")
    public ResponseEntity<Map<String, Object>> generateQuiz(@PathVariable Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found: " + topicId));

        if (topic.getSubject() == null || topic.getSubject().getId() != 2L) {
            throw new IllegalStateException("RAG Pilot restriction: Generation is strictly allowed only for Frontend topics.");
        }

        // 1. Retrieve top context chunks
        List<RagVectorStoreService.ScoredChunk> chunks = vectorStoreService.retrieveTopK(
                topicId, topic.getTitle() + " multiple choice quiz options validation", 8);

        // 2. LLM / Grounded generation
        List<QuizQuestion> rawQuizzes = llmService.generateQuizQuestions(topic, chunks);

        // 3. Validation
        RagValidationService.ValidationResult<QuizQuestion> val =
                validationService.validateQuizQuestions(topicId, rawQuizzes);

        // 4. Save to MySQL with status PENDING_REVIEW
        List<QuizQuestion> saved = quizRepo.saveAll(val.getValidItems());

        Map<String, Object> res = new HashMap<>();
        res.put("status", "SUCCESS");
        res.put("topicId", topicId);
        res.put("topicTitle", topic.getTitle());
        res.put("generatedCount", rawQuizzes.size());
        res.put("savedPendingReviewCount", saved.size());
        res.put("duplicateCountDetected", val.getDuplicateCount());
        res.put("rejectedReasons", val.getRejectedReasons());
        res.put("quizzes", saved);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/pending-questions/{topicId}")
    public ResponseEntity<List<InterviewQuestion>> getPendingQuestions(@PathVariable Long topicId) {
        return ResponseEntity.ok(approvalService.getPendingInterviewQuestions(topicId));
    }

    @GetMapping("/pending-quizzes/{topicId}")
    public ResponseEntity<List<QuizQuestion>> getPendingQuizzes(@PathVariable Long topicId) {
        return ResponseEntity.ok(approvalService.getPendingQuizQuestions(topicId));
    }

    @PutMapping("/questions/{id}/approve")
    public ResponseEntity<InterviewQuestion> approveQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(approvalService.approveInterviewQuestion(id));
    }

    @PutMapping("/questions/{id}/reject")
    public ResponseEntity<InterviewQuestion> rejectQuestion(@PathVariable Long id, @RequestBody(required = false) Map<String, String> body) {
        String reason = body != null ? body.get("reason") : null;
        return ResponseEntity.ok(approvalService.rejectInterviewQuestion(id, reason));
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<InterviewQuestion> updateQuestion(@PathVariable Long id, @RequestBody InterviewQuestion question) {
        return ResponseEntity.ok(approvalService.updateInterviewQuestion(id, question));
    }

    @PutMapping("/quiz-questions/{id}/approve")
    public ResponseEntity<QuizQuestion> approveQuizQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(approvalService.approveQuizQuestion(id));
    }

    @PutMapping("/quiz-questions/{id}/reject")
    public ResponseEntity<QuizQuestion> rejectQuizQuestion(@PathVariable Long id, @RequestBody(required = false) Map<String, String> body) {
        String reason = body != null ? body.get("reason") : null;
        return ResponseEntity.ok(approvalService.rejectQuizQuestion(id, reason));
    }

    @PutMapping("/quiz-questions/{id}")
    public ResponseEntity<QuizQuestion> updateQuizQuestion(@PathVariable Long id, @RequestBody QuizQuestion question) {
        return ResponseEntity.ok(approvalService.updateQuizQuestion(id, question));
    }

    @PostMapping("/bulk-approve/{topicId}")
    public ResponseEntity<Map<String, Object>> bulkApprove(@PathVariable Long topicId) {
        return ResponseEntity.ok(approvalService.bulkApproveTopic(topicId));
    }

    /**
     * Executes the comprehensive 10-point test verification on the specified topic.
     */
    @GetMapping("/test-pipeline/{topicId}")
    public ResponseEntity<RagTestService.FullVerificationReport> runTestPipeline(@PathVariable Long topicId) {
        return ResponseEntity.ok(testService.runFullPipelineVerification(topicId));
    }

    /**
     * Topic RAG status and metric summary.
     */
    @GetMapping("/status/{topicId}")
    public ResponseEntity<Map<String, Object>> getTopicRagStatus(@PathVariable Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found: " + topicId));

        long chunkCount = chunkRepo.countByTopicId(topicId);
        long pendingQuestions = interviewRepo.countByTopicIdAndApprovalStatus(topicId, "PENDING_REVIEW");
        long approvedQuestions = interviewRepo.countByTopicIdAndApprovalStatus(topicId, "APPROVED");
        long pendingQuizzes = quizRepo.countByTopicIdAndApprovalStatus(topicId, "PENDING_REVIEW");
        long approvedQuizzes = quizRepo.countByTopicIdAndApprovalStatus(topicId, "APPROVED");

        Map<String, Object> res = new HashMap<>();
        res.put("topicId", topicId);
        res.put("topicTitle", topic.getTitle());
        res.put("subjectId", topic.getSubject() != null ? topic.getSubject().getId() : null);
        res.put("subjectSlug", topic.getSubject() != null ? topic.getSubject().getSlug() : null);
        res.put("vectorChunksCount", chunkCount);
        res.put("pendingQuestionsCount", pendingQuestions);
        res.put("approvedQuestionsCount", approvedQuestions);
        res.put("pendingQuizzesCount", pendingQuizzes);
        res.put("approvedQuizzesCount", approvedQuizzes);
        return ResponseEntity.ok(res);
    }
}

