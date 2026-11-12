import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getQuestionsByTopicSlugApi,
  getQuestionsByTopicIdApi,
  recordQuestionStatusApi,
  getUserQuestionStatusesApi,
  updateCardProgressApi,
  getCardProgressApi
} from '../../services/subjectService';
import BulletPointsRenderer from '../common/BulletPointsRenderer';
import api from '../../services/api';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiCircle,
  FiEye,
  FiEyeOff,
  FiHelpCircle,
  FiZap,
  FiBookOpen,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiAward,
  FiStar,
  FiClock,
  FiRotateCcw,
  FiCheck,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';

export default function TopicInterviewQuestions({ topic, subject, allTopics = [] }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, BEGINNER, INTERMEDIATE, ADVANCED
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Practiced tracking
  const [practicedMap, setPracticedMap] = useState({}); // questionId -> boolean
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Topic navigation
  const subjectSlug = subject?.slug || 'core-java';
  const topicIdx = allTopics.findIndex((t) => t.id === topic.id || t.slug === topic.slug);
  const prevTopic = topicIdx > 0 ? allTopics[topicIdx - 1] : null;
  const nextTopic = topicIdx >= 0 && topicIdx < allTopics.length - 1 ? allTopics[topicIdx + 1] : null;

  // Admin state
  const isAdmin = user?.role === 'ADMIN' || user?.email === 'admin@interviewpocket.com';
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [adminFormData, setAdminFormData] = useState({
    question: '',
    difficulty: 'BEGINNER',
    simpleAnswer: '',
    detailedExplanation: '',
    realWorldExample: '',
    memoryTrick: '',
    interviewAnswer: '',
    isFrequentlyAsked: true,
    isImportant: true
  });
  const [adminSaving, setAdminSaving] = useState(false);

  // Fetch questions and user practice progress
  useEffect(() => {
    let isMounted = true;

    const loadQuestionsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch questions for this topic
        let qData = await getQuestionsByTopicSlugApi(topic.slug);
        if (!qData || qData.length === 0) {
          qData = await getQuestionsByTopicIdApi(topic.id);
        }

        if (!isMounted) return;
        setQuestions(qData || []);

        // 2. Fetch user practiced status
        if (user?.id) {
          try {
            const statuses = await getUserQuestionStatusesApi(user.id);
            if (isMounted && statuses && Array.isArray(statuses)) {
              const map = {};
              statuses.forEach((s) => {
                const qId = s.questionId || s.question?.id;
                if (qId && s.status === 'PRACTICED') {
                  map[qId] = true;
                }
              });
              setPracticedMap(map);
            }
          } catch (err) {
            console.error('Failed to load user question statuses:', err);
          }
        }
      } catch (err) {
        console.error('Failed to load questions:', err);
        if (isMounted) setError('Failed to load interview questions. Please try again.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (topic) {
      loadQuestionsData();
    }

    return () => { isMounted = false; };
  }, [topic, user]);

  // Filtered questions based on active difficulty tab
  const filteredQuestions = questions.filter((q) => {
    if (activeTab === 'ALL') return true;
    return (q.difficulty || 'BEGINNER').toUpperCase() === activeTab;
  });

  // Keep currentIndex in bounds when tab changes
  useEffect(() => {
    setCurrentIndex(0);
    setRevealed(false);
  }, [activeTab]);

  const currentQuestion = filteredQuestions[currentIndex] || null;

  // Toggle Reveal Answer
  const handleToggleReveal = () => {
    setRevealed((prev) => !prev);
  };

  // Mark as Practiced
  const handleTogglePracticed = async () => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    const newStatus = practicedMap[qId] ? 'UNPRACTICED' : 'PRACTICED';

    try {
      setUpdatingStatus(true);
      const userId = user?.id || 1;
      await recordQuestionStatusApi(userId, qId, newStatus);

      setPracticedMap((prev) => ({
        ...prev,
        [qId]: newStatus === 'PRACTICED'
      }));

      // Check if all questions in this topic are practiced
      const updatedMap = { ...practicedMap, [qId]: newStatus === 'PRACTICED' };
      const totalPracticed = questions.filter((q) => updatedMap[q.id]).length;

      if (totalPracticed >= Math.ceil(questions.length * 0.8)) {
        // Mark Questions card completed
        await updateCardProgressApi(userId, topic.id, 'QUESTIONS', true);
      }
    } catch (err) {
      console.error('Failed to update question status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Navigation handlers
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setRevealed(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRevealed(false);
    }
  };

  // Question counts by difficulty
  const counts = {
    ALL: questions.length,
    BEGINNER: questions.filter((q) => (q.difficulty || 'BEGINNER').toUpperCase() === 'BEGINNER').length,
    INTERMEDIATE: questions.filter((q) => (q.difficulty || '').toUpperCase() === 'INTERMEDIATE').length,
    ADVANCED: questions.filter((q) => (q.difficulty || '').toUpperCase() === 'ADVANCED').length,
    TRICKY: questions.filter((q) => (q.difficulty || '').toUpperCase() === 'TRICKY').length
  };

  // Overall practiced count
  const practicedCount = questions.filter((q) => practicedMap[q.id]).length;
  const progressPercent = questions.length > 0 ? Math.round((practicedCount / questions.length) * 100) : 0;

  // Admin: Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingQuestion(null);
    setAdminFormData({
      question: '',
      difficulty: activeTab === 'ALL' ? 'BEGINNER' : activeTab,
      simpleAnswer: '',
      detailedExplanation: '',
      realWorldExample: '',
      memoryTrick: '',
      interviewAnswer: '',
      isFrequentlyAsked: true,
      isImportant: true
    });
    setShowAdminModal(true);
  };

  // Admin: Open Edit Modal
  const handleOpenEditModal = (q) => {
    setEditingQuestion(q);
    setAdminFormData({
      question: q.question || '',
      difficulty: q.difficulty || 'BEGINNER',
      simpleAnswer: q.simpleAnswer || '',
      detailedExplanation: q.detailedExplanation || '',
      realWorldExample: q.realWorldExample || '',
      memoryTrick: q.memoryTrick || '',
      interviewAnswer: q.interviewAnswer || '',
      isFrequentlyAsked: !!q.isFrequentlyAsked,
      isImportant: !!q.isImportant
    });
    setShowAdminModal(true);
  };

  // Admin: Save Question (Create or Update)
  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    try {
      setAdminSaving(true);
      const payload = {
        ...adminFormData,
        subject: { id: subject?.id || 1 },
        topic: { id: topic.id },
        displayOrder: editingQuestion ? editingQuestion.displayOrder : questions.length + 1
      };

      if (editingQuestion) {
        const res = await api.put(`/questions/${editingQuestion.id}`, payload);
        setQuestions((prev) => prev.map((q) => (q.id === editingQuestion.id ? res.data : q)));
      } else {
        const res = await api.post('/questions', payload);
        setQuestions((prev) => [...prev, res.data]);
      }

      setShowAdminModal(false);
      setEditingQuestion(null);
    } catch (err) {
      console.error('Failed to save question:', err);
      alert('Failed to save question. Please check backend connection.');
    } finally {
      setAdminSaving(false);
    }
  };

  // Admin: Delete Question
  const handleDeleteQuestion = async (qId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.delete(`/questions/${qId}`);
      setQuestions((prev) => prev.filter((q) => q.id !== qId));
      if (currentIndex >= filteredQuestions.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } catch (err) {
      console.error('Failed to delete question:', err);
      alert('Failed to delete question.');
    }
  };

  const getDifficultyBadge = (diff) => {
    switch ((diff || '').toUpperCase()) {
      case 'BEGINNER':
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2 py-1 small fw-semibold">Beginner</span>;
      case 'INTERMEDIATE':
        return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-2 py-1 small fw-semibold">Intermediate</span>;
      case 'ADVANCED':
        return <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-2 py-1 small fw-semibold">Advanced</span>;
      case 'TRICKY':
        return <span className="badge bg-info bg-opacity-10 text-info-emphasis border border-info border-opacity-30 px-2 py-1 small fw-semibold">Tricky / Edge Case</span>;
      default:
        return <span className="badge bg-secondary bg-opacity-10 text-secondary border px-2 py-1 small">General</span>;
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading interview questions...</span>
        </div>
        <p className="text-secondary small mt-3">Loading curated interview questions...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 py-lg-5" style={{ maxWidth: '1080px' }}>
      {/* Top Breadcrumb & Navigation */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <Link
          to={`/subjects/${subject?.slug || 'core-java'}/topics/${topic.slug}`}
          className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 text-decoration-none fw-medium"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <FiArrowLeft size={16} />
          <span>Back to Topic Overview</span>
        </Link>

        {/* Practice Progress Header Pill */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 bg-light dark:bg-dark border rounded-pill px-3 py-1 small">
            <FiCheckCircle className="text-success" size={15} />
            <span className="fw-semibold text-secondary">
              Practiced: <strong className="text-dark dark:text-white">{practicedCount}/{questions.length}</strong> ({progressPercent}%)
            </span>
          </div>

          {isAdmin && (
            <button
              onClick={handleOpenCreateModal}
              className="btn btn-sm btn-success rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 shadow-sm"
            >
              <FiPlus size={16} />
              <span>Add Question</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Topic Header */}
      <div
        className="p-4 rounded-4 border shadow-sm mb-4 position-relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.02) 100%)'
        }}
      >
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="badge rounded-pill bg-success bg-opacity-15 text-success fw-bold px-3 py-1" style={{ fontSize: '0.78rem' }}>
            {subject?.name || 'Core Java'} • INTERVIEW QUESTIONS
          </span>
          <span className="text-secondary small">• {questions.length} Curated Questions</span>
        </div>

        <h1 className="fw-extrabold mb-2" style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
          {topic.title} — Interview Practice
        </h1>
        <p className="text-secondary small mb-0" style={{ maxWidth: '720px' }}>
          Master technical interviews with beginner, intermediate, and advanced questions accompanied by clear answers, practical examples, memory tricks, and recruiter-ready responses.
        </p>

        {/* Overall Progress Bar */}
        <div className="mt-3" style={{ maxWidth: '400px' }}>
          <div className="progress" style={{ height: '6px', backgroundColor: '#e2e8f0' }}>
            <div
              className="progress-bar bg-success progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${progressPercent}%`, transition: 'width 0.4s ease' }}
            />
          </div>
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {[
          { key: 'ALL', label: 'All Questions', count: counts.ALL },
          { key: 'BEGINNER', label: 'Beginner', count: counts.BEGINNER },
          { key: 'INTERMEDIATE', label: 'Intermediate', count: counts.INTERMEDIATE },
          { key: 'ADVANCED', label: 'Advanced', count: counts.ADVANCED },
          { key: 'TRICKY', label: 'Tricky & Edge Cases', count: counts.TRICKY || 0 }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 border transition-all ${
              activeTab === tab.key
                ? 'btn-success text-white shadow-sm'
                : 'btn-outline-secondary bg-white text-secondary'
            }`}
            style={{ fontSize: '0.85rem' }}
          >
            <span>{tab.label}</span>
            <span
              className={`badge rounded-pill px-2 py-0.5 small ${
                activeTab === tab.key ? 'bg-white text-success' : 'bg-light text-muted border'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Question Card Box */}
      {filteredQuestions.length === 0 ? (
        <div className="p-5 text-center rounded-4 border bg-white shadow-sm my-4">
          <FiHelpCircle size={40} className="text-muted mb-3" />
          <h5 className="fw-bold text-dark">No questions found</h5>
          <p className="text-secondary small mb-3">No interview questions available under this difficulty tier yet.</p>
          <button onClick={() => setActiveTab('ALL')} className="btn btn-sm btn-outline-success rounded-pill px-3 py-1">
            View All Questions
          </button>
        </div>
      ) : (
        currentQuestion && (
          <div
            className="rounded-4 border shadow-sm mb-4 overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            {/* Question Top Header Bar */}
            <div
              className="p-3 px-md-4 border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3"
              style={{ backgroundColor: '#f8fafc' }}
            >
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="badge bg-dark rounded-pill px-3 py-1 fw-bold small">
                  Question {currentIndex + 1} of {filteredQuestions.length}
                </span>
                {getDifficultyBadge(currentQuestion.difficulty)}
                {currentQuestion.isFrequentlyAsked && (
                  <span className="badge bg-warning bg-opacity-20 text-dark border border-warning border-opacity-30 px-2 py-1 small fw-semibold d-inline-flex align-items-center gap-1">
                    <FiStar className="text-warning" size={12} /> Frequently Asked
                  </span>
                )}
                {currentQuestion.isImportant && (
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-2 py-1 small fw-semibold">
                    Core Concept
                  </span>
                )}
                {currentQuestion.sourceReference && (
                  <span className="badge bg-secondary bg-opacity-10 text-secondary border px-2 py-1 small fw-normal d-inline-flex align-items-center gap-1">
                    <FiBookOpen size={11} /> Source: {currentQuestion.sourceReference}
                  </span>
                )}
              </div>

              {/* Status & Admin Actions */}
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={handleTogglePracticed}
                  disabled={updatingStatus}
                  className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-2 border transition-all ${
                    practicedMap[currentQuestion.id]
                      ? 'btn-success text-white'
                      : 'btn-outline-secondary bg-white text-secondary'
                  }`}
                  style={{ fontSize: '0.82rem' }}
                >
                  {practicedMap[currentQuestion.id] ? (
                    <>
                      <FiCheck size={14} />
                      <span>Practiced</span>
                    </>
                  ) : (
                    <>
                      <FiCircle size={14} />
                      <span>Mark as Practiced</span>
                    </>
                  )}
                </button>

                {isAdmin && (
                  <>
                    <button
                      onClick={() => handleOpenEditModal(currentQuestion)}
                      className="btn btn-sm btn-outline-primary border-0 p-1.5 rounded-3"
                      title="Edit Question"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(currentQuestion.id)}
                      className="btn btn-sm btn-outline-danger border-0 p-1.5 rounded-3"
                      title="Delete Question"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Question Body */}
            <div className="p-4 p-md-5">
              <div className="d-flex align-items-start gap-3 mb-4">
                <div
                  className="rounded-3 p-2 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: '40px', height: '40px' }}
                >
                  <FiHelpCircle size={22} />
                </div>
                <h3
                  className="fw-bold mb-0 lh-base"
                  style={{ color: 'var(--text-primary)', fontSize: '1.28rem' }}
                >
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Reveal / Conceal Toggle Button */}
              <div className="my-4 pt-2">
                <button
                  type="button"
                  onClick={handleToggleReveal}
                  className={`btn px-4 py-2.5 rounded-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm transition-all ${
                    revealed ? 'btn-outline-secondary' : 'btn-success text-white'
                  }`}
                  style={{ fontSize: '0.92rem' }}
                >
                  {revealed ? (
                    <>
                      <FiEyeOff size={18} />
                      <span>Hide Answer</span>
                    </>
                  ) : (
                    <>
                      <FiEye size={18} />
                      <span>Reveal Answer</span>
                    </>
                  )}
                </button>
              </div>

              {/* Revealed Answer Content */}
              {revealed && (
                <div className="mt-4 pt-3 border-top animate__animated animate__fadeIn">
                  {/* 1. Simple Crisp Answer */}
                  <div className="mb-4 p-3 rounded-3 border-start border-4 border-success" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <h6 className="fw-bold text-success text-uppercase small mb-2 d-flex align-items-center gap-2">
                      <FiZap size={15} /> Quick Answer (30-Second Summary)
                    </h6>
                    <BulletPointsRenderer content={currentQuestion.simpleAnswer} bulletColor="#10b981" />
                  </div>

                  {/* 2. Detailed Explanation */}
                  {currentQuestion.detailedExplanation && (
                    <div className="mb-4">
                      <h6 className="fw-bold small text-uppercase mb-2" style={{ color: 'var(--text-primary)' }}>
                        Detailed Explanation
                      </h6>
                      <BulletPointsRenderer content={currentQuestion.detailedExplanation} bulletColor="#10b981" />
                    </div>
                  )}

                  {/* 3. Real-world Analogy / Example */}
                  {currentQuestion.realWorldExample && (
                    <div className="mb-4 p-3 rounded-3 border" style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
                      <h6 className="fw-bold text-warning-emphasis small text-uppercase mb-2 d-flex align-items-center gap-2">
                        <FiBookOpen size={15} /> Real-World Analogy
                      </h6>
                      <BulletPointsRenderer content={currentQuestion.realWorldExample} bulletColor="#f59e0b" />
                    </div>
                  )}

                  {/* 4. Memory Trick */}
                  {currentQuestion.memoryTrick && (
                    <div className="mb-4 p-3 rounded-3 border" style={{ backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.25)' }}>
                      <h6 className="fw-bold text-info-emphasis small text-uppercase mb-1 d-flex align-items-center gap-2">
                        <FiAward size={15} /> Quick Memory Hook
                      </h6>
                      <p className="mb-0 small font-monospace fw-semibold" style={{ color: 'var(--text-primary)' }}>
                        {currentQuestion.memoryTrick}
                      </p>
                    </div>
                  )}

                  {/* 5. Recruiter-Ready Interview Answer */}
                  {currentQuestion.interviewAnswer && (
                    <div className="p-4 rounded-3 border shadow-sm" style={{ backgroundColor: '#0f172a', color: '#f8fafc' }}>
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom border-secondary border-opacity-25 pb-2">
                        <span className="badge bg-primary text-uppercase px-2.5 py-1 fw-bold" style={{ fontSize: '0.72rem' }}>
                          Say This in the Interview
                        </span>
                        <span className="small text-secondary" style={{ fontSize: '0.75rem' }}>
                          Standard Senior Engineering Format
                        </span>
                      </div>
                      <BulletPointsRenderer content={currentQuestion.interviewAnswer} bulletColor="#38bdf8" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Navigation Toolbar */}
            <div
              className="p-3 px-md-4 border-top d-flex align-items-center justify-content-between gap-3"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              >
                <FiArrowLeft size={16} />
                <span>Previous</span>
              </button>

              {/* Jump Dots / Pills for Quick Nav */}
              <div className="d-none d-md-flex align-items-center gap-1.5 overflow-x-auto px-2" style={{ maxWidth: '400px' }}>
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setRevealed(false);
                    }}
                    className={`btn btn-sm p-0 rounded-circle border transition-all ${
                      idx === currentIndex
                        ? 'btn-success text-white shadow-sm'
                        : practicedMap[q.id]
                        ? 'btn-outline-success text-success bg-white'
                        : 'btn-outline-secondary text-secondary bg-white'
                    }`}
                    style={{ width: '28px', height: '28px', fontSize: '0.75rem', fontWeight: 600 }}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === filteredQuestions.length - 1}
                className="btn btn-sm btn-success rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2 text-white fw-semibold shadow-sm"
              >
                <span>Next</span>
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>
        )
      )}

      {/* Topic Previous / Next Footer Navigation */}
      <div className="p-4 rounded-4 border shadow-sm mt-4 d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        {prevTopic ? (
          <Link
            to={`/subjects/${subjectSlug}/topics/${prevTopic.slug}/questions`}
            className="btn btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 text-decoration-none fw-semibold small"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            <FiChevronLeft size={16} />
            <span>Previous: {prevTopic.title}</span>
          </Link>
        ) : (
          <div></div>
        )}

        <Link
          to={`/subjects/${subjectSlug}/topics/${topic.slug}/quiz`}
          className="btn btn-warning text-dark px-4 py-2 rounded-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
        >
          <span>Take Topic Quiz</span>
          <FiArrowRight size={16} />
        </Link>

        {nextTopic ? (
          <Link
            to={`/subjects/${subjectSlug}/topics/${nextTopic.slug}/questions`}
            className="btn btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 text-decoration-none fw-semibold small"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            <span>Next: {nextTopic.title}</span>
            <FiChevronRight size={16} />
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {/* Admin Add/Edit Modal */}
      {showAdminModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom px-4 py-3">
                <h5 className="modal-title fw-bold">
                  {editingQuestion ? 'Edit Interview Question' : 'Add New Interview Question'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAdminModal(false)}
                />
              </div>
              <form onSubmit={handleSaveQuestion}>
                <div className="modal-body px-4 py-3">
                  <div className="row g-3">
                    <div className="col-12 col-md-8">
                      <label className="form-label small fw-bold">Question *</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        required
                        value={adminFormData.question}
                        onChange={(e) => setAdminFormData({ ...adminFormData, question: e.target.value })}
                        placeholder="e.g. Why is Java platform independent?"
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-bold">Difficulty *</label>
                      <select
                        className="form-select rounded-3"
                        value={adminFormData.difficulty}
                        onChange={(e) => setAdminFormData({ ...adminFormData, difficulty: e.target.value })}
                      >
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold">Quick Answer (30-Sec Summary) *</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="2"
                        required
                        value={adminFormData.simpleAnswer}
                        onChange={(e) => setAdminFormData({ ...adminFormData, simpleAnswer: e.target.value })}
                        placeholder="Concise, crisp 1-2 sentence core answer..."
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold">Detailed Explanation</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="4"
                        value={adminFormData.detailedExplanation}
                        onChange={(e) => setAdminFormData({ ...adminFormData, detailedExplanation: e.target.value })}
                        placeholder="In-depth technical breakdown and corner cases..."
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">Real-World Analogy</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="2"
                        value={adminFormData.realWorldExample}
                        onChange={(e) => setAdminFormData({ ...adminFormData, realWorldExample: e.target.value })}
                        placeholder="e.g. Think of bytecode as universal sheet music played by local instruments..."
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">Memory Hook / Trick</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="2"
                        value={adminFormData.memoryTrick}
                        onChange={(e) => setAdminFormData({ ...adminFormData, memoryTrick: e.target.value })}
                        placeholder="e.g. WORA = Write Once, Run Anywhere..."
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold">Recruiter-Ready Answer *</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="3"
                        required
                        value={adminFormData.interviewAnswer}
                        onChange={(e) => setAdminFormData({ ...adminFormData, interviewAnswer: e.target.value })}
                        placeholder="Verbatim professional response for senior-level interviewers..."
                      />
                    </div>

                    <div className="col-12 d-flex gap-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="freqCheck"
                          checked={adminFormData.isFrequentlyAsked}
                          onChange={(e) => setAdminFormData({ ...adminFormData, isFrequentlyAsked: e.target.checked })}
                        />
                        <label className="form-check-label small" htmlFor="freqCheck">Frequently Asked</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="impCheck"
                          checked={adminFormData.isImportant}
                          onChange={(e) => setAdminFormData({ ...adminFormData, isImportant: e.target.checked })}
                        />
                        <label className="form-check-label small" htmlFor="impCheck">Core Concept</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top px-4 py-3">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-3"
                    onClick={() => setShowAdminModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={adminSaving}
                    className="btn btn-success rounded-3 px-4 shadow-sm"
                  >
                    {adminSaving ? 'Saving...' : editingQuestion ? 'Update Question' : 'Create Question'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
