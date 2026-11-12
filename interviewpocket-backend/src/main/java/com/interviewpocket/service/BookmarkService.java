package com.interviewpocket.service;

import com.interviewpocket.model.Bookmark;
import com.interviewpocket.model.User;
import com.interviewpocket.repository.BookmarkRepository;
import com.interviewpocket.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository, UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
    }

    public List<Bookmark> getUserBookmarks(Long userId) {
        return bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Bookmark addBookmark(Long userId, String itemType, Long itemId, String title, String subtitle) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return bookmarkRepository.findByUserIdAndItemTypeAndItemId(userId, itemType, itemId)
                .orElseGet(() -> bookmarkRepository.save(new Bookmark(user, itemType, itemId, title, subtitle)));
    }

    public void removeBookmark(Long userId, String itemType, Long itemId) {
        bookmarkRepository.deleteByUserIdAndItemTypeAndItemId(userId, itemType, itemId);
    }

    public void deleteBookmarkById(Long id) {
        bookmarkRepository.deleteById(id);
    }
}

