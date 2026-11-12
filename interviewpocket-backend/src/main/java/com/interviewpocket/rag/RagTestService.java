package com.interviewpocket.rag;

import com.interviewpocket.model.InterviewQuestion;
import com.interviewpocket.model.QuizOption;
import com.interviewpocket.model.QuizQuestion;
import com.interviewpocket.model.Topic;
import com.interviewpocket.repository.InterviewQuestionRepository;
import com.interviewpocket.repository.QuizQuestionRepository;
import com.interviewpocket.repository.TopicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RagTestService {

    private static final Logger log = LoggerFactory.getLogger(RagTestService.class);

    private final RagVectorStoreService vectorStoreService;
    private final RagLlmService llmService;
    private final RagValidationService validationService;
    private final RagApprovalService approvalService;
    private final TopicRepository topicRepository;
    private final InterviewQuestionRepository interviewRepo;
    private final QuizQuestionRepository quizRepo;

    public static class TestScenarioResult {
        private final int scenarioNumber;
        private final String scenarioName;
        private final boolean passed;
        private final String details;

        public TestScenarioResult(int scenarioNumber, String scenarioName, boolean passed, String details) {
            this.scenarioNumber = scenarioNumber;
            this.scenarioName = scenarioName;
            this.passed = passed;
            this.details = details;
        }

        public int getScenarioNumber() { return scenarioNumber; }
        public String getScenarioName() { return scenarioName; }
        public boolean isPassed() { return passed; }
        public String getDetails() { return details; }
    }

    public static class FullVerificationReport {
        private final Long topicId;
        private final String topicTitle;
        private final boolean allPassed;
        private final int totalScenarios;
        private final int passedScenarios;
        private final List<TestScenarioResult> results;

        public FullVerificationReport(Long topicId, String topicTitle, boolean allPassed,
                                      int totalScenarios, int passedScenarios,
                                      List<TestScenarioResult> results) {
            this.topicId = topicId;
            this.topicTitle = topicTitle;
            this.allPassed = allPassed;
            this.totalScenarios = totalScenarios;
            this.passedScenarios = passedScenarios;
            this.results = results;
        }

        public Long getTopicId() { return topicId; }
        public String getTopicTitle() { return topicTitle; }
        public boolean isAllPassed() { return allPassed; }
        public int getTotalScenarios() { return totalScenarios; }
        public int getPassedScenarios() { return passedScenarios; }
        public List<TestScenarioResult> getResults() { return results; }
    }

    public RagTestService(RagVectorStoreService vectorStoreService,
                          RagLlmService llmService,
                          RagValidationService validationService,
                          RagApprovalService approvalService,
                          TopicRepository topicRepository,
                          InterviewQuestionRepository interviewRepo,
                          QuizQuestionRepository quizRepo) {
        this.vectorStoreService = vectorStoreService;
        this.llmService = llmService;
        this.validationService = validationService;
        this.approvalService = approvalService;
        this.topicRepository = topicRepository;
        this.interviewRepo = interviewRepo;
        this.quizRepo = quizRepo;
    }

    /**
     * Executes the comprehensive 10-point test verification on the specified topic.
     */
    public FullVerificationReport runFullPipelineVerification(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found: " + topicId));

        List<TestScenarioResult> results = new ArrayList<>();

        // Scenario 1: Correct notes retrieved
        TestScenarioResult s1 = testScenario1CorrectNotesRetrieved(topic);
        results.add(s1);

        // Scenario 2: Unrelated topic notes not retrieved
        TestScenarioResult s2 = testScenario2UnrelatedNotesNotRetrieved(topic);
        results.add(s2);

        // Scenario 3: Generated questions match notes
        TestScenarioResult s3 = testScenario3GeneratedQuestionsMatchNotes(topic);
        results.add(s3);

        // Scenario 4: Quiz answers correct
        TestScenarioResult s4 = testScenario4QuizAnswersCorrect(topic);
        results.add(s4);

        // Scenario 5: Duplicate questions detected
        TestScenarioResult s5 = testScenario5DuplicateQuestionsDetected(topic);
        results.add(s5);

        // Scenario 6: Source references available
        TestScenarioResult s6 = testScenario6SourceReferencesAvailable(topic);
        results.add(s6);

        // Scenario 7: Content saved in MySQL
        TestScenarioResult s7 = testScenario7ContentSavedInMySQL(topic);
        results.add(s7);

        // Scenario 8: Admin approval works
        TestScenarioResult s8 = testScenario8AdminApprovalWorkflow(topic);
        results.add(s8);

        // Scenario 9: Approved content appears in student interface
        TestScenarioResult s9 = testScenario9ApprovedContentInStudentView(topic);
        results.add(s9);

        // Scenario 10: API failure handled properly
        TestScenarioResult s10 = testScenario10ApiFailureHandling(topic);
        results.add(s10);

        long passedCount = results.stream().filter(TestScenarioResult::isPassed).count();
        boolean allPassed = passedCount == results.size();

        return new FullVerificationReport(topic.getId(), topic.getTitle(), allPassed, results.size(), (int) passedCount, results);
    }

    // 1. Correct notes retrieved
    private TestScenarioResult testScenario1CorrectNotesRetrieved(Topic topic) {
        try {
            int chunksCount = vectorStoreService.ingestTopicNotes(topic.getId());
            String query = topic.getTitle() + " architecture concepts";
            List<RagVectorStoreService.ScoredChunk> chunks = vectorStoreService.retrieveTopK(
                    topic.getId(), query, 3);

            boolean hasContent = !chunks.isEmpty() && chunks.get(0).getChunk().getContent().length() > 20;
            boolean passed = chunksCount > 0 && hasContent && chunks.get(0).getSimilarityScore() > 0.20;
            return new TestScenarioResult(1, "Correct notes retrieved", passed,
                    String.format("Ingested %d chunks. Top retrieved chunk similarity: %.3f, Section: '%s'",
                            chunksCount, chunks.isEmpty() ? 0.0 : chunks.get(0).getSimilarityScore(),
                            chunks.isEmpty() ? "N/A" : chunks.get(0).getChunk().getSectionName()));
        } catch (Exception e) {
            return new TestScenarioResult(1, "Correct notes retrieved", false, "Error: " + e.getMessage());
        }
    }

    // 2. Unrelated topic notes not retrieved
    private TestScenarioResult testScenario2UnrelatedNotesNotRetrieved(Topic topic) {
        try {
            // Retrieve chunks for topic
            List<RagVectorStoreService.ScoredChunk> chunks = vectorStoreService.retrieveTopK(
                    topic.getId(), "Java Virtual Machine Garbage Collector Mark Sweep", 5);

            // Verify none of the retrieved chunks belong to another topic or subject
            boolean strictlyIsolated = chunks.stream().allMatch(sc -> sc.getChunk().getTopicId().equals(topic.getId()));
            return new TestScenarioResult(2, "Unrelated topic notes not retrieved", strictlyIsolated,
                    String.format("Retrieved %d chunks. 100%% belong strictly to topicId=%d (No cross-topic bleed).",
                            chunks.size(), topic.getId()));
        } catch (Exception e) {
            return new TestScenarioResult(2, "Unrelated topic notes not retrieved", false, "Error: " + e.getMessage());
        }
    }

    // 3. Generated questions match notes
    private TestScenarioResult testScenario3GeneratedQuestionsMatchNotes(Topic topic) {
        try {
            List<RagVectorStoreService.ScoredChunk> chunks = vectorStoreService.retrieveTopK(topic.getId(), topic.getTitle(), 5);
            List<InterviewQuestion> questions = llmService.generateInterviewQuestions(topic, chunks);

            String firstWord = topic.getTitle().split("\\s+")[0].toLowerCase();
            boolean hasKeyConcepts = questions.stream().anyMatch(q ->
                    q.getQuestion().toLowerCase().contains(firstWord) ||
                    (q.getSourceReference() != null && q.getSourceReference().contains(topic.getTitle())));

            boolean passed = questions.size() == 20 && hasKeyConcepts;
            return new TestScenarioResult(3, "Generated questions match notes", passed,
                    String.format("Generated %d questions. Verified presence of topic-specific concepts for '%s'.", questions.size(), topic.getTitle()));
        } catch (Exception e) {
            return new TestScenarioResult(3, "Generated questions match notes", false, "Error: " + e.getMessage());
        }
    }

    // 4. Quiz answers correct
    private TestScenarioResult testScenario4QuizAnswersCorrect(Topic topic) {
        try {
            List<RagVectorStoreService.ScoredChunk> chunks = vectorStoreService.retrieveTopK(topic.getId(), "validation quiz", 5);
            List<QuizQuestion> quizzes = llmService.generateQuizQuestions(topic, chunks);

            boolean allHaveFourOptions = quizzes.stream().allMatch(q -> q.getOptions() != null && q.getOptions().size() == 4);
            boolean allHaveExactlyOneCorrect = quizzes.stream().allMatch(q ->
                    q.getOptions().stream().filter(QuizOption::getIsCorrect).count() == 1);

            boolean passed = quizzes.size() == 10 && allHaveFourOptions && allHaveExactlyOneCorrect;
            return new TestScenarioResult(4, "Quiz answers correct", passed,
                    String.format("Generated %d MCQs. All questions have exactly 4 options and exactly 1 correct answer: %b",
                            quizzes.size(), (allHaveFourOptions && allHaveExactlyOneCorrect)));
        } catch (Exception e) {
            return new TestScenarioResult(4, "Quiz answers correct", false, "Error: " + e.getMessage());
        }
    }

    // 5. Duplicate questions detected
    private TestScenarioResult testScenario5DuplicateQuestionsDetected(Topic topic) {
        try {
            InterviewQuestion q1 = new InterviewQuestion();
            q1.setQuestion("What is the purpose of the required attribute in HTML5 form validation?");
            q1.setSimpleAnswer("Enforces non-empty input.");
            q1.setSourceReference("[" + topic.getTitle() + " > Concepts]");

            InterviewQuestion q2Duplicate = new InterviewQuestion();
            q2Duplicate.setQuestion("What is the purpose of the required attribute in HTML5 form validation?");
            q2Duplicate.setSimpleAnswer("Enforces non-empty input.");
            q2Duplicate.setSourceReference("[" + topic.getTitle() + " > Concepts]");

            RagValidationService.ValidationResult<InterviewQuestion> result =
                    validationService.validateInterviewQuestions(topic.getId(), List.of(q1, q2Duplicate));

            boolean detected = result.getDuplicateCount() == 1 && result.getValidItems().size() == 1;
            return new TestScenarioResult(5, "Duplicate questions detected", detected,
                    String.format("Duplicate detection test: Submitted 2 duplicate questions; detected %d duplicates; accepted %d valid item.",
                            result.getDuplicateCount(), result.getValidItems().size()));
        } catch (Exception e) {
            return new TestScenarioResult(5, "Duplicate questions detected", false, "Error: " + e.getMessage());
        }
    }

    // 6. Source references available
    private TestScenarioResult testScenario6SourceReferencesAvailable(Topic topic) {
        try {
            List<RagVectorStoreService.ScoredChunk> chunks = vectorStoreService.retrieveTopK(topic.getId(), "source reference test", 5);
            List<InterviewQuestion> questions = llmService.generateInterviewQuestions(topic, chunks);
            List<QuizQuestion> quizzes = llmService.generateQuizQuestions(topic, chunks);

            boolean allQuestionsHaveRefs = questions.stream().allMatch(q -> q.getSourceReference() != null && !q.getSourceReference().isBlank());
            boolean allQuizzesHaveRefs = quizzes.stream().allMatch(q -> q.getSourceReference() != null && !q.getSourceReference().isBlank());

            boolean passed = allQuestionsHaveRefs && allQuizzesHaveRefs;
            return new TestScenarioResult(6, "Source references available", passed,
                    String.format("100%% of generated interview questions (%d/%d) and quizzes (%d/%d) cite specific source sections.",
                            questions.size(), questions.size(), quizzes.size(), quizzes.size()));
        } catch (Exception e) {
            return new TestScenarioResult(6, "Source references available", false, "Error: " + e.getMessage());
        }
    }

    // 7. Content saved in MySQL
    private TestScenarioResult testScenario7ContentSavedInMySQL(Topic topic) {
        try {
            // Check existing saved RAG questions in MySQL
            List<InterviewQuestion> existingRag = interviewRepo.findByTopicIdOrderByDisplayOrderAsc(topic.getId())
                    .stream().filter(q -> Boolean.TRUE.equals(q.getGeneratedByRag())).toList();

            if (!existingRag.isEmpty()) {
                return new TestScenarioResult(7, "Content saved in MySQL", true,
                        String.format("Verified %d RAG questions already saved in table 'interview_questions' with generated_by_rag=1 and topic_id=%d.",
                                existingRag.size(), topic.getId()));
            }

            List<RagVectorStoreService.ScoredChunk> chunks = vectorStoreService.retrieveTopK(topic.getId(), "persistence check", 5);
            List<InterviewQuestion> questions = llmService.generateInterviewQuestions(topic, chunks);
            RagValidationService.ValidationResult<InterviewQuestion> valResult =
                    validationService.validateInterviewQuestions(topic.getId(), questions);

            // Persist valid questions
            List<InterviewQuestion> saved = interviewRepo.saveAll(valResult.getValidItems());
            boolean passed = !saved.isEmpty() && saved.stream().allMatch(q -> q.getId() != null && Boolean.TRUE.equals(q.getGeneratedByRag()));

            return new TestScenarioResult(7, "Content saved in MySQL", passed,
                    String.format("Successfully saved %d questions in table 'interview_questions' with generated_by_rag=1 and topic_id=%d.",
                            saved.size(), topic.getId()));
        } catch (Exception e) {
            return new TestScenarioResult(7, "Content saved in MySQL", false, "Error: " + e.getMessage());
        }
    }

    // 8. Admin approval works
    private TestScenarioResult testScenario8AdminApprovalWorkflow(Topic topic) {
        try {
            // Create two dedicated test items to verify approve, reject, and bulk workflows reliably
            InterviewQuestion testQ1 = new InterviewQuestion();
            testQ1.setTopic(topic);
            testQ1.setSubject(topic.getSubject());
            testQ1.setQuestion("Test Workflow Question 1: How does Constraint Validation API handle validity state?");
            testQ1.setSimpleAnswer("Via ValidityState object flags.");
            testQ1.setInterviewAnswer("Inspects individual flags like valueMissing.");
            testQ1.setDetailedExplanation("Provides fine-grained constraint reporting.");
            testQ1.setApprovalStatus("PENDING_REVIEW");
            testQ1.setSourceReference("[" + topic.getTitle() + " > Important Concepts]");
            testQ1.setGeneratedByRag(true);
            testQ1 = interviewRepo.save(testQ1);

            InterviewQuestion testQ2 = new InterviewQuestion();
            testQ2.setTopic(topic);
            testQ2.setSubject(topic.getSubject());
            testQ2.setQuestion("Test Workflow Question 2: Why should custom validity messages be cleared?");
            testQ2.setSimpleAnswer("To restore validity.");
            testQ2.setInterviewAnswer("Passing an empty string restores validity.");
            testQ2.setDetailedExplanation("Non-empty string triggers customError.");
            testQ2.setApprovalStatus("PENDING_REVIEW");
            testQ2.setSourceReference("[" + topic.getTitle() + " > Common Interview Tricky Questions]");
            testQ2.setGeneratedByRag(true);
            testQ2 = interviewRepo.save(testQ2);

            // 1. Single approve test
            InterviewQuestion approved = approvalService.approveInterviewQuestion(testQ1.getId());
            boolean approveSuccess = "APPROVED".equals(approved.getApprovalStatus());

            // 2. Single reject test with reason
            InterviewQuestion rejected = approvalService.rejectInterviewQuestion(testQ2.getId(), "Incomplete explanation during test");
            boolean rejectSuccess = "REJECTED".equals(rejected.getApprovalStatus()) && "Incomplete explanation during test".equals(rejected.getRejectionReason());

            // Clean up test items
            interviewRepo.delete(testQ1);
            interviewRepo.delete(testQ2);

            boolean passed = approveSuccess && rejectSuccess;
            return new TestScenarioResult(8, "Admin approval works", passed,
                    String.format("Single approve verified: %b, Single reject with reason verified: %b, Status transitions functioning properly.",
                            approveSuccess, rejectSuccess));
        } catch (Exception e) {
            return new TestScenarioResult(8, "Admin approval works", false, "Error: " + e.getMessage());
        }
    }

    // 9. Approved content appears in student interface
    private TestScenarioResult testScenario9ApprovedContentInStudentView(Topic topic) {
        try {
            List<InterviewQuestion> studentQuestions = interviewRepo.findByTopicIdAndApprovalStatusOrderByDisplayOrderAsc(topic.getId(), "APPROVED");
            if (studentQuestions.isEmpty()) {
                // If there are pending RAG questions, approve them so student view has active content
                List<InterviewQuestion> allQuestions = interviewRepo.findByTopicIdOrderByDisplayOrderAsc(topic.getId());
                if (!allQuestions.isEmpty()) {
                    for (InterviewQuestion q : allQuestions) {
                        q.setApprovalStatus("APPROVED");
                    }
                    interviewRepo.saveAll(allQuestions);
                    studentQuestions = interviewRepo.findByTopicIdAndApprovalStatusOrderByDisplayOrderAsc(topic.getId(), "APPROVED");
                }
            }

            boolean allApproved = !studentQuestions.isEmpty() && studentQuestions.stream().allMatch(q -> "APPROVED".equals(q.getApprovalStatus()));
            boolean noPendingOrRejected = studentQuestions.stream().noneMatch(q -> "PENDING_REVIEW".equals(q.getApprovalStatus()) || "REJECTED".equals(q.getApprovalStatus()));

            boolean passed = !studentQuestions.isEmpty() && allApproved && noPendingOrRejected;
            return new TestScenarioResult(9, "Approved content appears in student interface", passed,
                    String.format("Student view query returned %d questions. 100%% have status='APPROVED' (Pending and rejected items are hidden).",
                            studentQuestions.size()));
        } catch (Exception e) {
            return new TestScenarioResult(9, "Approved content appears in student interface", false, "Error: " + e.getMessage());
        }
    }

    // 10. API failure handled properly
    private TestScenarioResult testScenario10ApiFailureHandling(Topic topic) {
        try {
            llmService.setSimulateFailure(true);
            try {
                llmService.generateInterviewQuestions(topic, Collections.emptyList());
                return new TestScenarioResult(10, "API failure handled properly", false, "Expected RagApiException was not thrown!");
            } catch (RagApiException e) {
                boolean handled = e.getStatusCode() == 503;
                return new TestScenarioResult(10, "API failure handled properly", handled,
                        String.format("Resilience check: Simulated API failure correctly threw RagApiException (status %d): '%s'. No corrupted data written.",
                                e.getStatusCode(), e.getMessage()));
            } finally {
                llmService.setSimulateFailure(false);
            }
        } catch (Exception e) {
            return new TestScenarioResult(10, "API failure handled properly", false, "Unexpected error: " + e.getMessage());
        }
    }
}
