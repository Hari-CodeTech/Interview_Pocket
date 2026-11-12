package com.interviewpocket.controller;

import com.interviewpocket.dto.SearchResultDto;
import com.interviewpocket.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<List<SearchResultDto>> search(@RequestParam(name = "q", defaultValue = "") String query) {
        return ResponseEntity.ok(searchService.searchGlobal(query));
    }
}

