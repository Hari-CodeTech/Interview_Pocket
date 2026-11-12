package com.interviewpocket.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "bookmarks",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "item_type", "item_id"})
)
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"password", "roles"})
    private User user;

    @Column(name = "item_type", length = 30, nullable = false)
    private String itemType; // QUESTION, NOTE, TOPIC, CHALLENGE

    @Column(name = "item_id", nullable = false)
    private Long itemId;

    @Column(name = "title", length = 200)
    private String title;

    @Column(name = "subtitle", length = 200)
    private String subtitle;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Bookmark() {}

    public Bookmark(User user, String itemType, Long itemId, String title, String subtitle) {
        this.user = user;
        this.itemType = itemType;
        this.itemId = itemId;
        this.title = title;
        this.subtitle = subtitle;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }

    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

