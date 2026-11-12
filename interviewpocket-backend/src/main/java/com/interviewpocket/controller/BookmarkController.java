package com.interviewpocket.controller;

import com.interviewpocket.model.Bookmark;
import com.interviewpocket.service.BookmarkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookmarks")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    public ResponseEntity<List<Bookmark>> getBookmarks(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(bookmarkService.getUserBookmarks(userId));
    }

    @PostMapping
    public ResponseEntity<Bookmark> addBookmark(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.getOrDefault("userId", 1).toString());
        String itemType = payload.get("itemType").toString();
        Long itemId = Long.valueOf(payload.get("itemId").toString());
        String title = payload.getOrDefault("title", "").toString();
        String subtitle = payload.getOrDefault("subtitle", "").toString();

        return ResponseEntity.ok(bookmarkService.addBookmark(userId, itemType, itemId, title, subtitle));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookmark(@PathVariable Long id) {
        bookmarkService.deleteBookmarkById(id);
        return ResponseEntity.noContent().build();
    }
}

