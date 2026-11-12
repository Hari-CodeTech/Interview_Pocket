package com.interviewpocket.dto;

import java.util.ArrayList;
import java.util.List;

public class QuizQuestionDto {
    private Long id;
    private String questionText;
    private String codeSnippet;
    private String category;
    private String difficulty;
    private String hint;
    private List<QuizOptionDto> options = new ArrayList<>();

    public QuizQuestionDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getCodeSnippet() { return codeSnippet; }
    public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getHint() { return hint; }
    public void setHint(String hint) { this.hint = hint; }

    public List<QuizOptionDto> getOptions() { return options; }
    public void setOptions(List<QuizOptionDto> options) { this.options = options; }
}

