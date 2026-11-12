package com.interviewpocket.repository;

import com.interviewpocket.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findByTopicId(Long topicId);
    List<Note> findByTitleContainingIgnoreCase(String title);
}

