package com.interviewpocket.dto;

public class SearchResultDto {
    private String type; // SUBJECT, TOPIC, QUESTION, NOTE, CHALLENGE
    private String title;
    private String subject;
    private String path;
    private String description;

    public SearchResultDto() {}

    public SearchResultDto(String type, String title, String subject, String path, String description) {
        this.type = type;
        this.title = title;
        this.subject = subject;
        this.path = path;
        this.description = description;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}

