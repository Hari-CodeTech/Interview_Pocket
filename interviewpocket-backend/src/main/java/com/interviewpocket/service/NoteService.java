package com.interviewpocket.service;

import com.interviewpocket.model.Note;
import com.interviewpocket.model.Topic;
import com.interviewpocket.repository.NoteRepository;
import com.interviewpocket.repository.TopicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class NoteService {

    private final NoteRepository noteRepository;
    private final TopicRepository topicRepository;

    public NoteService(NoteRepository noteRepository, TopicRepository topicRepository) {
        this.noteRepository = noteRepository;
        this.topicRepository = topicRepository;
    }

    @Transactional(readOnly = true)
    public Optional<Note> getNoteByTopicId(Long topicId) {
        return noteRepository.findByTopicId(topicId)
                .filter(n -> n.getIsApproved() == null || n.getIsApproved());
    }

    @Transactional(readOnly = true)
    public Optional<Note> getNoteByTopicSlug(String topicSlug) {
        return topicRepository.findBySlug(topicSlug)
                .flatMap(t -> noteRepository.findByTopicId(t.getId()))
                .filter(n -> n.getIsApproved() == null || n.getIsApproved());
    }

    public Note saveOrUpdateNote(Note note) {
        if (note.getId() != null) {
            return noteRepository.findById(note.getId()).map(existing -> {
                existing.setTitle(note.getTitle());
                existing.setDefinition(note.getDefinition());
                existing.setSimpleExplanation(note.getSimpleExplanation());
                existing.setWhyNeeded(note.getWhyNeeded());
                existing.setHowItWorks(note.getHowItWorks());
                existing.setImportantConcepts(note.getImportantConcepts());
                existing.setRealWorldExamples(note.getRealWorldExamples());
                existing.setJavaCodeExamples(note.getJavaCodeExamples());
                existing.setInternalWorking(note.getInternalWorking());
                existing.setAdvantagesDisadvantages(note.getAdvantagesDisadvantages());
                existing.setImportantDifferences(note.getImportantDifferences());
                existing.setCommonTrickyQuestions(note.getCommonTrickyQuestions());
                existing.setInterviewReadyAnswer(note.getInterviewReadyAnswer());
                existing.setQuickRevisionPoints(note.getQuickRevisionPoints());

                // Legacy sync
                existing.setWhatIsIt(note.getDefinition());
                existing.setSimpleMeaning(note.getSimpleExplanation());
                existing.setWhyUseIt(note.getWhyNeeded());
                existing.setRealWorldExample(note.getRealWorldExamples());
                existing.setPracticalCode(note.getJavaCodeExamples());
                existing.setImportantPoints(note.getImportantConcepts());
                existing.setInterviewAnswer(note.getInterviewReadyAnswer());
                existing.setComparisonTable(note.getImportantDifferences());

                existing.setUpdatedAt(LocalDateTime.now());
                return noteRepository.save(existing);
            }).orElseGet(() -> noteRepository.save(note));
        }
        return noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}
