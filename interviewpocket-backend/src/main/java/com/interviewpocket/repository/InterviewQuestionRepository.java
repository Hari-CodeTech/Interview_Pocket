package com.interviewpocket.repository;

import com.interviewpocket.model.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {
    List<InterviewQuestion> findBySubjectIdOrderByDisplayOrderAsc(Long subjectId);
    List<InterviewQuestion> findByTopicIdOrderByDisplayOrderAsc(Long topicId);
    List<InterviewQuestion> findByTopicIdAndApprovalStatusOrderByDisplayOrderAsc(Long topicId, String approvalStatus);
    List<InterviewQuestion> findByTopicIdAndApprovalStatus(Long topicId, String approvalStatus);
    long countByTopicIdAndApprovalStatus(Long topicId, String approvalStatus);
    List<InterviewQuestion> findBySubjectIdAndDifficultyOrderByDisplayOrderAsc(Long subjectId, String difficulty);
    List<InterviewQuestion> findBySubjectIdAndIsFrequentlyAskedTrueOrderByDisplayOrderAsc(Long subjectId);
    List<InterviewQuestion> findBySubjectIdAndIsImportantTrueOrderByDisplayOrderAsc(Long subjectId);
    List<InterviewQuestion> findByQuestionContainingIgnoreCase(String query);
}

