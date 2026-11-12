package com.interviewpocket.repository;

import com.interviewpocket.model.TopicProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TopicProgressRepository extends JpaRepository<TopicProgress, Long> {
    List<TopicProgress> findByUserId(Long userId);
    Optional<TopicProgress> findByUserIdAndTopicId(Long userId, Long topicId);
    Long countByUserIdAndIsCompletedTrue(Long userId);
}

