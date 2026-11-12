package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false, unique = true)
    @JsonIgnoreProperties({"note", "subject", "module", "hibernateLazyInitializer", "handler"})
    private Topic topic;

    @Column(nullable = false, length = 200)
    private String title;

    // The 13 Canonical Sections
    @Lob
    @Column(name = "definition", columnDefinition = "LONGTEXT")
    private String definition;

    @Lob
    @Column(name = "simple_explanation", columnDefinition = "LONGTEXT")
    private String simpleExplanation;

    @Lob
    @Column(name = "why_needed", columnDefinition = "LONGTEXT")
    private String whyNeeded;

    @Lob
    @Column(name = "how_it_works", columnDefinition = "LONGTEXT")
    private String howItWorks;

    @Lob
    @Column(name = "important_concepts", columnDefinition = "LONGTEXT")
    private String importantConcepts;

    @Lob
    @Column(name = "real_world_examples", columnDefinition = "LONGTEXT")
    private String realWorldExamples;

    @Lob
    @Column(name = "java_code_examples", columnDefinition = "LONGTEXT")
    private String javaCodeExamples;

    @Lob
    @Column(name = "internal_working", columnDefinition = "LONGTEXT")
    private String internalWorking;

    @Lob
    @Column(name = "advantages_disadvantages", columnDefinition = "LONGTEXT")
    private String advantagesDisadvantages;

    @Lob
    @Column(name = "important_differences", columnDefinition = "LONGTEXT")
    private String importantDifferences;

    @Lob
    @Column(name = "common_tricky_questions", columnDefinition = "LONGTEXT")
    private String commonTrickyQuestions;

    @Lob
    @Column(name = "interview_ready_answer", columnDefinition = "LONGTEXT")
    private String interviewReadyAnswer;

    @Lob
    @Column(name = "quick_revision_points", columnDefinition = "LONGTEXT")
    private String quickRevisionPoints;

    @Column(name = "is_approved")
    private Boolean isApproved = true;

    // Legacy fields preserved for backward compatibility
    @Lob
    @Column(name = "what_is_it", columnDefinition = "LONGTEXT")
    private String whatIsIt;

    @Lob
    @Column(name = "simple_meaning", columnDefinition = "LONGTEXT")
    private String simpleMeaning;

    @Lob
    @Column(name = "why_use_it", columnDefinition = "LONGTEXT")
    private String whyUseIt;

    @Lob
    @Column(name = "real_world_example", columnDefinition = "LONGTEXT")
    private String realWorldExample;

    @Lob
    @Column(name = "important_points", columnDefinition = "LONGTEXT")
    private String importantPoints;

    @Lob
    @Column(name = "comparison_table", columnDefinition = "LONGTEXT")
    private String comparisonTable;

    @Lob
    @Column(name = "memory_trick", columnDefinition = "LONGTEXT")
    private String memoryTrick;

    @Lob
    @Column(name = "interview_answer", columnDefinition = "LONGTEXT")
    private String interviewAnswer;

    @Lob
    @Column(name = "practical_code", columnDefinition = "LONGTEXT")
    private String practicalCode;

    // Dynamic child sections
    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC")
    @JsonIgnoreProperties({"note", "hibernateLazyInitializer", "handler"})
    private List<NoteSection> sections = new ArrayList<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Note() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    // 1. Definition
    public String getDefinition() {
        return definition != null ? definition : whatIsIt;
    }
    public void setDefinition(String definition) { this.definition = definition; }

    // 2. Simple Explanation
    public String getSimpleExplanation() {
        return simpleExplanation != null ? simpleExplanation : simpleMeaning;
    }
    public void setSimpleExplanation(String simpleExplanation) { this.simpleExplanation = simpleExplanation; }

    // 3. Why is it needed?
    public String getWhyNeeded() {
        return whyNeeded != null ? whyNeeded : whyUseIt;
    }
    public void setWhyNeeded(String whyNeeded) { this.whyNeeded = whyNeeded; }

    // 4. How does it work?
    public String getHowItWorks() { return howItWorks; }
    public void setHowItWorks(String howItWorks) { this.howItWorks = howItWorks; }

    // 5. Important Concepts
    public String getImportantConcepts() {
        return importantConcepts != null ? importantConcepts : importantPoints;
    }
    public void setImportantConcepts(String importantConcepts) { this.importantConcepts = importantConcepts; }

    // 6. Real-world Examples
    public String getRealWorldExamples() {
        return realWorldExamples != null ? realWorldExamples : realWorldExample;
    }
    public void setRealWorldExamples(String realWorldExamples) { this.realWorldExamples = realWorldExamples; }

    // 7. Java Code Examples
    public String getJavaCodeExamples() {
        return javaCodeExamples != null ? javaCodeExamples : practicalCode;
    }
    public void setJavaCodeExamples(String javaCodeExamples) { this.javaCodeExamples = javaCodeExamples; }

    // 8. Internal Working
    public String getInternalWorking() { return internalWorking; }
    public void setInternalWorking(String internalWorking) { this.internalWorking = internalWorking; }

    // 9. Advantages and Disadvantages
    public String getAdvantagesDisadvantages() { return advantagesDisadvantages; }
    public void setAdvantagesDisadvantages(String advantagesDisadvantages) { this.advantagesDisadvantages = advantagesDisadvantages; }

    // 10. Important Differences
    public String getImportantDifferences() {
        return importantDifferences != null ? importantDifferences : comparisonTable;
    }
    public void setImportantDifferences(String importantDifferences) { this.importantDifferences = importantDifferences; }

    // 11. Common Interview Tricky Questions
    public String getCommonTrickyQuestions() { return commonTrickyQuestions; }
    public void setCommonTrickyQuestions(String commonTrickyQuestions) { this.commonTrickyQuestions = commonTrickyQuestions; }

    // 12. Interview-ready Answer
    public String getInterviewReadyAnswer() {
        return interviewReadyAnswer != null ? interviewReadyAnswer : interviewAnswer;
    }
    public void setInterviewReadyAnswer(String interviewReadyAnswer) { this.interviewReadyAnswer = interviewReadyAnswer; }

    // 13. Quick Revision Points
    public String getQuickRevisionPoints() {
        return quickRevisionPoints != null ? quickRevisionPoints : memoryTrick;
    }
    public void setQuickRevisionPoints(String quickRevisionPoints) { this.quickRevisionPoints = quickRevisionPoints; }

    public Boolean getIsApproved() { return isApproved != null ? isApproved : true; }
    public void setIsApproved(Boolean isApproved) { this.isApproved = isApproved; }

    // Legacy getters/setters for compatibility
    public String getWhatIsIt() { return whatIsIt != null ? whatIsIt : definition; }
    public void setWhatIsIt(String whatIsIt) { this.whatIsIt = whatIsIt; }

    public String getSimpleMeaning() { return simpleMeaning != null ? simpleMeaning : simpleExplanation; }
    public void setSimpleMeaning(String simpleMeaning) { this.simpleMeaning = simpleMeaning; }

    public String getWhyUseIt() { return whyUseIt != null ? whyUseIt : whyNeeded; }
    public void setWhyUseIt(String whyUseIt) { this.whyUseIt = whyUseIt; }

    public String getRealWorldExample() { return realWorldExample != null ? realWorldExample : realWorldExamples; }
    public void setRealWorldExample(String realWorldExample) { this.realWorldExample = realWorldExample; }

    public String getImportantPoints() { return importantPoints != null ? importantPoints : importantConcepts; }
    public void setImportantPoints(String importantPoints) { this.importantPoints = importantPoints; }

    public String getComparisonTable() { return comparisonTable != null ? comparisonTable : importantDifferences; }
    public void setComparisonTable(String comparisonTable) { this.comparisonTable = comparisonTable; }

    public String getMemoryTrick() { return memoryTrick != null ? memoryTrick : quickRevisionPoints; }
    public void setMemoryTrick(String memoryTrick) { this.memoryTrick = memoryTrick; }

    public String getInterviewAnswer() { return interviewAnswer != null ? interviewAnswer : interviewReadyAnswer; }
    public void setInterviewAnswer(String interviewAnswer) { this.interviewAnswer = interviewAnswer; }

    public String getPracticalCode() { return practicalCode != null ? practicalCode : javaCodeExamples; }
    public void setPracticalCode(String practicalCode) { this.practicalCode = practicalCode; }

    public List<NoteSection> getSections() { return sections; }
    public void setSections(List<NoteSection> sections) { this.sections = sections; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
