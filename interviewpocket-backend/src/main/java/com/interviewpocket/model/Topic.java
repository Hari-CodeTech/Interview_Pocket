package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonIgnoreProperties("topics")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id")
    @JsonIgnoreProperties({"topics", "subject", "hibernateLazyInitializer", "handler"})
    private SubjectModule module;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 150)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "difficulty_level", length = 30)
    private String difficultyLevel = "BEGINNER"; // BEGINNER, INTERMEDIATE, ADVANCED

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(length = 30)
    private String priority = "High";

    @OneToOne(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("topic")
    private Note note;

    @OneToOne(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("topic")
    private VisualAnimation visualAnimation;

    public Topic() {}

    public Topic(Subject subject, String title, String slug, String summary, String difficultyLevel, Integer displayOrder) {
        this.subject = subject;
        this.title = title;
        this.slug = slug;
        this.summary = summary;
        this.difficultyLevel = difficultyLevel;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public SubjectModule getModule() { return module; }
    public void setModule(SubjectModule module) { this.module = module; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public Note getNote() { return note; }
    public void setNote(Note note) { this.note = note; }

    public VisualAnimation getVisualAnimation() { return visualAnimation; }
    public void setVisualAnimation(VisualAnimation visualAnimation) { this.visualAnimation = visualAnimation; }
}

