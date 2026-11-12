package com.interviewpocket.controller;

import com.interviewpocket.model.Topic;
import com.interviewpocket.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Topic>> getTopicsBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(topicService.getTopicsBySubjectId(subjectId));
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<Topic>> getTopicsByModule(@PathVariable Long moduleId) {
        return ResponseEntity.ok(topicService.getTopicsByModuleId(moduleId));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Topic> getTopicBySlug(@PathVariable String slug) {
        return topicService.getTopicBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable Long id) {
        return topicService.getTopicById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        return ResponseEntity.ok(topicService.createTopic(topic));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable Long id, @RequestBody Topic topic) {
        return ResponseEntity.ok(topicService.updateTopic(id, topic));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
        return ResponseEntity.noContent().build();
    }
}

