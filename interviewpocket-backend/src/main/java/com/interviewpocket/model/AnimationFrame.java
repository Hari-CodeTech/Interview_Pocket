package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "animation_frames")
public class AnimationFrame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visual_animation_id", nullable = false)
    @JsonIgnoreProperties("frames")
    private VisualAnimation visualAnimation;

    @Column(name = "frame_number", nullable = false)
    private Integer frameNumber;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 200)
    private String subtitle;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String explanation;

    @Column(columnDefinition = "TEXT")
    private String analogy;

    @Column(name = "visual_type", length = 50)
    private String visualType; // DIAGRAM_STEP, CODE_FLOW, MEMORY_LAYOUT, ARCHITECTURE_FLOW

    @Column(name = "visual_state_json", columnDefinition = "LONGTEXT")
    private String visualStateJson; // JSON data describing highlight, active nodes, arrows, variables

    public AnimationFrame() {}

    public AnimationFrame(VisualAnimation visualAnimation, Integer frameNumber, String title, String subtitle, String explanation, String analogy, String visualType, String visualStateJson) {
        this.visualAnimation = visualAnimation;
        this.frameNumber = frameNumber;
        this.title = title;
        this.subtitle = subtitle;
        this.explanation = explanation;
        this.analogy = analogy;
        this.visualType = visualType;
        this.visualStateJson = visualStateJson;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public VisualAnimation getVisualAnimation() { return visualAnimation; }
    public void setVisualAnimation(VisualAnimation visualAnimation) { this.visualAnimation = visualAnimation; }

    public Integer getFrameNumber() { return frameNumber; }
    public void setFrameNumber(Integer frameNumber) { this.frameNumber = frameNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getAnalogy() { return analogy; }
    public void setAnalogy(String analogy) { this.analogy = analogy; }

    public String getVisualType() { return visualType; }
    public void setVisualType(String visualType) { this.visualType = visualType; }

    public String getVisualStateJson() { return visualStateJson; }
    public void setVisualStateJson(String visualStateJson) { this.visualStateJson = visualStateJson; }
}

