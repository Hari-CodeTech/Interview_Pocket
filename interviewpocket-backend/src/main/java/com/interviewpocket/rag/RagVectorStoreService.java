package com.interviewpocket.rag;

import com.interviewpocket.model.Note;
import com.interviewpocket.model.RagNoteChunk;
import com.interviewpocket.model.Topic;
import com.interviewpocket.repository.NoteRepository;
import com.interviewpocket.repository.RagNoteChunkRepository;
import com.interviewpocket.repository.TopicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class RagVectorStoreService {

    private static final Logger log = LoggerFactory.getLogger(RagVectorStoreService.class);

    private final RagNoteChunkRepository chunkRepository;
    private final NoteRepository noteRepository;
    private final TopicRepository topicRepository;
    private final RagChunkingService chunkingService;
    private final RagEmbeddingService embeddingService;

    public static class ScoredChunk {
        private final RagNoteChunk chunk;
        private final double similarityScore;

        public ScoredChunk(RagNoteChunk chunk, double similarityScore) {
            this.chunk = chunk;
            this.similarityScore = similarityScore;
        }

        public RagNoteChunk getChunk() { return chunk; }
        public double getSimilarityScore() { return similarityScore; }
    }

    public RagVectorStoreService(RagNoteChunkRepository chunkRepository,
                                 NoteRepository noteRepository,
                                 TopicRepository topicRepository,
                                 RagChunkingService chunkingService,
                                 RagEmbeddingService embeddingService) {
        this.chunkRepository = chunkRepository;
        this.noteRepository = noteRepository;
        this.topicRepository = topicRepository;
        this.chunkingService = chunkingService;
        this.embeddingService = embeddingService;
    }

    /**
     * Ingests, chunks, embeds, and stores approved notes for a Frontend topic.
     * Enforces the pilot scope: Only Frontend (subject_id = 2) topics are allowed.
     */
    public int ingestTopicNotes(Long topicId) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with id: " + topicId));

        if (topic.getSubject() == null || topic.getSubject().getId() != 2L) {
            throw new IllegalStateException("RAG Pilot restriction: Content generation is strictly limited to the Frontend subject.");
        }

        Note note = noteRepository.findByTopicId(topicId)
                .orElseThrow(() -> new IllegalArgumentException("No note found for topic: " + topic.getTitle()));

        if (note.getIsApproved() != null && !note.getIsApproved()) {
            throw new IllegalStateException("Cannot ingest unapproved notes into RAG vector store for topic: " + topic.getTitle());
        }

        // 1. Chunk the approved note
        List<RagNoteChunk> rawChunks = chunkingService.chunkNote(note);
        if (rawChunks.isEmpty()) {
            throw new IllegalStateException("Note has no content sections to chunk for topic: " + topic.getTitle());
        }

        // 2. Clear old chunks for this topic
        chunkRepository.deleteByTopicId(topicId);

        // 3. Compute vector embeddings and save
        List<RagNoteChunk> chunksToSave = new ArrayList<>();
        for (RagNoteChunk chunk : rawChunks) {
            double[] vector = embeddingService.computeEmbedding(chunk.getContent());
            chunk.setEmbeddingVector(embeddingService.serializeVector(vector));
            chunksToSave.add(chunk);
        }

        chunkRepository.saveAll(chunksToSave);
        log.info("Successfully ingested {} RAG note chunks for topic '{}' (ID: {})", chunksToSave.size(), topic.getTitle(), topicId);
        return chunksToSave.size();
    }

    /**
     * Retrieves Top-K most relevant chunks for a query, strictly filtered by topicId.
     * Prevents leakage from any other topic or subject.
     */
    @Transactional
    public List<ScoredChunk> retrieveTopK(Long topicId, String query, int k) {
        List<RagNoteChunk> topicChunks = chunkRepository.findByTopicIdOrderByChunkIndexAsc(topicId);
        if (topicChunks.isEmpty()) {
            // Auto-ingest if note exists
            ingestTopicNotes(topicId);
            topicChunks = chunkRepository.findByTopicIdOrderByChunkIndexAsc(topicId);
        }

        if (topicChunks.isEmpty()) {
            return Collections.emptyList();
        }

        double[] queryVector = embeddingService.computeEmbedding(query);

        List<ScoredChunk> scored = new ArrayList<>();
        for (RagNoteChunk chunk : topicChunks) {
            double[] chunkVector = embeddingService.deserializeVector(chunk.getEmbeddingVector());
            double sim = embeddingService.cosineSimilarity(queryVector, chunkVector);
            scored.add(new ScoredChunk(chunk, sim));
        }

        // Sort descending by similarity score
        scored.sort((a, b) -> Double.compare(b.getSimilarityScore(), a.getSimilarityScore()));

        return scored.stream().limit(k).collect(Collectors.toList());
    }

    /**
     * Builds formatted context text from retrieved chunks, citing section names and chunk indices.
     */
    public String buildGroundedContext(List<ScoredChunk> scoredChunks) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < scoredChunks.size(); i++) {
            ScoredChunk sc = scoredChunks.get(i);
            RagNoteChunk c = sc.getChunk();
            sb.append(String.format("--- CONTEXT CHUNK [%d] (Section: %s, ChunkIndex: %d, CosineSimilarity: %.3f) ---\n",
                    i + 1, c.getSectionName(), c.getChunkIndex(), sc.getSimilarityScore()));
            sb.append(c.getContent().trim());
            sb.append("\n\n");
        }
        return sb.toString();
    }
}

