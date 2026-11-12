package com.interviewpocket.rag;

import com.interviewpocket.model.InterviewQuestion;
import com.interviewpocket.model.QuizOption;
import com.interviewpocket.model.QuizQuestion;
import com.interviewpocket.repository.InterviewQuestionRepository;
import com.interviewpocket.repository.QuizQuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class RagApprovalService {

    private final InterviewQuestionRepository interviewRepo;
    private final QuizQuestionRepository quizRepo;

    public RagApprovalService(InterviewQuestionRepository interviewRepo, QuizQuestionRepository quizRepo) {
        this.interviewRepo = interviewRepo;
        this.quizRepo = quizRepo;
    }

    public List<InterviewQuestion> getPendingInterviewQuestions(Long topicId) {
        return interviewRepo.findByTopicIdAndApprovalStatus(topicId, "PENDING_REVIEW");
    }

    public List<QuizQuestion> getPendingQuizQuestions(Long topicId) {
        return quizRepo.findByTopicIdAndApprovalStatus(topicId, "PENDING_REVIEW");
    }

    public InterviewQuestion approveInterviewQuestion(Long questionId) {
        InterviewQuestion q = interviewRepo.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found with id: " + questionId));
        q.setApprovalStatus("APPROVED");
        q.setRejectionReason(null);
        return interviewRepo.save(q);
    }

    public InterviewQuestion rejectInterviewQuestion(Long questionId, String reason) {
        InterviewQuestion q = interviewRepo.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found with id: " + questionId));
        q.setApprovalStatus("REJECTED");
        q.setRejectionReason(reason != null && !reason.isBlank() ? reason : "Rejected during admin review");
        return interviewRepo.save(q);
    }

    public QuizQuestion approveQuizQuestion(Long questionId) {
        QuizQuestion q = quizRepo.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz question not found with id: " + questionId));
        q.setApprovalStatus("APPROVED");
        q.setRejectionReason(null);
        return quizRepo.save(q);
    }

    public QuizQuestion rejectQuizQuestion(Long questionId, String reason) {
        QuizQuestion q = quizRepo.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz question not found with id: " + questionId));
        q.setApprovalStatus("REJECTED");
        q.setRejectionReason(reason != null && !reason.isBlank() ? reason : "Rejected during admin review");
        return quizRepo.save(q);
    }

    public Map<String, Object> bulkApproveTopic(Long topicId) {
        List<InterviewQuestion> pendingQuestions = interviewRepo.findByTopicIdAndApprovalStatus(topicId, "PENDING_REVIEW");
        for (InterviewQuestion q : pendingQuestions) {
            q.setApprovalStatus("APPROVED");
            q.setRejectionReason(null);
        }
        interviewRepo.saveAll(pendingQuestions);

        List<QuizQuestion> pendingQuizzes = quizRepo.findByTopicIdAndApprovalStatus(topicId, "PENDING_REVIEW");
        for (QuizQuestion q : pendingQuizzes) {
            q.setApprovalStatus("APPROVED");
            q.setRejectionReason(null);
        }
        quizRepo.saveAll(pendingQuizzes);

        Map<String, Object> res = new HashMap<>();
        res.put("topicId", topicId);
        res.put("approvedQuestionsCount", pendingQuestions.size());
        res.put("approvedQuizCount", pendingQuizzes.size());
        res.put("status", "SUCCESS");
        return res;
    }

    public InterviewQuestion updateInterviewQuestion(Long questionId, InterviewQuestion update) {
        InterviewQuestion existing = interviewRepo.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found: " + questionId));
        if (update.getQuestion() != null) existing.setQuestion(update.getQuestion());
        if (update.getSimpleAnswer() != null) existing.setSimpleAnswer(update.getSimpleAnswer());
        if (update.getDetailedExplanation() != null) existing.setDetailedExplanation(update.getDetailedExplanation());
        if (update.getInterviewAnswer() != null) existing.setInterviewAnswer(update.getInterviewAnswer());
        if (update.getDifficulty() != null) existing.setDifficulty(update.getDifficulty());
        return interviewRepo.save(existing);
    }

    public QuizQuestion updateQuizQuestion(Long questionId, QuizQuestion update) {
        QuizQuestion existing = quizRepo.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz question not found: " + questionId));
        if (update.getQuestionText() != null) existing.setQuestionText(update.getQuestionText());
        if (update.getExplanation() != null) existing.setExplanation(update.getExplanation());
        if (update.getDifficulty() != null) existing.setDifficulty(update.getDifficulty());
        return quizRepo.save(existing);
    }
}

