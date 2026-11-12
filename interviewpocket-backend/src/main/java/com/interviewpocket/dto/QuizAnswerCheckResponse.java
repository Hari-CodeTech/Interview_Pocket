package com.interviewpocket.dto;

public class QuizAnswerCheckResponse {
    private Long questionId;
    private Long selectedOptionId;
    private Boolean isCorrect;
    private Long correctOptionId;
    private String correctOptionLabel;
    private String explanation;

    public QuizAnswerCheckResponse() {}

    public QuizAnswerCheckResponse(Long questionId, Long selectedOptionId, Boolean isCorrect, Long correctOptionId, String correctOptionLabel, String explanation) {
        this.questionId = questionId;
        this.selectedOptionId = selectedOptionId;
        this.isCorrect = isCorrect;
        this.correctOptionId = correctOptionId;
        this.correctOptionLabel = correctOptionLabel;
        this.explanation = explanation;
    }

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Long getSelectedOptionId() { return selectedOptionId; }
    public void setSelectedOptionId(Long selectedOptionId) { this.selectedOptionId = selectedOptionId; }

    public Boolean getIsCorrect() { return isCorrect; }
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }

    public Long getCorrectOptionId() { return correctOptionId; }
    public void setCorrectOptionId(Long correctOptionId) { this.correctOptionId = correctOptionId; }

    public String getCorrectOptionLabel() { return correctOptionLabel; }
    public void setCorrectOptionLabel(String correctOptionLabel) { this.correctOptionLabel = correctOptionLabel; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}

