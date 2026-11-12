package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "visual_animations")
public class VisualAnimation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false, unique = true)
    @JsonIgnoreProperties("visualAnimation")
    private Topic topic;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(name = "concept_type", length = 50)
    private String conceptType; // e.g. POLYMORPHISM, ENCAPSULATION, INHERITANCE, SPRING_BOOT_FLOW, JDBC_FLOW

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "visualAnimation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("frameNumber ASC")
    @JsonIgnoreProperties("visualAnimation")
    private List<AnimationFrame> frames = new ArrayList<>();

    public VisualAnimation() {}

    public VisualAnimation(Topic topic, String title, String conceptType, String description) {
        this.topic = topic;
        this.title = title;
        this.conceptType = conceptType;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getConceptType() { return conceptType; }
    public void setConceptType(String conceptType) { this.conceptType = conceptType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<AnimationFrame> getFrames() { return frames; }
    public void setFrames(List<AnimationFrame> frames) { this.frames = frames; }
}

