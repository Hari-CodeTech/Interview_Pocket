package com.interviewpocket.repository;

import com.interviewpocket.model.VisualAnimation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VisualAnimationRepository extends JpaRepository<VisualAnimation, Long> {
    Optional<VisualAnimation> findByTopicId(Long topicId);
}

