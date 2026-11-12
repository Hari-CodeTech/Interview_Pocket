package com.interviewpocket.rag;

import com.interviewpocket.model.Note;
import com.interviewpocket.model.RagNoteChunk;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RagChunkingService {

    public static class SectionEntry {
        private final String sectionName;
        private final String content;

        public SectionEntry(String sectionName, String content) {
            this.sectionName = sectionName;
            this.content = content;
        }

        public String getSectionName() { return sectionName; }
        public String getContent() { return content; }
    }

    /**
     * Chunks an approved note into structured semantic chunks with section metadata.
     */
    public List<RagNoteChunk> chunkNote(Note note) {
        if (note == null) {
            return Collections.emptyList();
        }

        Long topicId = note.getTopic() != null ? note.getTopic().getId() : 0L;
        Long subjectId = (note.getTopic() != null && note.getTopic().getSubject() != null)
                ? note.getTopic().getSubject().getId() : 2L;
        Long noteId = note.getId() != null ? note.getId() : 0L;

        List<SectionEntry> sections = new ArrayList<>();
        addIfPresent(sections, "Definition", note.getDefinition());
        addIfPresent(sections, "Simple Explanation", note.getSimpleExplanation());
        addIfPresent(sections, "Why Needed", note.getWhyNeeded());
        addIfPresent(sections, "How It Works", note.getHowItWorks());
        addIfPresent(sections, "Important Concepts", note.getImportantConcepts());
        addIfPresent(sections, "Real World Examples", note.getRealWorldExamples());
        addIfPresent(sections, "Code Examples", note.getJavaCodeExamples());
        addIfPresent(sections, "Internal Working", note.getInternalWorking());
        addIfPresent(sections, "Advantages and Disadvantages", note.getAdvantagesDisadvantages());
        addIfPresent(sections, "Important Differences", note.getImportantDifferences());
        addIfPresent(sections, "Common Interview Tricky Questions", note.getCommonTrickyQuestions());
        addIfPresent(sections, "Interview-ready Answer", note.getInterviewReadyAnswer());
        addIfPresent(sections, "Quick Revision Points", note.getQuickRevisionPoints());

        List<RagNoteChunk> chunks = new ArrayList<>();
        int chunkIndex = 0;

        for (SectionEntry entry : sections) {
            List<String> subChunks = splitIntoSemanticSegments(entry.getContent(), 1200);
            for (String subChunkText : subChunks) {
                RagNoteChunk chunk = new RagNoteChunk();
                chunk.setTopicId(topicId);
                chunk.setSubjectId(subjectId);
                chunk.setNoteId(noteId);
                chunk.setChunkIndex(chunkIndex++);
                chunk.setSectionName(entry.getSectionName());
                chunk.setContent(subChunkText.trim());
                chunk.setTokenCount(estimateTokenCount(subChunkText));
                chunks.add(chunk);
            }
        }

        return chunks;
    }

    private void addIfPresent(List<SectionEntry> list, String name, String text) {
        if (text != null && !text.trim().isEmpty() && !text.trim().equalsIgnoreCase("N/A")) {
            list.add(new SectionEntry(name, text.trim()));
        }
    }

    /**
     * Splits long text on paragraph boundaries or bullet points while preserving semantics.
     */
    private List<String> splitIntoSemanticSegments(String text, int maxCharLength) {
        List<String> segments = new ArrayList<>();
        if (text.length() <= maxCharLength) {
            segments.add(text);
            return segments;
        }

        // Split by markdown sections/paragraphs
        String[] paragraphs = text.split("\n\n+");
        StringBuilder current = new StringBuilder();

        for (String para : paragraphs) {
            if (current.length() + para.length() + 2 > maxCharLength && current.length() > 0) {
                segments.add(current.toString().trim());
                current = new StringBuilder();
            }
            if (current.length() > 0) {
                current.append("\n\n");
            }
            current.append(para);
        }

        if (current.length() > 0) {
            segments.add(current.toString().trim());
        }

        return segments;
    }

    private int estimateTokenCount(String text) {
        if (text == null || text.isEmpty()) return 0;
        String[] words = text.split("\\s+");
        return (int) Math.ceil(words.length * 1.33);
    }
}

