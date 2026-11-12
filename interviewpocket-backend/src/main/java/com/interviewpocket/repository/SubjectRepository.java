package com.interviewpocket.repository;

import com.interviewpocket.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findBySlug(String slug);
    List<Subject> findByIsActiveTrueOrderByDisplayOrderAsc();
    List<Subject> findAllByOrderByDisplayOrderAsc();
}

