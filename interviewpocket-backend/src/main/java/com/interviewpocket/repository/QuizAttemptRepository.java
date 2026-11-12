package com.interviewpocket.repository;

import com.interviewpocket.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserIdOrderByCompletedAtDesc(Long userId);
    List<QuizAttempt> findByUserIdAndQuizId(Long userId, Long quizId);
}

