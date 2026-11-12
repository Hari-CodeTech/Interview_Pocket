import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getNoteByTopicSlugApi, updateCardProgressApi } from '../../services/subjectService';
import BulletPointsRenderer from '../common/BulletPointsRenderer';
import api from '../../services/api';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiCircle,
  FiBookmark,
  FiList,
  FiCode,
  FiAward,
  FiEdit3,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiLayers,
  FiHelpCircle
} from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';

export default function TopicNotesReader({ topic, subject, allTopics = [], onToggleComplete, isCompletedInitially }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN' || user?.email === 'admin@interviewpocket.com';
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(isCompletedInitially || false);
  const [readingProgress, setReadingProgress] = useState(15);

  // Admin edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [adminSaving, setAdminSaving] = useState(false);

  const subjectSlug = subject?.slug || 'core-java';

  // Topic navigation
  const currentIndex = allTopics.findIndex((t) => t.id === topic.id || t.slug === topic.slug);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex >= 0 && currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  // Fetch note dynamically from backend
  useEffect(() => {
    let isMounted = true;
    const fetchNote = async () => {
      try {
        setLoading(true);
        const data = await getNoteByTopicSlugApi(topic.slug);
        if (isMounted) {
          if (data && data.id) {
            setNote(data);
            setEditFormData(data);
          } else {
            // Fallback: try fetching by topic id
            const res = await api.get(`/notes/topic/${topic.id}`);
            if (isMounted && res.data) {
              setNote(res.data);
              setEditFormData(res.data);
            }
          }
        }
      } catch (err) {
        console.warn('Note fetch error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNote();
    return () => { isMounted = false; };
  }, [topic]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(10, Math.round((window.scrollY / totalHeight) * 100)));
        setReadingProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleComplete = async () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    if (onToggleComplete) onToggleComplete(nextState);

    try {
      if (user?.id) {
        await updateCardProgressApi(user.id, topic.id, 'NOTES', nextState);
      }
    } catch (err) {
      console.warn('Progress update failed:', err.message);
    }
  };

  const handleAdminSave = async (e) => {
    e.preventDefault();
    try {
      setAdminSaving(true);
      const res = await api.put(`/notes/${note?.id || topic.id}`, editFormData);
      setNote(res.data);
      setShowEditModal(false);
      alert('Notes updated successfully!');
    } catch (err) {
      alert('Failed to save notes: ' + err.message);
    } finally {
      setAdminSaving(false);
    }
  };

  const sections = [
    { key: 'definition', title: '1. Definition & Core Meaning', content: note?.definition || note?.whatIsIt, icon: <FiBookmark /> },
    { key: 'simple_explanation', title: '2. Simple Explanation (Real-world Analogy)', content: note?.simpleExplanation || note?.simpleMeaning },
    { key: 'why_needed', title: '3. Why is it Needed?', content: note?.whyNeeded || note?.whyUseIt },
    { key: 'how_it_works', title: '4. How Does it Work? (Execution Pipeline)', content: note?.howItWorks },
    { key: 'important_concepts', title: '5. Key Concepts & Architecture', content: note?.importantConcepts || note?.importantPoints },
    { key: 'real_world_examples', title: '6. Real-World Applications', content: note?.realWorldExamples || note?.realWorldExample },
    { key: 'java_code_examples', title: '7. Java Code Examples', content: note?.javaCodeExamples || note?.practicalCode, icon: <FiCode /> },
    { key: 'internal_working', title: '8. Internal Working & JVM Mechanics', content: note?.internalWorking },
    { key: 'advantages_disadvantages', title: '9. Advantages & Trade-offs', content: note?.advantagesDisadvantages },
    { key: 'important_differences', title: '10. Important Differences & Comparison', content: note?.importantDifferences || note?.comparisonTable },
    { key: 'common_tricky_questions', title: '11. Common Interview Tricky Questions', content: note?.commonTrickyQuestions },
    { key: 'interview_ready_answer', title: '12. Interview-Ready Answer (60-sec Summary)', content: note?.interviewReadyAnswer || note?.interviewAnswer, icon: <FiAward /> },
    { key: 'quick_revision_points', title: '13. Quick Revision Points', content: note?.quickRevisionPoints }
  ];

  const visibleSections = sections.filter((s) => Boolean(s.content));

  return (
    <div className="container py-4 py-lg-5" style={{ maxWidth: '1040px' }}>
      {/* Sticky Reading Progress Bar */}
      <div
        className="fixed-top"
        style={{
          top: '64px',
          height: '4px',
          backgroundColor: 'transparent',
          zIndex: 1020
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${readingProgress}%`,
            backgroundColor: '#0062ff',
            transition: 'width 0.15s ease'
          }}
        ></div>
      </div>

      {/* Top Header & Navigation */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <Link
          to={`/subjects/${subjectSlug}/topics/${topic.slug}`}
          className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 text-decoration-none fw-medium"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <FiArrowLeft size={16} />
          <span>Back to {topic.title} Overview</span>
        </Link>

        {/* Action Buttons: Mark Complete & Admin Edit */}
        <div className="d-flex align-items-center gap-2">
          {allTopics.length > 0 && (
            <select
              className="form-select form-select-sm rounded-3 text-secondary"
              style={{ maxWidth: '240px', fontSize: '0.85rem' }}
              value={topic.slug}
              onChange={(e) => navigate(`/subjects/${subjectSlug}/topics/${e.target.value}/notes`)}
            >
              {allTopics.map((t, idx) => (
                <option key={t.id || idx} value={t.slug}>
                  {idx + 1}. {t.title}
                </option>
              ))}
            </select>
          )}

          {isAdmin && (
            <button
              type="button"
              className="btn btn-sm btn-outline-primary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              onClick={() => setShowEditModal(true)}
            >
              <FiEdit3 size={15} />
              <span>Edit Notes</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleComplete}
            className={`btn btn-sm rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 fw-semibold shadow-sm ${
              isCompleted ? 'btn-success text-white' : 'btn-outline-success'
            }`}
          >
            {isCompleted ? <FiCheckCircle size={16} /> : <FiCircle size={16} />}
            <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
          </button>
        </div>
      </div>

      {/* Topic Title Banner */}
      <div
        className="p-4 p-md-5 rounded-4 border shadow-sm mb-4 position-relative"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          background: 'linear-gradient(135deg, rgba(0, 98, 255, 0.05) 0%, rgba(56, 189, 248, 0.02) 100%)'
        }}
      >
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary small fw-semibold">
            CORE JAVA • COMPLETE NOTES
          </span>
          <span className="badge rounded-pill bg-light text-secondary border">
            {readingProgress}% Read
          </span>
        </div>

        <h1 className="fw-extrabold mb-2" style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}>
          {topic.title}
        </h1>
        <p className="text-secondary lead fs-6 mb-0" style={{ maxWidth: '800px' }}>
          {topic.summary || 'In-depth concepts, real-world examples, JVM internal mechanics, and interview-ready answers.'}
        </p>
      </div>

      {/* Table of Contents / Jump Navigation Pills */}
      {visibleSections.length > 0 && (
        <div className="p-3 rounded-4 border shadow-sm mb-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small fw-bold text-uppercase d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
              <FiList size={14} className="text-primary" /> Table of Contents
            </span>
            <span className="badge rounded-pill bg-light text-muted small">{visibleSections.length} Sections</span>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {visibleSections.map((sec, idx) => (
              <a
                key={idx}
                href={`#section-${sec.key}`}
                className="badge text-decoration-none py-2 px-3 rounded-pill transition"
                style={{
                  backgroundColor: 'rgba(0, 98, 255, 0.08)',
                  color: '#0062ff',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}
              >
                {sec.title.split('(')[0]}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Structured Sections Reader */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading notes...</span>
          </div>
          <p className="text-secondary small mt-3">Fetching notes from MySQL database...</p>
        </div>
      ) : visibleSections.length === 0 ? (
        <div className="p-5 rounded-4 border shadow-sm text-center my-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <FiAlertCircle size={36} className="text-warning mb-2" />
          <h5 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Notes Being Prepared</h5>
          <p className="text-secondary small mb-3">Structured notes for this topic are currently being populated.</p>
          <Link to={`/subjects/${subjectSlug}/topics/${topic.slug}/questions`} className="btn btn-outline-primary rounded-3 btn-sm px-4">
            Practice Interview Questions Instead
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {visibleSections.map((sec) => (
            <div
              key={sec.key}
              id={`section-${sec.key}`}
              className="p-4 p-md-5 rounded-4 border shadow-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                scrollMarginTop: '90px'
              }}
            >
              {/* Section Header */}
              <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)', fontSize: '1.28rem', letterSpacing: '-0.01em' }}>
                  {sec.icon && <span className="text-primary">{sec.icon}</span>}
                  <span>{sec.title}</span>
                </h3>
                <span className="badge rounded-pill bg-light text-muted small px-2.5 py-1">
                  Section {sec.key.replace('_', ' ')}
                </span>
              </div>

              {/* Section Content with Bullet Formatting */}
              <BulletPointsRenderer content={sec.content} bulletColor="#0062ff" />
            </div>
          ))}
        </div>
      )}

      {/* Completion & Next / Previous Navigation Footer */}
      <div
        className="p-4 p-md-5 rounded-4 border shadow-sm mt-5"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(0, 98, 255, 0.03) 100%)'
        }}
      >
        <div className="text-center mb-4">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3 text-white shadow-sm"
            style={{ backgroundColor: '#10b981', width: '56px', height: '56px' }}
          >
            <FiCheckCircle size={28} />
          </div>
          <h4 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Topic Learning Progress</h4>
          <p className="text-secondary small mx-auto mb-3" style={{ maxWidth: '480px' }}>
            {isCompleted
              ? 'Great job! You have completed these notes. Proceed to practice Interview Questions or test your knowledge in the Quiz.'
              : 'Mark these notes as completed to update your curriculum progress and unlock question practice.'}
          </p>

          <button
            type="button"
            onClick={handleToggleComplete}
            className={`btn px-4 py-2 rounded-3 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm ${
              isCompleted ? 'btn-outline-success' : 'btn-success text-white'
            }`}
          >
            <FiCheckCircle />
            <span>{isCompleted ? 'Mark as Incomplete' : 'Mark Notes as Completed'}</span>
          </button>
        </div>

        {/* Previous / Next Topic Links */}
        <div className="border-top pt-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          {prevTopic ? (
            <Link
              to={`/subjects/${subjectSlug}/topics/${prevTopic.slug}/notes`}
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
            to={`/subjects/${subjectSlug}/topics/${topic.slug}/questions`}
            className="btn btn-primary px-4 py-2 rounded-3 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
            style={{ backgroundColor: '#0062ff' }}
          >
            <span>Practice Interview Questions</span>
            <FiArrowRight size={16} />
          </Link>

          {nextTopic ? (
            <Link
              to={`/subjects/${subjectSlug}/topics/${nextTopic.slug}/notes`}
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
      </div>

      {/* Admin Notes Editor Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-bottom px-4 py-3">
                <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                  <FiEdit3 className="text-primary" /> Admin Notes Editor: {topic.title}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <form onSubmit={handleAdminSave}>
                <div className="modal-body px-4 py-3">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small fw-semibold">1. Definition (Use bullet points: - Point)</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.definition || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, definition: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">2. Simple Explanation (Real-world Analogy)</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.simpleExplanation || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, simpleExplanation: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">3. Why is it Needed?</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.whyNeeded || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, whyNeeded: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">4. How Does it Work?</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.howItWorks || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, howItWorks: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">5. Key Concepts & Rules</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.importantConcepts || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, importantConcepts: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">6. Real-World Applications</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.realWorldExamples || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, realWorldExamples: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">7. Java Code Examples</label>
                      <textarea
                        rows={4}
                        className="form-control font-monospace small"
                        value={editFormData.javaCodeExamples || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, javaCodeExamples: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">8. Internal Working & JVM Mechanics</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.internalWorking || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, internalWorking: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">9. Advantages & Trade-offs</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.advantagesDisadvantages || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, advantagesDisadvantages: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">10. Important Differences (Comparison Table)</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.importantDifferences || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, importantDifferences: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">11. Tricky Questions</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.commonTrickyQuestions || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, commonTrickyQuestions: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">12. Interview-Ready Answer (Recruiter Response)</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.interviewReadyAnswer || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, interviewReadyAnswer: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">13. Quick Revision Points</label>
                      <textarea
                        rows={3}
                        className="form-control font-monospace small"
                        value={editFormData.quickRevisionPoints || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, quickRevisionPoints: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top px-4 py-3">
                  <button type="button" className="btn btn-secondary rounded-3" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={adminSaving} className="btn btn-primary rounded-3 px-4 shadow-sm">
                    {adminSaving ? 'Saving...' : 'Update Notes in Database'}
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
