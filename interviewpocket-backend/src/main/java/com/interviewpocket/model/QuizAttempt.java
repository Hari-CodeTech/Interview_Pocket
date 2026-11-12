package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"password", "roles"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = true)
    @JsonIgnoreProperties({"questions", "hibernateLazyInitializer", "handler", "topic", "subject"})
    private Quiz quiz;

    @Column(name = "subject_slug", length = 100)
    private String subjectSlug;

    @Column(name = "topic_id")
    private Long topicId;

    @Column(name = "topic_slug", length = 100)
    private String topicSlug;

    @Column(length = 50)
    private String category;

    @Column(length = 50)
    private String difficulty;

    @Column(name = "user_answers_json", columnDefinition = "LONGTEXT")
    private String userAnswersJson;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(name = "correct_answers", nullable = false)
    private Integer correctAnswers;

    @Column(name = "incorrect_answers", nullable = false)
    private Integer incorrectAnswers;

    @Column(name = "score_percentage", nullable = false)
    private Double scorePercentage;

    @Column(name = "time_taken_seconds", nullable = false)
    private Integer timeTakenSeconds;

    @Column(name = "completed_at")
    private LocalDateTime completedAt = LocalDateTime.now();

    public QuizAttempt() {}

    @PrePersist
    protected void onCreate() {
        this.completedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

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

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}

