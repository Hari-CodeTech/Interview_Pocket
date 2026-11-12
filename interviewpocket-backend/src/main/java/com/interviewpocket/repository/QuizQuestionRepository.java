package com.interviewpocket.repository;

import com.interviewpocket.model.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    List<QuizQuestion> findByQuizId(Long quizId);
    List<QuizQuestion> findBySubjectId(Long subjectId);
    List<QuizQuestion> findBySubjectIdAndCategory(Long subjectId, String category);
    List<QuizQuestion> findBySubjectIdAndDifficulty(Long subjectId, String difficulty);
    List<QuizQuestion> findBySubjectIdAndCategoryAndDifficulty(Long subjectId, String category, String difficulty);

    List<QuizQuestion> findByTopicIdAndApprovalStatus(Long topicId, String approvalStatus);
    long countByTopicIdAndApprovalStatus(Long topicId, String approvalStatus);

    @Query("SELECT q FROM QuizQuestion q WHERE " +
           "(q.approvalStatus IS NULL OR q.approvalStatus = 'APPROVED') AND " +
           "(:subjectId IS NULL OR (q.subject IS NOT NULL AND q.subject.id = :subjectId)) AND " +
           "(:subjectSlug IS NULL OR (q.subject IS NOT NULL AND q.subject.slug = :subjectSlug)) AND " +
           "(:topicId IS NULL OR (q.topic IS NOT NULL AND q.topic.id = :topicId)) AND " +
           "(:topicSlug IS NULL OR (q.topic IS NOT NULL AND q.topic.slug = :topicSlug)) AND " +
           "(:category IS NULL OR :category = 'ALL' OR q.category = :category) AND " +
           "(:difficulty IS NULL OR :difficulty = 'ALL' OR q.difficulty = :difficulty)")
    List<QuizQuestion> findByDynamicFilters(
        @Param("subjectId") Long subjectId,
        @Param("subjectSlug") String subjectSlug,
        @Param("topicId") Long topicId,
        @Param("topicSlug") String topicSlug,
        @Param("category") String category,
        @Param("difficulty") String difficulty
    );
}

