package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "interview_questions")
public class InterviewQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonIgnoreProperties({"topics"})
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    @JsonIgnoreProperties({"subject", "note", "visualAnimation"})
    private Topic topic;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(name = "simple_answer", nullable = false, columnDefinition = "LONGTEXT")
    private String simpleAnswer;

    @Column(name = "detailed_explanation", columnDefinition = "LONGTEXT")
    private String detailedExplanation;

    @Column(name = "real_world_example", columnDefinition = "TEXT")
    private String realWorldExample;

    @Column(name = "memory_trick", columnDefinition = "TEXT")
    private String memoryTrick;

    @Column(name = "interview_answer", nullable = false, columnDefinition = "LONGTEXT")
    private String interviewAnswer;

    @Column(length = 30)
    private String difficulty = "BEGINNER"; // BEGINNER, INTERMEDIATE, ADVANCED

    @Column(name = "is_frequently_asked")
    private Boolean isFrequentlyAsked = false;

    @Column(name = "is_important")
    private Boolean isImportant = false;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "approval_status", length = 30)
    private String approvalStatus = "APPROVED"; // GENERATED, PENDING_REVIEW, APPROVED, REJECTED

    @Column(name = "source_reference", columnDefinition = "TEXT")
    private String sourceReference;

    @Column(name = "generated_by_rag")
    private Boolean generatedByRag = false;

    @Column(name = "rejection_reason", length = 255)
    private String rejectionReason;

    public InterviewQuestion() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getSimpleAnswer() { return simpleAnswer; }
    public void setSimpleAnswer(String simpleAnswer) { this.simpleAnswer = simpleAnswer; }

    public String getDetailedExplanation() { return detailedExplanation; }
    public void setDetailedExplanation(String detailedExplanation) { this.detailedExplanation = detailedExplanation; }

    public String getRealWorldExample() { return realWorldExample; }
    public void setRealWorldExample(String realWorldExample) { this.realWorldExample = realWorldExample; }

    public String getMemoryTrick() { return memoryTrick; }
    public void setMemoryTrick(String memoryTrick) { this.memoryTrick = memoryTrick; }

    public String getInterviewAnswer() { return interviewAnswer; }
    public void setInterviewAnswer(String interviewAnswer) { this.interviewAnswer = interviewAnswer; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public Boolean getIsFrequentlyAsked() { return isFrequentlyAsked; }
    public void setIsFrequentlyAsked(Boolean isFrequentlyAsked) { this.isFrequentlyAsked = isFrequentlyAsked; }

    public Boolean getIsImportant() { return isImportant; }
    public void setIsImportant(Boolean isImportant) { this.isImportant = isImportant; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public String getApprovalStatus() { return approvalStatus != null ? approvalStatus : "APPROVED"; }
    public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }

    public String getSourceReference() { return sourceReference; }
    public void setSourceReference(String sourceReference) { this.sourceReference = sourceReference; }

    public Boolean getGeneratedByRag() { return generatedByRag != null ? generatedByRag : false; }
    public void setGeneratedByRag(Boolean generatedByRag) { this.generatedByRag = generatedByRag; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
}

