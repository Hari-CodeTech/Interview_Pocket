package com.interviewpocket;

import com.interviewpocket.dto.QuizAttemptRequest;
import com.interviewpocket.model.QuizAttempt;
import com.interviewpocket.model.Subject;
import com.interviewpocket.model.Topic;
import com.interviewpocket.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InterviewPocketApplicationTests {

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private TopicService topicService;

    @Autowired
    private NoteService noteService;

    @Autowired
    private InterviewQuestionService questionService;

    @Autowired
    private QuizService quizService;

    @Autowired
    private SearchService searchService;

    @Test
    void contextLoads() {
        assertNotNull(subjectService);
        assertNotNull(topicService);
        assertNotNull(noteService);
        assertNotNull(questionService);
        assertNotNull(quizService);
        assertNotNull(searchService);
    }

    @Test
    void testSubjectAndTopicRetrieval() {
        List<Subject> subjects = subjectService.getAllActiveSubjects();
        assertFalse(subjects.isEmpty(), "Subjects should be seeded");

        Subject coreJava = subjects.stream()
                .filter(s -> "core-java".equals(s.getSlug()))
                .findFirst()
                .orElse(null);
        assertNotNull(coreJava, "Core Java subject must exist");

        List<Topic> topics = topicService.getTopicsBySubjectId(coreJava.getId());
        assertFalse(topics.isEmpty(), "Core Java should have seeded topics");
    }

    @Test
    void testSearchGlobal() {
        var results = searchService.searchGlobal("Polymorphism");
        assertNotNull(results);
    }

    @Test
    void testQuizAttemptRecording() {
        QuizAttemptRequest req = new QuizAttemptRequest();
        req.setTotalQuestions(4);
        req.setCorrectAnswers(3);
        req.setIncorrectAnswers(1);
        req.setScorePercentage(75.0);
        req.setTimeTakenSeconds(120);

        QuizAttempt attempt = quizService.recordQuizAttempt(req);
        assertNotNull(attempt);
        assertNotNull(attempt.getId());
        assertEquals(75.0, attempt.getScorePercentage());
    }
}

