package com.interviewpocket.dto;

public class QuizAttemptRequest {
    private Long userId;
    private Long quizId;
    private String subjectSlug;
    private Long topicId;
    private String topicSlug;
    private String category;
    private String difficulty;
    private String userAnswersJson;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer incorrectAnswers;
    private Double scorePercentage;
    private Integer timeTakenSeconds;

    public QuizAttemptRequest() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getSubjectSlug() { return subjectSlug; }
    public void setSubjectSlug(String subjectSlug) { this.subjectSlug = subjectSlug; }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public String getTopicSlug() { return topicSlug; }
    public void setTopicSlug(String topicSlug) { this.topicSlug = topicSlug; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getUserAnswersJson() { return userAnswersJson; }
    public void setUserAnswersJson(String userAnswersJson) { this.userAnswersJson = userAnswersJson; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public Integer getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }

    public Integer getIncorrectAnswers() { return incorrectAnswers; }
    public void setIncorrectAnswers(Integer incorrectAnswers) { this.incorrectAnswers = incorrectAnswers; }

    public Double getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(Double scorePercentage) { this.scorePercentage = scorePercentage; }

    public Integer getTimeTakenSeconds() { return timeTakenSeconds; }
    public void setTimeTakenSeconds(Integer timeTakenSeconds) { this.timeTakenSeconds = timeTakenSeconds; }
}

