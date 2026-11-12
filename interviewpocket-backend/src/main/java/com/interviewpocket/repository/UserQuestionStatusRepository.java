package com.interviewpocket.repository;

import com.interviewpocket.model.UserQuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserQuestionStatusRepository extends JpaRepository<UserQuestionStatus, Long> {
    List<UserQuestionStatus> findByUserId(Long userId);
    List<UserQuestionStatus> findByUserIdAndStatus(Long userId, String status);
    Optional<UserQuestionStatus> findByUserIdAndQuestionId(Long userId, Long questionId);
}

