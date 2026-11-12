package com.interviewpocket.controller;

import com.interviewpocket.model.InterviewQuestion;
import com.interviewpocket.model.UserQuestionStatus;
import com.interviewpocket.service.InterviewQuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*", maxAge = 3600)
public class InterviewQuestionController {

    private final InterviewQuestionService questionService;

    public InterviewQuestionController(InterviewQuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<InterviewQuestion>> getQuestions(
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) Long topicId) {
        if (topicId != null) {
            return ResponseEntity.ok(questionService.getQuestionsByTopic(topicId));
        }
        if (subjectId != null) {
            return ResponseEntity.ok(questionService.getQuestionsBySubject(subjectId));
        }
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/topic-slug/{topicSlug}")
    public ResponseEntity<List<InterviewQuestion>> getQuestionsByTopicSlug(@PathVariable String topicSlug) {
        return ResponseEntity.ok(questionService.getQuestionsByTopicSlug(topicSlug));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewQuestion> getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<InterviewQuestion> createQuestion(@RequestBody InterviewQuestion question) {
        return ResponseEntity.ok(questionService.createQuestion(question));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewQuestion> updateQuestion(@PathVariable Long id, @RequestBody InterviewQuestion question) {
        return ResponseEntity.ok(questionService.updateQuestion(id, question));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}/status")
    public ResponseEntity<List<UserQuestionStatus>> getUserQuestionStatuses(@PathVariable Long userId) {
        return ResponseEntity.ok(questionService.getUserQuestionStatuses(userId));
    }

    @PostMapping("/status")
    public ResponseEntity<UserQuestionStatus> recordQuestionStatus(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.getOrDefault("userId", 1).toString());
        Long questionId = Long.valueOf(payload.get("questionId").toString());
        String status = String.valueOf(payload.getOrDefault("status", "PRACTICED"));
        return ResponseEntity.ok(questionService.recordQuestionStatus(userId, questionId, status));
    }
}
