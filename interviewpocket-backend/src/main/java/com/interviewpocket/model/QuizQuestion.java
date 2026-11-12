package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = true)
    @JsonIgnoreProperties("questions")
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    @JsonIgnoreProperties("topics")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    @JsonIgnoreProperties({"subject", "note", "visualAnimation"})
    private Topic topic;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "code_snippet", columnDefinition = "LONGTEXT")
    private String codeSnippet;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String explanation;

    @Column(columnDefinition = "TEXT")
    private String hint;

    @Column(length = 50)
    private String category = "CONCEPTUAL";

    @Column(length = 30)
    private String difficulty = "BEGINNER";

    @Column(name = "approval_status", length = 30)
    private String approvalStatus = "APPROVED"; // GENERATED, PENDING_REVIEW, APPROVED, REJECTED

    @Column(name = "source_reference", columnDefinition = "TEXT")
    private String sourceReference;

    @Column(name = "generated_by_rag")
    private Boolean generatedByRag = false;

    @Column(name = "rejection_reason", length = 255)
    private String rejectionReason;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("optionLabel ASC")
    @JsonIgnoreProperties("question")
    private List<QuizOption> options = new ArrayList<>();

    public QuizQuestion() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getCodeSnippet() { return codeSnippet; }
    public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getHint() { return hint; }
    public void setHint(String hint) { this.hint = hint; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getApprovalStatus() { return approvalStatus != null ? approvalStatus : "APPROVED"; }
    public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }

    public String getSourceReference() { return sourceReference; }
    public void setSourceReference(String sourceReference) { this.sourceReference = sourceReference; }

    public Boolean getGeneratedByRag() { return generatedByRag != null ? generatedByRag : false; }
    public void setGeneratedByRag(Boolean generatedByRag) { this.generatedByRag = generatedByRag; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public List<QuizOption> getOptions() { return options; }
    public void setOptions(List<QuizOption> options) { this.options = options; }
}

