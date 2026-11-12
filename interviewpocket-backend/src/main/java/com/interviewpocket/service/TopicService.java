package com.interviewpocket.service;

import com.interviewpocket.model.Topic;
import com.interviewpocket.repository.TopicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TopicService {

    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> getTopicsBySubjectId(Long subjectId) {
        return topicRepository.findBySubjectIdOrderByDisplayOrderAsc(subjectId);
    }

    public List<Topic> getTopicsByModuleId(Long moduleId) {
        return topicRepository.findByModuleIdOrderByDisplayOrderAsc(moduleId);
    }

    public Optional<Topic> getTopicById(Long id) {
        return topicRepository.findById(id);
    }

    public Optional<Topic> getTopicBySlug(String slug) {
        return topicRepository.findBySlug(slug);
    }

    public Optional<Topic> getTopicBySubjectAndSlug(Long subjectId, String slug) {
        return topicRepository.findBySubjectIdAndSlug(subjectId, slug);
    }

    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public Topic updateTopic(Long id, Topic updated) {
        return topicRepository.findById(id).map(t -> {
            if (updated.getTitle() != null) t.setTitle(updated.getTitle());
            if (updated.getSlug() != null) t.setSlug(updated.getSlug());
            if (updated.getSummary() != null) t.setSummary(updated.getSummary());
            if (updated.getDifficultyLevel() != null) t.setDifficultyLevel(updated.getDifficultyLevel());
            if (updated.getPriority() != null) t.setPriority(updated.getPriority());
            if (updated.getDisplayOrder() != null) t.setDisplayOrder(updated.getDisplayOrder());
            return topicRepository.save(t);
        }).orElseThrow(() -> new RuntimeException("Topic not found with id: " + id));
    }

    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
    }
}

