package com.interviewpocket.repository;

import com.interviewpocket.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findBySubjectId(Long subjectId);
    List<Quiz> findBySubjectIdAndCategory(Long subjectId, String category);
    List<Quiz> findBySubjectIdAndDifficulty(Long subjectId, String difficulty);
    List<Quiz> findBySubjectIdAndCategoryAndDifficulty(Long subjectId, String category, String difficulty);
}

