package com.interviewpocket.rag;

import com.interviewpocket.model.InterviewQuestion;
import com.interviewpocket.model.QuizOption;
import com.interviewpocket.model.QuizQuestion;
import com.interviewpocket.repository.InterviewQuestionRepository;
import com.interviewpocket.repository.QuizQuestionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RagValidationService {

    private static final Logger log = LoggerFactory.getLogger(RagValidationService.class);

    private final InterviewQuestionRepository interviewRepo;
    private final QuizQuestionRepository quizRepo;

    public RagValidationService(InterviewQuestionRepository interviewRepo, QuizQuestionRepository quizRepo) {
        this.interviewRepo = interviewRepo;
        this.quizRepo = quizRepo;
    }

    public static class ValidationResult<T> {
        private final List<T> validItems = new ArrayList<>();
        private final List<String> rejectedReasons = new ArrayList<>();
        private int duplicateCount = 0;

        public List<T> getValidItems() { return validItems; }
        public List<String> getRejectedReasons() { return rejectedReasons; }
        public int getDuplicateCount() { return duplicateCount; }
        public boolean isAllValid() { return rejectedReasons.isEmpty(); }
    }

    /**
     * Validates generated interview questions, filtering out malformed or duplicate items.
     */
    public ValidationResult<InterviewQuestion> validateInterviewQuestions(Long topicId, List<InterviewQuestion> questions) {
        ValidationResult<InterviewQuestion> result = new ValidationResult<>();
        List<InterviewQuestion> existing = interviewRepo.findByTopicIdOrderByDisplayOrderAsc(topicId);

        List<String> seenQuestions = new ArrayList<>();
        for (InterviewQuestion eq : existing) {
            seenQuestions.add(normalize(eq.getQuestion()));
        }

        for (InterviewQuestion q : questions) {
            if (q.getQuestion() == null || q.getQuestion().trim().length() < 10) {
                result.getRejectedReasons().add("Question text too short or missing: " + q.getQuestion());
                continue;
            }
            if (q.getSimpleAnswer() == null || q.getSimpleAnswer().trim().isEmpty()) {
                result.getRejectedReasons().add("Missing simple answer for question: " + q.getQuestion());
                continue;
            }
            if (q.getSourceReference() == null || q.getSourceReference().trim().isEmpty()) {
                result.getRejectedReasons().add("Missing source reference citation for: " + q.getQuestion());
                continue;
            }

            // Duplicate detection check
            String norm = normalize(q.getQuestion());
            boolean isDup = false;
            for (String seen : seenQuestions) {
                double sim = calculateTextSimilarity(norm, seen);
                if (sim >= 0.85) {
                    isDup = true;
                    result.duplicateCount++;
                    result.getRejectedReasons().add(String.format("Duplicate question detected (similarity: %.2f): '%s' matches '%s'", sim, q.getQuestion(), seen));
                    break;
                }
            }

            if (!isDup) {
                seenQuestions.add(norm);
                result.getValidItems().add(q);
            }
        }

        return result;
    }

    /**
     * Validates generated MCQ quiz questions.
     * Enforces exactly 4 options, exactly 1 correct option, and duplicate checks.
     */
    public ValidationResult<QuizQuestion> validateQuizQuestions(Long topicId, List<QuizQuestion> questions) {
        ValidationResult<QuizQuestion> result = new ValidationResult<>();
        List<QuizQuestion> existing = quizRepo.findByTopicIdAndApprovalStatus(topicId, "APPROVED");

        List<String> seen = new ArrayList<>();
        for (QuizQuestion eq : existing) {
            seen.add(normalize(eq.getQuestionText()));
        }

        for (QuizQuestion q : questions) {
            if (q.getQuestionText() == null || q.getQuestionText().trim().length() < 10) {
                result.getRejectedReasons().add("Quiz question text is too short or missing.");
                continue;
            }
            if (q.getExplanation() == null || q.getExplanation().trim().isEmpty()) {
                result.getRejectedReasons().add("Missing explanation for quiz: " + q.getQuestionText());
                continue;
            }
            if (q.getSourceReference() == null || q.getSourceReference().trim().isEmpty()) {
                result.getRejectedReasons().add("Missing source reference for quiz: " + q.getQuestionText());
                continue;
            }

            // Validate exactly 4 options and exactly 1 correct
            List<QuizOption> options = q.getOptions();
            if (options == null || options.size() != 4) {
                result.getRejectedReasons().add("Question does not have exactly 4 options (found: " + (options == null ? 0 : options.size()) + ")");
                continue;
            }

            long correctCount = options.stream().filter(QuizOption::getIsCorrect).count();
            if (correctCount != 1) {
                result.getRejectedReasons().add("Question does not have exactly one correct option (found: " + correctCount + ")");
                continue;
            }

            // Duplicate detection check
            String norm = normalize(q.getQuestionText());
            boolean isDup = false;
            for (String s : seen) {
                double sim = calculateTextSimilarity(norm, s);
                if (sim >= 0.85) {
                    isDup = true;
                    result.duplicateCount++;
                    result.getRejectedReasons().add(String.format("Duplicate quiz detected (similarity: %.2f): '%s'", sim, q.getQuestionText()));
                    break;
                }
            }

            if (!isDup) {
                seen.add(norm);
                result.getValidItems().add(q);
            }
        }

        return result;
    }

    public boolean isDuplicate(String text1, String text2) {
        return calculateTextSimilarity(normalize(text1), normalize(text2)) >= 0.85;
    }

    private String normalize(String s) {
        if (s == null) return "";
        return s.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]", " ").replaceAll("\\s+", " ").trim();
    }

    /**
     * Hybrid similarity: Jaccard word set intersection + Levenshtein character similarity.
     */
    public double calculateTextSimilarity(String s1, String s2) {
        if (s1.equals(s2)) return 1.0;
        if (s1.isEmpty() || s2.isEmpty()) return 0.0;

        Set<String> words1 = new HashSet<>(Arrays.asList(s1.split(" ")));
        Set<String> words2 = new HashSet<>(Arrays.asList(s2.split(" ")));

        Set<String> intersection = new HashSet<>(words1);
        intersection.retainAll(words2);

        Set<String> union = new HashSet<>(words1);
        union.addAll(words2);

        double jaccard = union.isEmpty() ? 0.0 : (double) intersection.size() / union.size();

        // Levenshtein ratio
        int maxLen = Math.max(s1.length(), s2.length());
        int dist = computeLevenshteinDistance(s1, s2);
        double levRatio = 1.0 - ((double) dist / maxLen);

        return (jaccard * 0.5) + (levRatio * 0.5);
    }

    private int computeLevenshteinDistance(String s1, String s2) {
        int[] prev = new int[s2.length() + 1];
        int[] curr = new int[s2.length() + 1];

        for (int j = 0; j <= s2.length(); j++) prev[j] = j;

        for (int i = 1; i <= s1.length(); i++) {
            curr[0] = i;
            for (int j = 1; j <= s2.length(); j++) {
                int cost = (s1.charAt(i - 1) == s2.charAt(j - 1)) ? 0 : 1;
                curr[j] = Math.min(Math.min(curr[j - 1] + 1, prev[j] + 1), prev[j - 1] + cost);
            }
            System.arraycopy(curr, 0, prev, 0, curr.length);
        }
        return prev[s2.length()];
    }
}

