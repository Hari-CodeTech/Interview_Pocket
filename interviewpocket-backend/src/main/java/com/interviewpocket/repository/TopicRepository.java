package com.interviewpocket.repository;

import com.interviewpocket.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findBySubjectIdOrderByDisplayOrderAsc(Long subjectId);
    List<Topic> findByModuleIdOrderByDisplayOrderAsc(Long moduleId);
    Optional<Topic> findBySubjectIdAndSlug(Long subjectId, String slug);
    Optional<Topic> findBySlug(String slug);
    List<Topic> findByTitleContainingIgnoreCase(String query);
}

