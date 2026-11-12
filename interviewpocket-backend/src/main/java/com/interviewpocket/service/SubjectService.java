package com.interviewpocket.service;

import com.interviewpocket.model.Subject;
import com.interviewpocket.repository.SubjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<Subject> getAllActiveSubjects() {
        return subjectRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
    }

    public Optional<Subject> getSubjectBySlug(String slug) {
        return subjectRepository.findBySlug(slug);
    }

    public Optional<Subject> getSubjectById(Long id) {
        return subjectRepository.findById(id);
    }

    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Long id, Subject updated) {
        return subjectRepository.findById(id).map(s -> {
            s.setName(updated.getName());
            s.setSlug(updated.getSlug());
            s.setDescription(updated.getDescription());
            s.setIcon(updated.getIcon());
            s.setColor(updated.getColor());
            s.setDisplayOrder(updated.getDisplayOrder());
            return subjectRepository.save(s);
        }).orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }
}

