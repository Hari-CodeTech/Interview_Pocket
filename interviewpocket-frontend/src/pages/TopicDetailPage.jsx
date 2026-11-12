import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSubjectBySlugApi, getTopicsBySubjectIdApi } from '../services/subjectService';
import TopicNotesReader from '../components/topic/TopicNotesReader';
import TopicInterviewQuestions from '../components/topic/TopicInterviewQuestions';
import TopicQuizSystem from '../components/topic/TopicQuizSystem';
import TopicRagAdminBar from '../components/topic/TopicRagAdminBar';
import {
  FiArrowLeft,
  FiBookOpen,
  FiHelpCircle,
  FiAward,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiLayers
} from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';

export default function TopicDetailPage() {
  const { slug, topicSlug, section } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState(null);
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadTopicData = async () => {
      try {
        setLoading(true);
        // Load Subject Details
        const subData = await getSubjectBySlugApi(slug);
        if (!isMounted || !subData) return;
        setSubject(subData);

        // Load Topic Details from Subject
        const topics = await getTopicsBySubjectIdApi(subData.id);
        if (!isMounted) return;
        setAllTopics(topics || []);

        const currentTopic = topics.find((t) => t.slug === topicSlug || t.id?.toString() === topicSlug);
        if (!currentTopic) return;
        setTopic(currentTopic);
      } catch (err) {
        console.error('Failed to load topic details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTopicData();
    return () => { isMounted = false; };
  }, [slug, topicSlug]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading topic...</span>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container py-5 text-center">
        <div className="p-5 mx-auto rounded-4 border shadow-sm" style={{ maxWidth: '540px', backgroundColor: 'var(--bg-card)' }}>
          <h3 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Topic Not Found</h3>
          <p className="text-secondary small mb-4">The requested topic could not be found for this subject.</p>
          <Link to={`/subjects/${slug}`} className="btn btn-primary px-4 py-2 rounded-3">
            Back to {subject?.name || 'Subject'}
          </Link>
        </div>
      </div>
    );
  }

  const subjectName = subject?.name || 'Core Java';
  const backSubjectUrl = `/subjects/${slug}`;
  const topicBaseUrl = `/subjects/${slug}/topics/${topicSlug}`;

  // If a dedicated section is selected (notes, questions, or quiz)
  if (section === 'notes') {
    return <TopicNotesReader topic={topic} subject={subject} allTopics={allTopics} />;
  }

  if (section === 'questions') {
    return <TopicInterviewQuestions topic={topic} subject={subject} allTopics={allTopics} />;
  }

  if (section === 'quiz') {
    return <TopicQuizSystem topic={topic} subject={subject} allTopics={allTopics} />;
  }

  // --- DEDICATED TOPIC LANDING PAGE ---
  return (
    <div className="container py-4 py-lg-5" style={{ maxWidth: '1140px' }}>
      {/* Top Navigation & Back Button */}
      <div className="mb-3">
        <Link
          to={backSubjectUrl}
          className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 text-decoration-none fw-medium"
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
        >
          <FiArrowLeft size={16} />
          <span>Back to {subjectName}</span>
        </Link>
      </div>

      {/* Top Header Card */}
      <div
        className="p-4 p-md-5 rounded-4 border shadow-sm mb-5 position-relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          background: 'linear-gradient(135deg, rgba(248, 152, 32, 0.08) 0%, rgba(0, 98, 255, 0.02) 100%)'
        }}
      >
        {/* Subject Name Badge */}
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(248, 152, 32, 0.15)', color: '#d97706' }}>
          <FaJava size={14} />
          <span className="fw-bold small" style={{ fontSize: '0.8rem', letterSpacing: '0.03em' }}>
            {subjectName}
          </span>
        </div>

        {/* Topic Title */}
        <h1
          className="fw-extrabold mb-2"
          style={{
            color: 'var(--text-primary)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            letterSpacing: '-0.02em'
          }}
        >
          {topic.title}
        </h1>

        {/* Short Topic Description */}
        <p
          className="text-secondary lead fs-6 mb-0"
          style={{
            maxWidth: '750px',
            lineHeight: 1.6
          }}
        >
          {topic.summary || 'Master fundamental concepts, theoretical insights, and interview readiness for this core topic.'}
        </p>
      </div>

      {/* RAG Pilot Control & Workflow Bar for Frontend Pilot */}
      {(slug === 'frontend' || subject?.slug === 'frontend') && (
        <TopicRagAdminBar topic={topic} subject={subject} />
      )}

      {/* Three Large Interactive Cards */}
      <div className="row g-4">
        {/* Card 1: NOTES */}
        <div className="col-12 col-md-4">
          <div
            className="p-4 p-lg-5 rounded-4 border shadow-sm h-100 d-flex flex-column justify-content-between transition-all"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              minHeight: '360px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div>
              {/* Card Icon */}
              <div
                className="rounded-3 d-inline-flex align-items-center justify-content-center p-3 mb-4 text-white shadow-sm"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #0062ff 0%, #3b82f6 100%)'
                }}
              >
                <FiBookOpen size={26} />
              </div>

              {/* Title */}
              <h3
                className="fw-bold mb-3"
                style={{
                  color: 'var(--text-primary)',
                  letterSpacing: '0.02em',
                  fontSize: '1.4rem'
                }}
              >
                NOTES
              </h3>

              {/* Description */}
              <p
                className="text-secondary mb-4"
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}
              >
                Learn the topic through detailed explanations and examples.
              </p>
            </div>

            {/* Button */}
            <div>
              <Link
                to={`${topicBaseUrl}/notes`}
                className="btn w-100 py-3 rounded-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                style={{
                  backgroundColor: '#0062ff',
                  fontSize: '0.95rem'
                }}
              >
                <span>Explore Notes</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: INTERVIEW QUESTIONS */}
        <div className="col-12 col-md-4">
          <div
            className="p-4 p-lg-5 rounded-4 border shadow-sm h-100 d-flex flex-column justify-content-between transition-all"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              minHeight: '360px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div>
              {/* Card Icon */}
              <div
                className="rounded-3 d-inline-flex align-items-center justify-content-center p-3 mb-4 text-white shadow-sm"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                }}
              >
                <FiHelpCircle size={26} />
              </div>

              {/* Title */}
              <h3
                className="fw-bold mb-3"
                style={{
                  color: 'var(--text-primary)',
                  letterSpacing: '0.02em',
                  fontSize: '1.4rem'
                }}
              >
                INTERVIEW QUESTIONS
              </h3>

              {/* Description */}
              <p
                className="text-secondary mb-4"
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}
              >
                Prepare with beginner, intermediate, advanced and tricky interview questions.
              </p>
            </div>

            {/* Button */}
            <div>
              <Link
                to={`${topicBaseUrl}/questions`}
                className="btn w-100 py-3 rounded-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                style={{
                  backgroundColor: '#10b981',
                  fontSize: '0.95rem'
                }}
              >
                <span>Practice Questions</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: QUIZ */}
        <div className="col-12 col-md-4">
          <div
            className="p-4 p-lg-5 rounded-4 border shadow-sm h-100 d-flex flex-column justify-content-between transition-all"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              minHeight: '360px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div>
              {/* Card Icon */}
              <div
                className="rounded-3 d-inline-flex align-items-center justify-content-center p-3 mb-4 text-white shadow-sm"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                }}
              >
                <FiAward size={26} />
              </div>

              {/* Title */}
              <h3
                className="fw-bold mb-3"
                style={{
                  color: 'var(--text-primary)',
                  letterSpacing: '0.02em',
                  fontSize: '1.4rem'
                }}
              >
                QUIZ
              </h3>

              {/* Description */}
              <p
                className="text-secondary mb-4"
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}
              >
                Test your knowledge with randomized multiple-choice questions.
              </p>
            </div>

            {/* Button */}
            <div>
              <Link
                to={`${topicBaseUrl}/quiz`}
                className="btn w-100 py-3 rounded-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                style={{
                  backgroundColor: '#f59e0b',
                  fontSize: '0.95rem'
                }}
              >
                <span>Start Quiz</span>
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
