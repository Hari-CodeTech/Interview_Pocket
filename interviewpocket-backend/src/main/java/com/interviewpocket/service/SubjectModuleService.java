package com.interviewpocket.service;

import com.interviewpocket.model.Subject;
import com.interviewpocket.model.SubjectModule;
import com.interviewpocket.repository.SubjectModuleRepository;
import com.interviewpocket.repository.SubjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubjectModuleService {

    private final SubjectModuleRepository moduleRepository;
    private final SubjectRepository subjectRepository;

    public SubjectModuleService(SubjectModuleRepository moduleRepository, SubjectRepository subjectRepository) {
        this.moduleRepository = moduleRepository;
        this.subjectRepository = subjectRepository;
    }

    @Transactional(readOnly = true)
    public List<SubjectModule> getModulesBySubjectId(Long subjectId) {
        return moduleRepository.findBySubjectIdOrderByDisplayOrderAsc(subjectId);
    }

    @Transactional(readOnly = true)
    public Optional<SubjectModule> getModuleById(Long id) {
        return moduleRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<SubjectModule> getModuleBySlug(String slug) {
        return moduleRepository.findBySlug(slug);
    }

    public SubjectModule createModule(Long subjectId, SubjectModule module) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new IllegalArgumentException("Subject not found with id: " + subjectId));
        module.setSubject(subject);
        return moduleRepository.save(module);
    }

    public SubjectModule updateModule(Long id, SubjectModule updated) {
        SubjectModule existing = moduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Module not found with id: " + id));

        if (updated.getTitle() != null) existing.setTitle(updated.getTitle());
        if (updated.getSlug() != null) existing.setSlug(updated.getSlug());
        if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
        if (updated.getPriority() != null) existing.setPriority(updated.getPriority());
        if (updated.getDisplayOrder() != null) existing.setDisplayOrder(updated.getDisplayOrder());

        return moduleRepository.save(existing);
    }

    public void deleteModule(Long id) {
        if (!moduleRepository.existsById(id)) {
            throw new IllegalArgumentException("Module not found with id: " + id);
        }
        moduleRepository.deleteById(id);
    }
}

