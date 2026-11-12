package com.interviewpocket.repository;

import com.interviewpocket.model.SubjectModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectModuleRepository extends JpaRepository<SubjectModule, Long> {
    List<SubjectModule> findBySubjectIdOrderByDisplayOrderAsc(Long subjectId);
    Optional<SubjectModule> findBySubjectIdAndSlug(Long subjectId, String slug);
    Optional<SubjectModule> findBySlug(String slug);
}

