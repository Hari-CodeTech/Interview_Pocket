package com.interviewpocket.service;

import com.interviewpocket.dto.*;
import com.interviewpocket.model.*;
import com.interviewpocket.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizOptionRepository quizOptionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;

    private final SecureRandom random = new SecureRandom();

    public QuizService(QuizRepository quizRepository,
                       QuizQuestionRepository quizQuestionRepository,
                       QuizOptionRepository quizOptionRepository,
                       QuizAttemptRepository quizAttemptRepository,
                       UserRepository userRepository,
                       SubjectRepository subjectRepository,
                       TopicRepository topicRepository) {
        this.quizRepository = quizRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.quizOptionRepository = quizOptionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
        this.topicRepository = topicRepository;
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public List<Quiz> getQuizzesBySubject(Long subjectId) {
        return quizRepository.findBySubjectId(subjectId);
    }

    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    /**
     * Dynamically generates a fresh randomized quiz session.
     * 1. Fetches candidate questions from MySQL matching subject, topic, category & difficulty.
     * 2. Shuffles the questions so every new attempt gets a unique random set.
     * 3. Guarantees no duplicate questions within the attempt.
     * 4. Randomizes (shuffles) the order of MCQ options for every question.
     * 5. Strips out isCorrect and explanation so answers are NEVER exposed before submission.
     */
    public QuizSessionDto generateRandomQuizSession(String subjectSlug,
                                                   String topicSlug,
                                                   String category,
                                                   String difficulty,
                                                   Integer requestedLimit) {
        int limit = (requestedLimit != null && requestedLimit > 0) ? requestedLimit : 5;

        // Clean up filter values
        String normSubject = (subjectSlug != null && !subjectSlug.isBlank() && !subjectSlug.equalsIgnoreCase("ALL"))
                ? subjectSlug.trim() : null;
        String normTopic = (topicSlug != null && !topicSlug.isBlank() && !topicSlug.equalsIgnoreCase("ALL"))
                ? topicSlug.trim() : null;
        String normCategory = (category != null && !category.isBlank() && !category.equalsIgnoreCase("ALL"))
                ? category.trim().toUpperCase() : null;
        String normDifficulty = (difficulty != null && !difficulty.isBlank() && !difficulty.equalsIgnoreCase("ALL"))
                ? difficulty.trim().toUpperCase() : null;

        // Primary search
        List<QuizQuestion> candidates = quizQuestionRepository.findByDynamicFilters(
                null, normSubject, null, normTopic, normCategory, normDifficulty
        );

        // Fallback 1: If no results with specific topic, relax topic filter
        if (candidates.isEmpty() && normTopic != null) {
            candidates = quizQuestionRepository.findByDynamicFilters(
                    null, normSubject, null, null, normCategory, normDifficulty
            );
        }

        // Fallback 2: If still empty with category/difficulty, relax category
        if (candidates.isEmpty() && normCategory != null) {
            candidates = quizQuestionRepository.findByDynamicFilters(
                    null, normSubject, null, null, null, normDifficulty
            );
        }

        // Fallback 3: If still empty, get all questions for subject
        if (candidates.isEmpty() && normSubject != null) {
            candidates = quizQuestionRepository.findByDynamicFilters(
                    null, normSubject, null, null, null, null
            );
        }

        // Fallback 4: If still empty, get all available questions in database
        if (candidates.isEmpty()) {
            candidates = quizQuestionRepository.findAll();
        }

        // Distinct questions by ID to guarantee no duplicates
        Map<Long, QuizQuestion> uniqueMap = new LinkedHashMap<>();
        for (QuizQuestion q : candidates) {
            uniqueMap.put(q.getId(), q);
        }
        List<QuizQuestion> distinctList = new ArrayList<>(uniqueMap.values());

        // Randomize questions for fresh attempt
        Collections.shuffle(distinctList, random);

        // Take up to requested limit (if fewer exist, take all without duplicates)
        int takeCount = Math.min(limit, distinctList.size());
        List<QuizQuestion> selectedQuestions = distinctList.subList(0, takeCount);

        // Subject information
        String subjectName = "All Subjects";
        Long quizId = null;
        if (normSubject != null) {
            Optional<Subject> subOpt = subjectRepository.findBySlug(normSubject);
            if (subOpt.isPresent()) {
                Subject s = subOpt.get();
                subjectName = s.getName();
                List<Quiz> quizzes = quizRepository.findBySubjectId(s.getId());
                if (!quizzes.isEmpty()) {
                    quizId = quizzes.get(0).getId();
                }
            }
        }
        if (quizId == null) {
            List<Quiz> all = quizRepository.findAll();
            if (!all.isEmpty()) quizId = all.get(0).getId();
        }

        // Build Session DTO
        QuizSessionDto session = new QuizSessionDto();
        session.setSessionId(UUID.randomUUID().toString());
        session.setQuizId(quizId);
        session.setSubjectSlug(normSubject != null ? normSubject : "core-java");
        session.setSubjectName(subjectName);
        session.setTopicSlug(normTopic);
        session.setCategory(normCategory != null ? normCategory : "ALL");
        session.setDifficulty(normDifficulty != null ? normDifficulty : "ALL");
        session.setQuizTitle(subjectName + " Challenge (" + (normCategory != null ? normCategory : "Mixed") + ")");
        session.setTimeLimitMinutes(Math.max(5, takeCount * 2));

        List<QuizQuestionDto> questionDtos = new ArrayList<>();
        final String[] OPTION_LABELS = {"A", "B", "C", "D", "E", "F"};

        for (QuizQuestion q : selectedQuestions) {
            QuizQuestionDto qDto = new QuizQuestionDto();
            qDto.setId(q.getId());
            qDto.setQuestionText(q.getQuestionText());
            qDto.setCodeSnippet(q.getCodeSnippet());
            qDto.setCategory(q.getCategory());
            qDto.setDifficulty(q.getDifficulty());
            qDto.setHint(q.getHint());
            // Intentionally omitting explanation and isCorrect!

            // Randomize options order
            List<QuizOption> options = new ArrayList<>(q.getOptions());
            Collections.shuffle(options, random);

            List<QuizOptionDto> optDtos = new ArrayList<>();
            for (int i = 0; i < options.size(); i++) {
                QuizOption opt = options.get(i);
                String label = (i < OPTION_LABELS.length) ? OPTION_LABELS[i] : String.valueOf((char)('A' + i));
                // Option text and label, without exposing isCorrect
                optDtos.add(new QuizOptionDto(opt.getId(), label, opt.getOptionText()));
            }
            qDto.setOptions(optDtos);
            questionDtos.add(qDto);
        }

        session.setQuestions(questionDtos);
        return session;
    }

    /**
     * Validates an answer submission securely.
     * Evaluates whether selected option is correct and reveals the explanation.
     */
    public QuizAnswerCheckResponse checkAnswer(QuizAnswerCheckRequest req) {
        if (req.getQuestionId() == null) {
            throw new IllegalArgumentException("Question ID is required.");
        }

        QuizQuestion question = quizQuestionRepository.findById(req.getQuestionId())
                .orElseThrow(() -> new IllegalArgumentException("Question not found with ID: " + req.getQuestionId()));

        QuizOption correctOption = question.getOptions().stream()
                .filter(QuizOption::getIsCorrect)
                .findFirst()
                .orElse(null);

        boolean isCorrect = false;
        if (req.getSelectedOptionId() != null && correctOption != null) {
            isCorrect = correctOption.getId().equals(req.getSelectedOptionId());
        }

        QuizAnswerCheckResponse response = new QuizAnswerCheckResponse();
        response.setQuestionId(question.getId());
        response.setSelectedOptionId(req.getSelectedOptionId());
        response.setIsCorrect(isCorrect);
        if (correctOption != null) {
            response.setCorrectOptionId(correctOption.getId());
            response.setCorrectOptionLabel(correctOption.getOptionLabel());
        }
        response.setExplanation(question.getExplanation());

        return response;
    }

    public QuizAttempt recordQuizAttempt(QuizAttemptRequest req) {
        User user = null;
        if (req.getUserId() != null) {
            user = userRepository.findById(req.getUserId()).orElse(null);
        }
        if (user == null) {
            List<User> users = userRepository.findAll();
            user = !users.isEmpty() ? users.get(0) : null;
        }

        Quiz quiz = null;
        if (req.getQuizId() != null) {
            quiz = quizRepository.findById(req.getQuizId()).orElse(null);
        }
        if (quiz == null && req.getSubjectSlug() != null) {
            Optional<Subject> subOpt = subjectRepository.findBySlug(req.getSubjectSlug());
            if (subOpt.isPresent()) {
                List<Quiz> quizzes = quizRepository.findBySubjectId(subOpt.get().getId());
                if (!quizzes.isEmpty()) quiz = quizzes.get(0);
            }
        }
        if (quiz == null) {
            List<Quiz> all = quizRepository.findAll();
            if (!all.isEmpty()) quiz = all.get(0);
        }

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setQuiz(quiz);
        attempt.setSubjectSlug(req.getSubjectSlug());
        attempt.setTopicId(req.getTopicId());
        attempt.setTopicSlug(req.getTopicSlug());
        attempt.setCategory(req.getCategory());
        attempt.setDifficulty(req.getDifficulty());
        attempt.setUserAnswersJson(req.getUserAnswersJson());
        attempt.setTotalQuestions(req.getTotalQuestions() != null ? req.getTotalQuestions() : 0);
        attempt.setCorrectAnswers(req.getCorrectAnswers() != null ? req.getCorrectAnswers() : 0);
        attempt.setIncorrectAnswers(req.getIncorrectAnswers() != null ? req.getIncorrectAnswers() : 0);
        attempt.setScorePercentage(req.getScorePercentage() != null ? req.getScorePercentage() : 0.0);
        attempt.setTimeTakenSeconds(req.getTimeTakenSeconds() != null ? req.getTimeTakenSeconds() : 0);

        return quizAttemptRepository.save(attempt);
    }

    public List<QuizAttempt> getUserAttempts(Long userId) {
        if (userId != null) {
            return quizAttemptRepository.findByUserIdOrderByCompletedAtDesc(userId);
        }
        return quizAttemptRepository.findAll();
    }

    public List<QuizQuestion> getAllQuizQuestions() {
        return quizQuestionRepository.findAll();
    }

    public QuizQuestion createQuizQuestion(QuizQuestion question) {
        if (question.getOptions() != null) {
            for (QuizOption opt : question.getOptions()) {
                opt.setQuestion(question);
            }
        }
        return quizQuestionRepository.save(question);
    }

    public void deleteQuizQuestion(Long id) {
        quizQuestionRepository.deleteById(id);
    }
}
