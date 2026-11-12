package com.interviewpocket.service;

import com.interviewpocket.model.InterviewQuestion;
import com.interviewpocket.model.Topic;
import com.interviewpocket.model.User;
import com.interviewpocket.model.UserQuestionStatus;
import com.interviewpocket.repository.InterviewQuestionRepository;
import com.interviewpocket.repository.TopicRepository;
import com.interviewpocket.repository.UserQuestionStatusRepository;
import com.interviewpocket.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InterviewQuestionService {

    private final InterviewQuestionRepository questionRepository;
    private final TopicRepository topicRepository;
    private final UserQuestionStatusRepository userQuestionStatusRepository;
    private final UserRepository userRepository;

    public InterviewQuestionService(InterviewQuestionRepository questionRepository,
                                    TopicRepository topicRepository,
                                    UserQuestionStatusRepository userQuestionStatusRepository,
                                    UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.topicRepository = topicRepository;
        this.userQuestionStatusRepository = userQuestionStatusRepository;
        this.userRepository = userRepository;
    }

    public List<InterviewQuestion> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<InterviewQuestion> getQuestionsBySubject(Long subjectId) {
        return questionRepository.findBySubjectIdOrderByDisplayOrderAsc(subjectId);
    }

    public List<InterviewQuestion> getQuestionsByTopic(Long topicId) {
        return questionRepository.findByTopicIdAndApprovalStatusOrderByDisplayOrderAsc(topicId, "APPROVED");
    }

    public List<InterviewQuestion> getQuestionsByTopicSlug(String topicSlug) {
        Optional<Topic> topicOpt = topicRepository.findBySlug(topicSlug);
        return topicOpt.map(t -> questionRepository.findByTopicIdAndApprovalStatusOrderByDisplayOrderAsc(t.getId(), "APPROVED"))
                .orElse(Collections.emptyList());
    }

    public List<InterviewQuestion> getFrequentlyAsked(Long subjectId) {
        return questionRepository.findBySubjectIdAndIsFrequentlyAskedTrueOrderByDisplayOrderAsc(subjectId);
    }

    public List<InterviewQuestion> getImportant(Long subjectId) {
        return questionRepository.findBySubjectIdAndIsImportantTrueOrderByDisplayOrderAsc(subjectId);
    }

    public Optional<InterviewQuestion> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public InterviewQuestion createQuestion(InterviewQuestion question) {
        return questionRepository.save(question);
    }

    public InterviewQuestion updateQuestion(Long id, InterviewQuestion updated) {
        return questionRepository.findById(id).map(q -> {
            if (updated.getQuestion() != null) q.setQuestion(updated.getQuestion());
            if (updated.getSimpleAnswer() != null) q.setSimpleAnswer(updated.getSimpleAnswer());
            if (updated.getDetailedExplanation() != null) q.setDetailedExplanation(updated.getDetailedExplanation());
            if (updated.getRealWorldExample() != null) q.setRealWorldExample(updated.getRealWorldExample());
            if (updated.getMemoryTrick() != null) q.setMemoryTrick(updated.getMemoryTrick());
            if (updated.getInterviewAnswer() != null) q.setInterviewAnswer(updated.getInterviewAnswer());
            if (updated.getDifficulty() != null) q.setDifficulty(updated.getDifficulty());
            if (updated.getIsFrequentlyAsked() != null) q.setIsFrequentlyAsked(updated.getIsFrequentlyAsked());
            if (updated.getIsImportant() != null) q.setIsImportant(updated.getIsImportant());
            if (updated.getDisplayOrder() != null) q.setDisplayOrder(updated.getDisplayOrder());
            return questionRepository.save(q);
        }).orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public UserQuestionStatus recordQuestionStatus(Long userId, Long questionId, String status) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        InterviewQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        UserQuestionStatus entry = userQuestionStatusRepository.findByUserIdAndQuestionId(userId, questionId)
                .orElse(new UserQuestionStatus(user, question, status));

        entry.setStatus(status);
        entry.setUpdatedAt(LocalDateTime.now());
        return userQuestionStatusRepository.save(entry);
    }

    public List<UserQuestionStatus> getUserQuestionStatuses(Long userId) {
        return userQuestionStatusRepository.findByUserId(userId);
    }
}
