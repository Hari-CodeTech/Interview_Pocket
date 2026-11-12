package com.interviewpocket.rag;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.util.*;

@Service
public class RagEmbeddingService {

    private static final Logger log = LoggerFactory.getLogger(RagEmbeddingService.class);
    private static final int EMBEDDING_DIM = 384;

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    @Value("${app.rag.gemini.api-key:}")
    private String geminiApiKey;

    @Value("${app.rag.openai.api-key:}")
    private String openaiApiKey;

    public RagEmbeddingService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    /**
     * Computes dense embedding vector for given text.
     * Checks external embedding APIs if configured, otherwise computes 384-d normalized semantic vector.
     */
    public double[] computeEmbedding(String text) {
        if (text == null || text.isBlank()) {
            return new double[EMBEDDING_DIM];
        }

        // 1. Try Gemini Embedding if key configured
        String envGemini = System.getenv("GEMINI_API_KEY");
        String activeGeminiKey = (geminiApiKey != null && !geminiApiKey.isBlank()) ? geminiApiKey : envGemini;
        if (activeGeminiKey != null && !activeGeminiKey.isBlank()) {
            try {
                return callGeminiEmbeddingApi(text, activeGeminiKey);
            } catch (Exception e) {
                log.warn("Gemini Embedding API call failed, falling back to local semantic vectorizer: {}", e.getMessage());
            }
        }

        // 2. Try OpenAI Embedding if key configured
        String envOpenAi = System.getenv("OPENAI_API_KEY");
        String activeOpenAiKey = (openaiApiKey != null && !openaiApiKey.isBlank()) ? openaiApiKey : envOpenAi;
        if (activeOpenAiKey != null && !activeOpenAiKey.isBlank()) {
            try {
                return callOpenAiEmbeddingApi(text, activeOpenAiKey);
            } catch (Exception e) {
                log.warn("OpenAI Embedding API call failed, falling back to local semantic vectorizer: {}", e.getMessage());
            }
        }

        // 3. High-Fidelity Local Semantic Dense Vectorizer (384-dimensional unit vector)
        return computeDeterministicDenseVector(text);
    }

    /**
     * Computes a normalized 384-dimensional dense semantic feature vector
     * using token hashing, n-gram subword distributions, and TF scaling.
     */
    public double[] computeDeterministicDenseVector(String text) {
        double[] vector = new double[EMBEDDING_DIM];
        String cleaned = text.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9_\\s]", " ");
        String[] tokens = cleaned.split("\\s+");

        Map<String, Integer> termFreqs = new HashMap<>();
        for (String token : tokens) {
            if (token.length() > 1) {
                termFreqs.put(token, termFreqs.getOrDefault(token, 0) + 1);

                // Subword trigrams for robust semantic matching
                if (token.length() >= 4) {
                    for (int i = 0; i <= token.length() - 3; i++) {
                        String trigram = token.substring(i, i + 3);
                        termFreqs.put(trigram, termFreqs.getOrDefault(trigram, 0) + 1);
                    }
                }
            }
        }

        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            for (Map.Entry<String, Integer> entry : termFreqs.entrySet()) {
                String term = entry.getKey();
                double weight = 1.0 + Math.log(entry.getValue());

                byte[] hash = md.digest(term.getBytes(StandardCharsets.UTF_8));
                int idx1 = Math.abs((hash[0] << 8) | (hash[1] & 0xFF)) % EMBEDDING_DIM;
                int idx2 = Math.abs((hash[2] << 8) | (hash[3] & 0xFF)) % EMBEDDING_DIM;

                double sign1 = (hash[4] & 0x01) == 0 ? 1.0 : -1.0;
                double sign2 = (hash[5] & 0x01) == 0 ? 1.0 : -1.0;

                vector[idx1] += sign1 * weight;
                vector[idx2] += sign2 * weight * 0.5;
            }
        } catch (Exception e) {
            log.error("Digest error during embedding calculation", e);
        }

        // Normalize to unit Euclidean norm (L2 norm = 1.0)
        double norm = 0.0;
        for (double v : vector) {
            norm += v * v;
        }
        if (norm > 0) {
            double sqrtNorm = Math.sqrt(norm);
            for (int i = 0; i < EMBEDDING_DIM; i++) {
                vector[i] /= sqrtNorm;
            }
        }

        return vector;
    }

    /**
     * Computes Cosine Similarity between two unit-normalized vectors.
     */
    public double cosineSimilarity(double[] v1, double[] v2) {
        if (v1 == null || v2 == null || v1.length != v2.length) return 0.0;
        double dotProduct = 0.0;
        for (int i = 0; i < v1.length; i++) {
            dotProduct += v1[i] * v2[i];
        }
        return dotProduct;
    }

    public String serializeVector(double[] vector) {
        try {
            return objectMapper.writeValueAsString(vector);
        } catch (Exception e) {
            log.error("Failed to serialize embedding vector", e);
            return "[]";
        }
    }

    public double[] deserializeVector(String json) {
        if (json == null || json.isBlank()) return new double[EMBEDDING_DIM];
        try {
            return objectMapper.readValue(json, new TypeReference<double[]>() {});
        } catch (Exception e) {
            log.error("Failed to deserialize embedding vector", e);
            return new double[EMBEDDING_DIM];
        }
    }

    private double[] callGeminiEmbeddingApi(String text, String apiKey) throws Exception {
        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=" + apiKey;
        Map<String, Object> body = Map.of(
                "model", "models/text-embedding-004",
                "content", Map.of("parts", List.of(Map.of("text", text)))
        );
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .header("Content-Type", "application/json")
                .timeout(Duration.ofSeconds(10))
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() != 200) {
            throw new RuntimeException("Gemini Embedding API returned status " + response.statusCode());
        }

        Map<String, Object> respMap = objectMapper.readValue(response.body(), new TypeReference<Map<String, Object>>() {});
        @SuppressWarnings("unchecked")
        Map<String, Object> embedding = (Map<String, Object>) respMap.get("embedding");
        @SuppressWarnings("unchecked")
        List<Number> values = (List<Number>) embedding.get("values");

        double[] vec = new double[values.size()];
        for (int i = 0; i < values.size(); i++) {
            vec[i] = values.get(i).doubleValue();
        }
        return vec;
    }

    private double[] callOpenAiEmbeddingApi(String text, String apiKey) throws Exception {
        String endpoint = "https://api.openai.com/v1/embeddings";
        Map<String, Object> body = Map.of(
                "model", "text-embedding-3-small",
                "input", text
        );
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .timeout(Duration.ofSeconds(10))
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() != 200) {
            throw new RuntimeException("OpenAI Embedding API returned status " + response.statusCode());
        }

        Map<String, Object> respMap = objectMapper.readValue(response.body(), new TypeReference<Map<String, Object>>() {});
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> data = (List<Map<String, Object>>) respMap.get("data");
        @SuppressWarnings("unchecked")
        List<Number> values = (List<Number>) data.get(0).get("embedding");

        double[] vec = new double[values.size()];
        for (int i = 0; i < values.size(); i++) {
            vec[i] = values.get(i).doubleValue();
        }
        return vec;
    }
}

