package com.interviewpocket.controller;

import com.interviewpocket.model.Note;
import com.interviewpocket.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<Note> getNoteByTopicId(@PathVariable Long topicId) {
        return noteService.getNoteByTopicId(topicId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/topic-slug/{topicSlug}")
    public ResponseEntity<Note> getNoteByTopicSlug(@PathVariable String topicSlug) {
        return noteService.getNoteByTopicSlug(topicSlug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Note> saveNote(@RequestBody Note note) {
        return ResponseEntity.ok(noteService.saveOrUpdateNote(note));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        note.setId(id);
        return ResponseEntity.ok(noteService.saveOrUpdateNote(note));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
