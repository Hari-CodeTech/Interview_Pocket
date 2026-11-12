package com.interviewpocket.service;

import com.interviewpocket.model.Topic;
import com.interviewpocket.model.TopicProgress;
import com.interviewpocket.model.User;
import com.interviewpocket.model.UserQuestionStatus;
import com.interviewpocket.repository.InterviewQuestionRepository;
import com.interviewpocket.repository.TopicProgressRepository;
import com.interviewpocket.repository.TopicRepository;
import com.interviewpocket.repository.UserQuestionStatusRepository;
import com.interviewpocket.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ProgressService {

    private final TopicProgressRepository topicProgressRepository;
    private final UserQuestionStatusRepository userQuestionStatusRepository;
    private final TopicRepository topicRepository;
    private final InterviewQuestionRepository questionRepository;
    private final UserRepository userRepository;

    public ProgressService(
            TopicProgressRepository topicProgressRepository,
            UserQuestionStatusRepository userQuestionStatusRepository,
            TopicRepository topicRepository,
            InterviewQuestionRepository questionRepository,
            UserRepository userRepository) {
        this.topicProgressRepository = topicProgressRepository;
        this.userQuestionStatusRepository = userQuestionStatusRepository;
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> getUserProgress(Long userId) {
        Map<String, Object> progress = new HashMap<>();
        long completedTopics = topicProgressRepository.countByUserIdAndIsCompletedTrue(userId);
        long totalTopics = topicRepository.count();
        List<UserQuestionStatus> understoodQuestions = userQuestionStatusRepository.findByUserIdAndStatus(userId, "UNDERSTOOD");
        List<UserQuestionStatus> revisionQuestions = userQuestionStatusRepository.findByUserIdAndStatus(userId, "NEEDS_REVISION");

        progress.put("completedTopicsCount", completedTopics);
        progress.put("totalTopicsCount", totalTopics);
        progress.put("topicCompletionPercentage", totalTopics > 0 ? (double) (completedTopics * 100) / totalTopics : 0);
        progress.put("understoodQuestionsCount", understoodQuestions.size());
        progress.put("revisionQuestionsCount", revisionQuestions.size());

        return progress;
    }

    public TopicProgress toggleTopicCompleted(Long userId, Long topicId, Boolean isCompleted) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new RuntimeException("Topic not found"));

        TopicProgress progress = topicProgressRepository.findByUserIdAndTopicId(userId, topicId)
                .orElse(new TopicProgress(user, topic, isCompleted));
        progress.setIsCompleted(isCompleted);
        return topicProgressRepository.save(progress);
    }

    public TopicProgress updateCardProgress(Long userId, Long topicId, String cardType, Boolean completed, Integer score) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new RuntimeException("Topic not found"));

        TopicProgress progress = topicProgressRepository.findByUserIdAndTopicId(userId, topicId)
                .orElse(new TopicProgress(user, topic, false));

        if ("notes".equalsIgnoreCase(cardType)) {
            progress.setNotesCompleted(completed);
        } else if ("questions".equalsIgnoreCase(cardType)) {
            progress.setQuestionsCompleted(completed);
        } else if ("quiz".equalsIgnoreCase(cardType)) {
            progress.setQuizCompleted(completed);
            if (score != null) {
                progress.setQuizScore(Math.max(progress.getQuizScore() != null ? progress.getQuizScore() : 0, score));
            }
        }

        // Mark entire topic completed if notes and questions or quiz are finished
        if (Boolean.TRUE.equals(progress.getNotesCompleted()) &&
            (Boolean.TRUE.equals(progress.getQuestionsCompleted()) || Boolean.TRUE.equals(progress.getQuizCompleted()))) {
            progress.setIsCompleted(true);
        }

        return topicProgressRepository.save(progress);
    }

    public TopicProgress getTopicProgress(Long userId, Long topicId) {
        return topicProgressRepository.findByUserIdAndTopicId(userId, topicId).orElse(null);
    }
}

