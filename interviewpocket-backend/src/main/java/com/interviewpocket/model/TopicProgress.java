package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "topic_progress",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "topic_id"})
)
public class TopicProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"password", "roles"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    @JsonIgnoreProperties({"subject", "note", "visualAnimation"})
    private Topic topic;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted = false;

    @Column(name = "notes_completed")
    private Boolean notesCompleted = false;

    @Column(name = "questions_completed")
    private Boolean questionsCompleted = false;

    @Column(name = "quiz_completed")
    private Boolean quizCompleted = false;

    @Column(name = "quiz_score")
    private Integer quizScore = 0;

    @Column(name = "last_reviewed_at")
    private LocalDateTime lastReviewedAt = LocalDateTime.now();

    public TopicProgress() {}

    public TopicProgress(User user, Topic topic, Boolean isCompleted) {
        this.user = user;
        this.topic = topic;
        this.isCompleted = isCompleted;
        this.lastReviewedAt = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.lastReviewedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }

    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

    public Boolean getNotesCompleted() { return notesCompleted; }
    public void setNotesCompleted(Boolean notesCompleted) { this.notesCompleted = notesCompleted; }

    public Boolean getQuestionsCompleted() { return questionsCompleted; }
    public void setQuestionsCompleted(Boolean questionsCompleted) { this.questionsCompleted = questionsCompleted; }

    public Boolean getQuizCompleted() { return quizCompleted; }
    public void setQuizCompleted(Boolean quizCompleted) { this.quizCompleted = quizCompleted; }

    public Integer getQuizScore() { return quizScore; }
    public void setQuizScore(Integer quizScore) { this.quizScore = quizScore; }

    public LocalDateTime getLastReviewedAt() { return lastReviewedAt; }
    public void setLastReviewedAt(LocalDateTime lastReviewedAt) { this.lastReviewedAt = lastReviewedAt; }
}

