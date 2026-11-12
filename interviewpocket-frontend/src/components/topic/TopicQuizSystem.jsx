import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  generateQuizSessionApi,
  checkQuizAnswerApi,
  submitQuizAttemptApi,
  getUserQuizAttemptsApi,
  updateCardProgressApi
} from '../../services/subjectService';
import BulletPointsRenderer from '../common/BulletPointsRenderer';
import api from '../../services/api';
import {
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiXCircle,
  FiHelpCircle,
  FiClock,
  FiRotateCcw,
  FiBarChart2,
  FiLayers,
  FiAlertCircle,
  FiZap,
  FiCheck,
  FiX,
  FiPlus,
  FiEye,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';

export default function TopicQuizSystem({ topic, subject, allTopics = [] }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Navigation
  const subjectSlug = subject?.slug || 'core-java';
  const topicIdx = allTopics.findIndex((t) => t.id === topic.id || t.slug === topic.slug);
  const prevTopic = topicIdx > 0 ? allTopics[topicIdx - 1] : null;
  const nextTopic = topicIdx >= 0 && topicIdx < allTopics.length - 1 ? allTopics[topicIdx + 1] : null;

  // Quiz session state
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  // Active quiz gameplay state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // questionId -> selectedOptionId
  const [checkedAnswers, setCheckedAnswers] = useState({}); // questionId -> { isCorrect, correctOptionId, correctOptionLabel, explanation }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Result summary
  const [attemptResult, setAttemptResult] = useState(null);

  // Past Attempts History
  const [showHistory, setShowHistory] = useState(false);
  const [pastAttempts, setPastAttempts] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Mode: Instant Check vs Exam Mode
  const [instantCheckMode, setInstantCheckMode] = useState(true);

  // Admin state
  const isAdmin = user?.role === 'ADMIN' || user?.email === 'admin@interviewpocket.com';
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminSaving, setAdminSaving] = useState(false);
  const [newQuestionData, setNewQuestionData] = useState({
    questionText: '',
    codeSnippet: '',
    difficulty: 'BEGINNER',
    hint: '',
    explanation: '',
    options: [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  });

  // Load a brand new randomized quiz session
  const startNewQuiz = async () => {
    try {
      setLoadingSession(true);
      setSessionError(null);
      setIsSubmitted(false);
      setAttemptResult(null);
      setSelectedAnswers({});
      setCheckedAnswers({});
      setCurrentIndex(0);
      setSecondsElapsed(0);

      let sessionData = await generateQuizSessionApi({
        topicSlug: topic.slug,
        subjectSlug: subjectSlug,
        limit: 5
      });

      // If no questions specific to this topic, fallback to subject-level pool
      if (!sessionData || !sessionData.questions || sessionData.questions.length === 0) {
        sessionData = await generateQuizSessionApi({
          subjectSlug: subjectSlug,
          limit: 5
        });
      }

      if (!sessionData || !sessionData.questions || sessionData.questions.length === 0) {
        setSessionError('No quiz questions currently available. Please check backend connection.');
      } else {
        setSession(sessionData);
        setTimerActive(true);
      }
    } catch (err) {
      console.error('Failed to load quiz session:', err);
      setSessionError('Failed to generate randomized quiz. Please verify backend connection.');
    } finally {
      setLoadingSession(false);
    }
  };

  useEffect(() => {
    if (topic) {
      startNewQuiz();
    }
  }, [topic]);

  // Timer interval
  useEffect(() => {
    let timer;
    if (timerActive && !isSubmitted) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, isSubmitted]);

  // Load past attempts
  const loadPastAttempts = async () => {
    if (!user?.id) return;
    try {
      setLoadingHistory(true);
      const attempts = await getUserQuizAttemptsApi(user.id);
      // Filter for this topic or show all
      const topicAttempts = (attempts || []).filter(
        (a) => a.topicId === topic.id || a.topicSlug === topic.slug
      );
      setPastAttempts(topicAttempts);
    } catch (err) {
      console.error('Failed to load past attempts:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleToggleHistory = () => {
    if (!showHistory) {
      loadPastAttempts();
    }
    setShowHistory((prev) => !prev);
  };

  // Option selection
  const handleSelectOption = async (optionId) => {
    if (isSubmitted) return;

    const currentQ = session?.questions[currentIndex];
    if (!currentQ) return;

    const newSelections = { ...selectedAnswers, [currentQ.id]: optionId };
    setSelectedAnswers(newSelections);

    // If in instant feedback mode, verify answer immediately with backend
    if (instantCheckMode && !checkedAnswers[currentQ.id]) {
      try {
        const checkRes = await checkQuizAnswerApi(currentQ.id, optionId);
        setCheckedAnswers((prev) => ({
          ...prev,
          [currentQ.id]: checkRes
        }));
      } catch (err) {
        console.error('Failed to check answer:', err);
      }
    }
  };

  // Submit full quiz
  const handleSubmitQuiz = async () => {
    if (!session || isSubmitted) return;

    try {
      setSubmitting(true);
      setTimerActive(false);

      // Check all remaining answers with backend
      const checks = { ...checkedAnswers };
      for (const q of session.questions) {
        if (!checks[q.id] && selectedAnswers[q.id]) {
          try {
            const checkRes = await checkQuizAnswerApi(q.id, selectedAnswers[q.id]);
            checks[q.id] = checkRes;
          } catch (e) {
            console.error('Error checking question:', q.id, e);
          }
        }
      }
      setCheckedAnswers(checks);

      // Calculate score
      let correctCount = 0;
      let incorrectCount = 0;
      session.questions.forEach((q) => {
        const res = checks[q.id];
        if (res?.isCorrect) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });

      const total = session.questions.length;
      const scorePct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

      // Submit attempt record to backend
      const attemptPayload = {
        userId: user?.id || 1,
        quizId: session.quizId,
        subjectSlug: subject?.slug || 'core-java',
        topicId: topic.id,
        topicSlug: topic.slug,
        category: session.category || 'Core Java',
        difficulty: session.difficulty || 'GENERAL',
        userAnswersJson: JSON.stringify(selectedAnswers),
        totalQuestions: total,
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        scorePercentage: scorePct,
        timeTakenSeconds: secondsElapsed
      };

      const savedAttempt = await submitQuizAttemptApi(attemptPayload);

      // Update topic card progress in DB
      await updateCardProgressApi(
        user?.id || 1,
        topic.id,
        'QUIZ',
        scorePct >= 60, // Completed if score >= 60%
        scorePct
      );

      setAttemptResult({
        total,
        correct: correctCount,
        incorrect: incorrectCount,
        scorePercentage: scorePct,
        timeTaken: secondsElapsed,
        attemptId: savedAttempt?.id
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit quiz attempt:', err);
      alert('Failed to record quiz submission. Please check backend.');
    } finally {
      setSubmitting(false);
    }
  };

  // Admin: Save New Question
  const handleAdminSaveQuestion = async (e) => {
    e.preventDefault();
    try {
      setAdminSaving(true);
      const payload = {
        quiz: { id: session?.quizId || 14 },
        topic: { id: topic.id },
        questionText: newQuestionData.questionText,
        codeSnippet: newQuestionData.codeSnippet,
        difficulty: newQuestionData.difficulty,
        hint: newQuestionData.hint,
        explanation: newQuestionData.explanation,
        options: newQuestionData.options.map((opt, idx) => ({
          optionText: opt.text,
          optionLabel: ['A', 'B', 'C', 'D'][idx],
          isCorrect: opt.isCorrect,
          displayOrder: idx + 1
        }))
      };

      await api.post('/quizzes/questions', payload);
      alert('Question added successfully to question pool!');
      setShowAdminModal(false);
      startNewQuiz(); // reload quiz session
    } catch (err) {
      console.error('Failed to save quiz question:', err);
      alert('Failed to save question.');
    } finally {
      setAdminSaving(false);
    }
  };

  // Format time
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const currentQ = session?.questions[currentIndex];
  const isCurrentChecked = currentQ && checkedAnswers[currentQ.id];

  if (loadingSession) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Generating quiz...</span>
        </div>
        <p className="text-secondary small mt-3">Generating randomized questions with shuffled options...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 py-lg-5" style={{ maxWidth: '1080px' }}>
      {/* Top Breadcrumb & Toolbar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <Link
          to={`/subjects/${subject?.slug || 'core-java'}/topics/${topic.slug}`}
          className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 text-decoration-none fw-medium"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <FiArrowLeft size={16} />
          <span>Back to Topic Overview</span>
        </Link>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          {/* History Button */}
          <button
            type="button"
            onClick={handleToggleHistory}
            className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 fw-medium"
          >
            <FiBarChart2 size={15} />
            <span>{showHistory ? 'Hide Attempts' : 'Attempt History'}</span>
          </button>

          {/* New Random Attempt Button */}
          <button
            type="button"
            onClick={startNewQuiz}
            className="btn btn-sm btn-outline-warning text-dark rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
          >
            <FiRotateCcw size={15} />
            <span>Retake / New Questions</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => setShowAdminModal(true)}
              className="btn btn-sm btn-warning text-dark rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 fw-semibold shadow-sm"
            >
              <FiPlus size={15} />
              <span>Add MCQ</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header Banner */}
      <div
        className="p-4 rounded-4 border shadow-sm mb-4 position-relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.09) 0%, rgba(217, 119, 6, 0.03) 100%)'
        }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-2">
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-warning bg-opacity-20 text-dark fw-bold px-3 py-1" style={{ fontSize: '0.78rem' }}>
              {subject?.name || 'Core Java'} • RANDOMIZED QUIZ
            </span>
            <span className="text-secondary small">• 5 Questions / Session</span>
          </div>

          {/* Timer Display */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white border shadow-sm">
            <FiClock className="text-warning" size={15} />
            <span className="font-monospace fw-bold text-dark small">{formatTime(secondsElapsed)}</span>
          </div>
        </div>

        <h1 className="fw-extrabold mb-2" style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
          {topic.title} — Knowledge Check
        </h1>
        <p className="text-secondary small mb-0" style={{ maxWidth: '720px' }}>
          Test your conceptual depth and code-tracing readiness with dynamic questions selected from our bank. Every attempt generates a new question combination with randomized options.
        </p>

        {/* Feedback Mode Switch */}
        <div className="mt-3 d-flex align-items-center gap-3">
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              id="instantCheckSwitch"
              checked={instantCheckMode}
              disabled={isSubmitted}
              onChange={(e) => setInstantCheckMode(e.target.checked)}
            />
            <label className="form-check-label small text-secondary fw-semibold" htmlFor="instantCheckSwitch">
              Instant feedback & explanation on answer select
            </label>
          </div>
        </div>
      </div>

      {/* Attempt History Card (Collapsible) */}
      {showHistory && (
        <div className="rounded-4 border shadow-sm p-4 mb-4 bg-white">
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FiBarChart2 className="text-warning" /> Your Past Attempts for this Topic
          </h5>
          {loadingHistory ? (
            <p className="text-secondary small">Loading history...</p>
          ) : pastAttempts.length === 0 ? (
            <p className="text-secondary small mb-0">No recorded attempts yet. Complete this quiz to track your history!</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="small">Date</th>
                    <th className="small">Score</th>
                    <th className="small">Result</th>
                    <th className="small">Time Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {pastAttempts.map((att, i) => (
                    <tr key={att.id || i}>
                      <td className="small text-secondary">
                        {att.attemptDate ? new Date(att.attemptDate).toLocaleDateString() : 'Recent'}
                      </td>
                      <td className="small fw-bold">
                        {att.correctAnswers}/{att.totalQuestions} ({Math.round(att.scorePercentage || 0)}%)
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-2 py-1 small ${
                            att.scorePercentage >= 60
                              ? 'bg-success bg-opacity-15 text-success'
                              : 'bg-danger bg-opacity-15 text-danger'
                          }`}
                        >
                          {att.scorePercentage >= 60 ? 'PASSED' : 'NEEDS PRACTICE'}
                        </span>
                      </td>
                      <td className="small font-monospace text-secondary">
                        {formatTime(att.timeTakenSeconds || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Final Results Summary Card (After Submission) */}
      {isSubmitted && attemptResult && (
        <div
          className="p-4 p-md-5 rounded-4 border shadow-sm mb-4 text-center animate__animated animate__fadeIn"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: attemptResult.scorePercentage >= 60 ? '#10b981' : '#f59e0b',
            borderWidth: '2px'
          }}
        >
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3 text-white shadow-sm"
            style={{
              backgroundColor: attemptResult.scorePercentage >= 60 ? '#10b981' : '#f59e0b',
              width: '64px',
              height: '64px'
            }}
          >
            <FiAward size={32} />
          </div>

          <h3 className="fw-extrabold mb-1" style={{ color: 'var(--text-primary)' }}>
            {attemptResult.scorePercentage >= 60 ? 'Quiz Completed Successfully!' : 'Quiz Completed — Keep Practicing!'}
          </h3>
          <p className="text-secondary small mb-4">
            You scored <strong>{attemptResult.scorePercentage}%</strong> ({attemptResult.correct} of {attemptResult.total} questions correct) in {formatTime(attemptResult.timeTaken)}.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
            <div className="p-3 px-4 rounded-3 border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', minWidth: '120px' }}>
              <div className="text-secondary small fw-semibold">Score</div>
              <div className="fs-4 fw-extrabold text-primary">{attemptResult.scorePercentage}%</div>
            </div>
            <div className="p-3 px-4 rounded-3 border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', minWidth: '120px' }}>
              <div className="text-secondary small fw-semibold">Correct</div>
              <div className="fs-4 fw-extrabold text-success">{attemptResult.correct}</div>
            </div>
            <div className="p-3 px-4 rounded-3 border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', minWidth: '120px' }}>
              <div className="text-secondary small fw-semibold">Incorrect</div>
              <div className="fs-4 fw-extrabold text-danger">{attemptResult.incorrect}</div>
            </div>
            <div className="p-3 px-4 rounded-3 border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-secondary)', minWidth: '120px' }}>
              <div className="text-secondary small fw-semibold">Time</div>
              <div className="fs-4 fw-extrabold font-monospace" style={{ color: 'var(--text-primary)' }}>{formatTime(attemptResult.timeTaken)}</div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button
              onClick={startNewQuiz}
              className="btn btn-warning text-dark fw-bold px-4 py-2.5 rounded-3 d-inline-flex align-items-center gap-2 shadow-sm"
            >
              <FiRotateCcw size={16} />
              <span>Retake Quiz (Randomized)</span>
            </button>
          </div>
        </div>
      )}

      {/* Error or Empty State */}
      {sessionError && (
        <div className="p-5 text-center rounded-4 border bg-white shadow-sm my-4">
          <FiAlertCircle size={40} className="text-warning mb-3" />
          <h5 className="fw-bold text-dark">{sessionError}</h5>
          <p className="text-secondary small mb-3">Please check back soon or try regenerating.</p>
          <button onClick={startNewQuiz} className="btn btn-sm btn-outline-warning text-dark rounded-pill px-4 py-2">
            Try Again
          </button>
        </div>
      )}

      {/* Main MCQ Question Card */}
      {!sessionError && session && currentQ && (
        <div
          className="rounded-4 border shadow-sm mb-4 overflow-hidden"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          {/* Header Bar */}
          <div
            className="p-3 px-md-4 border-bottom d-flex align-items-center justify-content-between"
            style={{ backgroundColor: '#f8fafc' }}
          >
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-warning text-dark rounded-pill px-3 py-1 fw-bold small">
                Question {currentIndex + 1} of {session.questions.length}
              </span>
              <span className="badge bg-secondary bg-opacity-10 text-secondary border px-2 py-1 small">
                {currentQ.difficulty || 'Beginner'}
              </span>
              {currentQ.sourceReference && (
                <span className="badge bg-info bg-opacity-10 text-info-emphasis border border-info border-opacity-25 px-2 py-1 small fw-normal">
                  Source: {currentQ.sourceReference}
                </span>
              )}
            </div>

            <div className="small text-secondary">
              Answered: <strong className="text-dark">{Object.keys(selectedAnswers).length}</strong>/{session.questions.length}
            </div>
          </div>

          {/* Question Body */}
          <div className="p-4 p-md-5">
            <h4 className="fw-bold mb-3" style={{ color: 'var(--text-primary)', fontSize: '1.25rem', lineHeight: 1.6 }}>
              {currentQ.questionText}
            </h4>

            {/* Code Snippet if present */}
            {currentQ.codeSnippet && (
              <div className="rounded-3 overflow-hidden border mb-4 shadow-sm" style={{ backgroundColor: '#0f172a' }}>
                <div className="px-3 py-1.5 bg-dark border-bottom border-secondary border-opacity-25 small font-monospace text-info">
                  Code Snippet
                </div>
                <pre className="p-3 mb-0 text-white font-monospace small overflow-x-auto">
                  <code>{currentQ.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* 4 Shuffled Options */}
            <div className="d-flex flex-column gap-2.5 my-4">
              {currentQ.options.map((option) => {
                const isSelected = selectedAnswers[currentQ.id] === option.id;
                const checkInfo = checkedAnswers[currentQ.id];

                // Styling logic when checked
                let optionStyle = {
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)'
                };

                let iconComponent = (
                  <span
                    className="rounded-circle border d-inline-flex align-items-center justify-content-center fw-bold small"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: isSelected ? '#f59e0b' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#475569',
                      borderColor: isSelected ? '#d97706' : '#cbd5e1'
                    }}
                  >
                    {option.label}
                  </span>
                );

                if (checkInfo) {
                  const isCorrectOption = checkInfo.correctOptionId === option.id;
                  if (isCorrectOption) {
                    optionStyle = {
                      borderColor: '#10b981',
                      backgroundColor: '#ecfdf5',
                      color: '#065f46'
                    };
                    iconComponent = (
                      <span className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <FiCheck size={18} />
                      </span>
                    );
                  } else if (isSelected && !checkInfo.isCorrect) {
                    optionStyle = {
                      borderColor: '#ef4444',
                      backgroundColor: '#fef2f2',
                      color: '#991b1b'
                    };
                    iconComponent = (
                      <span className="rounded-circle bg-danger text-white d-inline-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <FiX size={18} />
                      </span>
                    );
                  }
                } else if (isSelected) {
                  optionStyle = {
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.08)',
                    color: 'var(--text-primary)'
                  };
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isSubmitted || !!checkInfo}
                    className="p-3 px-4 rounded-3 border text-start d-flex align-items-center gap-3 transition-all"
                    style={{
                      ...optionStyle,
                      cursor: (isSubmitted || !!checkInfo) ? 'default' : 'pointer'
                    }}
                  >
                    {iconComponent}
                    <span className="fs-6 fw-medium flex-grow-1" style={{ lineHeight: 1.5 }}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation / Verification Box */}
            {isCurrentChecked && (
              <div
                className="p-4 rounded-3 border mt-4 animate__animated animate__fadeIn"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: isCurrentChecked.isCorrect ? '#10b981' : '#ef4444'
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  {isCurrentChecked.isCorrect ? (
                    <span className="badge bg-success px-2.5 py-1 text-white fw-bold d-inline-flex align-items-center gap-1">
                      <FiCheckCircle size={14} /> Correct Answer!
                    </span>
                  ) : (
                    <span className="badge bg-danger px-2.5 py-1 text-white fw-bold d-inline-flex align-items-center gap-1">
                      <FiXCircle size={14} /> Incorrect
                    </span>
                  )}
                  <span className="small fw-semibold text-secondary">
                    Correct Option: <strong className="text-dark dark:text-light">Option {isCurrentChecked.correctOptionLabel}</strong>
                  </span>
                </div>
                <div className="small" style={{ color: 'var(--text-secondary)' }}>
                  <BulletPointsRenderer content={isCurrentChecked.explanation} bulletColor="#10b981" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Bar */}
          <div
            className="p-3 px-md-4 border-top d-flex align-items-center justify-content-between gap-3"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
            >
              <FiArrowLeft size={16} />
              <span>Previous</span>
            </button>

            {/* Jump Dots */}
            <div className="d-flex align-items-center gap-2">
              {session.questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAns = selectedAnswers[q.id];
                const res = checkedAnswers[q.id];

                let bgClass = 'btn-outline-secondary bg-white text-secondary';
                if (res) {
                  bgClass = res.isCorrect ? 'btn-success text-white' : 'btn-danger text-white';
                } else if (isAns) {
                  bgClass = 'btn-warning text-dark';
                } else if (isCurrent) {
                  bgClass = 'btn-dark text-white';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`btn btn-sm p-0 rounded-circle border fw-bold ${bgClass}`}
                    style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {currentIndex < session.questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(session.questions.length - 1, prev + 1))}
                className="btn btn-sm btn-warning text-dark rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2 fw-bold shadow-sm"
              >
                <span>Next</span>
                <FiArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={submitting || isSubmitted}
                className="btn btn-sm btn-success text-white rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2 fw-bold shadow-sm"
              >
                <FiCheckCircle size={16} />
                <span>{submitting ? 'Submitting...' : isSubmitted ? 'Submitted' : 'Submit Quiz'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Topic Previous / Next Footer Navigation */}
      <div className="p-4 rounded-4 border shadow-sm mt-4 d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        {prevTopic ? (
          <Link
            to={`/subjects/${subjectSlug}/topics/${prevTopic.slug}/quiz`}
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
          to={`/subjects/${subjectSlug}/topics/${topic.slug}/notes`}
          className="btn btn-primary px-4 py-2 rounded-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
          style={{ backgroundColor: '#0062ff' }}
        >
          <span>Review Topic Notes</span>
          <FiArrowRight size={16} />
        </Link>

        {nextTopic ? (
          <Link
            to={`/subjects/${subjectSlug}/topics/${nextTopic.slug}/quiz`}
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

      {/* Admin Add MCQ Modal */}
      {showAdminModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom px-4 py-3">
                <h5 className="modal-title fw-bold">Add MCQ Question to Bank</h5>
                <button type="button" className="btn-close" onClick={() => setShowAdminModal(false)} />
              </div>
              <form onSubmit={handleAdminSaveQuestion}>
                <div className="modal-body px-4 py-3">
                  <div className="row g-3">
                    <div className="col-12 col-md-8">
                      <label className="form-label small fw-bold">Question Text *</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        required
                        value={newQuestionData.questionText}
                        onChange={(e) => setNewQuestionData({ ...newQuestionData, questionText: e.target.value })}
                        placeholder="e.g. Which component converts Java bytecode into native machine instructions?"
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-bold">Difficulty</label>
                      <select
                        className="form-select rounded-3"
                        value={newQuestionData.difficulty}
                        onChange={(e) => setNewQuestionData({ ...newQuestionData, difficulty: e.target.value })}
                      >
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold">Optional Code Snippet</label>
                      <textarea
                        className="form-control rounded-3 font-monospace small"
                        rows="2"
                        value={newQuestionData.codeSnippet}
                        onChange={(e) => setNewQuestionData({ ...newQuestionData, codeSnippet: e.target.value })}
                        placeholder="class Test { ... }"
                      />
                    </div>

                    {/* 4 Options */}
                    <div className="col-12">
                      <label className="form-label small fw-bold mb-2">Options (Select the correct one) *</label>
                      {newQuestionData.options.map((opt, idx) => (
                        <div key={idx} className="input-group mb-2">
                          <span className="input-group-text bg-light fw-bold">
                            {['A', 'B', 'C', 'D'][idx]}
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder={`Option ${['A', 'B', 'C', 'D'][idx]} text`}
                            value={opt.text}
                            onChange={(e) => {
                              const updated = [...newQuestionData.options];
                              updated[idx].text = e.target.value;
                              setNewQuestionData({ ...newQuestionData, options: updated });
                            }}
                          />
                          <div className="input-group-text bg-white">
                            <input
                              className="form-check-input mt-0 me-1"
                              type="radio"
                              name="correctOptionRadio"
                              checked={opt.isCorrect}
                              onChange={() => {
                                const updated = newQuestionData.options.map((o, i) => ({
                                  ...o,
                                  isCorrect: i === idx
                                }));
                                setNewQuestionData({ ...newQuestionData, options: updated });
                              }}
                            />
                            <span className="small text-secondary">Correct</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold">Explanation (Shown after answering) *</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="3"
                        required
                        value={newQuestionData.explanation}
                        onChange={(e) => setNewQuestionData({ ...newQuestionData, explanation: e.target.value })}
                        placeholder="Detailed reason why the option is correct..."
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top px-4 py-3">
                  <button type="button" className="btn btn-secondary rounded-3" onClick={() => setShowAdminModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={adminSaving} className="btn btn-warning text-dark fw-bold rounded-3 px-4 shadow-sm">
                    {adminSaving ? 'Saving...' : 'Save MCQ to Bank'}
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
