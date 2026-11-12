package com.interviewpocket.controller;

import com.interviewpocket.model.SubjectModule;
import com.interviewpocket.service.SubjectModuleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SubjectModuleController {

    private final SubjectModuleService moduleService;

    public SubjectModuleController(SubjectModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<SubjectModule>> getModulesBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(moduleService.getModulesBySubjectId(subjectId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectModule> getModuleById(@PathVariable Long id) {
        return moduleService.getModuleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<SubjectModule> getModuleBySlug(@PathVariable String slug) {
        return moduleService.getModuleBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/subject/{subjectId}")
    public ResponseEntity<SubjectModule> createModule(@PathVariable Long subjectId, @RequestBody SubjectModule module) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(moduleService.createModule(subjectId, module));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectModule> updateModule(@PathVariable Long id, @RequestBody SubjectModule module) {
        return ResponseEntity.ok(moduleService.updateModule(id, module));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable Long id) {
        moduleService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }
}

