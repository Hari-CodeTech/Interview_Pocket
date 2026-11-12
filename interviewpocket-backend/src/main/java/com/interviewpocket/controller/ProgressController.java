package com.interviewpocket.controller;

import com.interviewpocket.model.TopicProgress;
import com.interviewpocket.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getUserProgress(@PathVariable Long userId) {
        return ResponseEntity.ok(progressService.getUserProgress(userId));
    }

    @PostMapping("/topic")
    public ResponseEntity<TopicProgress> toggleTopicProgress(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.getOrDefault("userId", 1).toString());
        Long topicId = Long.valueOf(payload.get("topicId").toString());
        Boolean isCompleted = Boolean.valueOf(payload.getOrDefault("isCompleted", true).toString());

        return ResponseEntity.ok(progressService.toggleTopicCompleted(userId, topicId, isCompleted));
    }

    @GetMapping("/user/{userId}/topic/{topicId}")
    public ResponseEntity<TopicProgress> getTopicProgress(@PathVariable Long userId, @PathVariable Long topicId) {
        return ResponseEntity.ok(progressService.getTopicProgress(userId, topicId));
    }

    @PostMapping("/card")
    public ResponseEntity<TopicProgress> updateCardProgress(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.getOrDefault("userId", 1).toString());
        Long topicId = Long.valueOf(payload.get("topicId").toString());
        String cardType = String.valueOf(payload.getOrDefault("cardType", "notes"));
        Boolean completed = Boolean.valueOf(payload.getOrDefault("completed", true).toString());
        Integer score = payload.containsKey("score") ? Integer.valueOf(payload.get("score").toString()) : null;

        return ResponseEntity.ok(progressService.updateCardProgress(userId, topicId, cardType, completed, score));
    }
}

