package com.interviewpocket.service;

import com.interviewpocket.dto.SearchResultDto;
import com.interviewpocket.model.InterviewQuestion;
import com.interviewpocket.model.Subject;
import com.interviewpocket.model.Topic;
import com.interviewpocket.repository.InterviewQuestionRepository;
import com.interviewpocket.repository.SubjectRepository;
import com.interviewpocket.repository.TopicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class SearchService {

    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;
    private final InterviewQuestionRepository questionRepository;

    public SearchService(
            SubjectRepository subjectRepository,
            TopicRepository topicRepository,
            InterviewQuestionRepository questionRepository) {
        this.subjectRepository = subjectRepository;
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
    }

    public List<SearchResultDto> searchGlobal(String query) {
        List<SearchResultDto> results = new ArrayList<>();
        if (query == null || query.trim().isEmpty()) {
            return results;
        }

        String q = query.toLowerCase();

        // 1. Search Subjects
        for (Subject s : subjectRepository.findAll()) {
            if (s.getName().toLowerCase().contains(q) || (s.getDescription() != null && s.getDescription().toLowerCase().contains(q))) {
                results.add(new SearchResultDto("SUBJECT", s.getName(), s.getName(), "/subjects/" + s.getSlug(), s.getDescription()));
            }
        }

        // 2. Search Topics
        for (Topic t : topicRepository.findByTitleContainingIgnoreCase(query)) {
            results.add(new SearchResultDto(
                    "TOPIC",
                    t.getTitle(),
                    t.getSubject() != null ? t.getSubject().getName() : "Subject",
                    "/subjects/" + (t.getSubject() != null ? t.getSubject().getSlug() : "core-java") + "/topics/" + t.getSlug(),
                    t.getSummary()
            ));
        }

        // 3. Search Interview Questions
        for (InterviewQuestion iq : questionRepository.findByQuestionContainingIgnoreCase(query)) {
            results.add(new SearchResultDto(
                    "QUESTION",
                    iq.getQuestion(),
                    iq.getSubject() != null ? iq.getSubject().getName() : "General",
                    "/interview-questions?q=" + iq.getId(),
                    iq.getSimpleAnswer()
            ));
        }

        return results;
    }
}

