package com.interviewpocket.dto;

import java.util.ArrayList;
import java.util.List;

public class QuizSessionDto {
    private String sessionId;
    private String quizTitle;
    private Long quizId;
    private String subjectSlug;
    private String subjectName;
    private String topicSlug;
    private String topicTitle;
    private String category;
    private String difficulty;
    private Integer timeLimitMinutes = 10;
    private Integer totalQuestions = 0;
    private List<QuizQuestionDto> questions = new ArrayList<>();

    public QuizSessionDto() {}

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getQuizTitle() { return quizTitle; }
    public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getSubjectSlug() { return subjectSlug; }
    public void setSubjectSlug(String subjectSlug) { this.subjectSlug = subjectSlug; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getTopicSlug() { return topicSlug; }
    public void setTopicSlug(String topicSlug) { this.topicSlug = topicSlug; }

    public String getTopicTitle() { return topicTitle; }
    public void setTopicTitle(String topicTitle) { this.topicTitle = topicTitle; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public Integer getTimeLimitMinutes() { return timeLimitMinutes; }
    public void setTimeLimitMinutes(Integer timeLimitMinutes) { this.timeLimitMinutes = timeLimitMinutes; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public List<QuizQuestionDto> getQuestions() { return questions; }
    public void setQuestions(List<QuizQuestionDto> questions) {
        this.questions = questions;
        this.totalQuestions = questions != null ? questions.size() : 0;
    }
}

