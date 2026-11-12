package com.interviewpocket.dto;

public class QuizOptionDto {
    private Long id;
    private String label;
    private String text;

    public QuizOptionDto() {}

    public QuizOptionDto(Long id, String label, String text) {
        this.id = id;
        this.label = label;
        this.text = text;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}

