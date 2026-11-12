package com.interviewpocket.controller;

import com.interviewpocket.dto.*;
import com.interviewpocket.model.Quiz;
import com.interviewpocket.model.QuizAttempt;
import com.interviewpocket.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getQuizzes(@RequestParam(required = false) Long subjectId) {
        if (subjectId != null) {
            return ResponseEntity.ok(quizService.getQuizzesBySubject(subjectId));
        }
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    /**
     * Dynamically generates a fresh randomized quiz session.
     * Selects a random set of questions every time, randomizes MCQ options,
     * guarantees no duplicates, and does NOT expose correct answers before submission.
     */
    @GetMapping("/generate")
    public ResponseEntity<QuizSessionDto> generateQuiz(
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String subjectSlug,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String topicSlug,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false, defaultValue = "5") Integer limit) {

        String effSubject = (subjectSlug != null && !subjectSlug.isBlank()) ? subjectSlug : subject;
        String effTopic = (topicSlug != null && !topicSlug.isBlank()) ? topicSlug : topic;

        QuizSessionDto session = quizService.generateRandomQuizSession(
                effSubject, effTopic, category, difficulty, limit
        );
        return ResponseEntity.ok(session);
    }

    /**
     * Securely checks a single question answer and returns explanation + isCorrect.
     */
    @PostMapping("/check-answer")
    public ResponseEntity<QuizAnswerCheckResponse> checkAnswer(@RequestBody QuizAnswerCheckRequest request) {
        return ResponseEntity.ok(quizService.checkAnswer(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        return quizService.getQuizById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/attempts")
    public ResponseEntity<QuizAttempt> submitQuizAttempt(@RequestBody QuizAttemptRequest request) {
        return ResponseEntity.ok(quizService.recordQuizAttempt(request));
    }

    @GetMapping("/attempts")
    public ResponseEntity<List<QuizAttempt>> getAllAttempts(@RequestParam(required = false) Long userId) {
        return ResponseEntity.ok(quizService.getUserAttempts(userId));
    }

    @GetMapping("/attempts/user/{userId}")
    public ResponseEntity<List<QuizAttempt>> getUserAttempts(@PathVariable Long userId) {
        return ResponseEntity.ok(quizService.getUserAttempts(userId));
    }

    @GetMapping("/questions")
    public ResponseEntity<List<com.interviewpocket.model.QuizQuestion>> getAllQuizQuestions() {
        return ResponseEntity.ok(quizService.getAllQuizQuestions());
    }

    @PostMapping("/questions")
    public ResponseEntity<com.interviewpocket.model.QuizQuestion> createQuizQuestion(@RequestBody com.interviewpocket.model.QuizQuestion question) {
        return ResponseEntity.ok(quizService.createQuizQuestion(question));
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Void> deleteQuizQuestion(@PathVariable Long id) {
        quizService.deleteQuizQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
