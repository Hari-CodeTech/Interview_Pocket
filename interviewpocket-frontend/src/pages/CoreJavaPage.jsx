import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getModulesBySubjectIdApi,
  getTopicsBySubjectIdApi,
  updateTopicApi,
  updateModuleApi
} from '../services/subjectService';
import api from '../services/api';
import {
  FiArrowLeft,
  FiSearch,
  FiCheckCircle,
  FiCircle,
  FiExternalLink,
  FiLayers,
  FiClock,
  FiFilter,
  FiBookOpen,
  FiAward,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';

export default function CoreJavaPage() {
  const { user, isAdmin } = useAuth();
  const [modules, setModules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem(`interviewpocket_completed_topics_${user?.id || 'guest'}`);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Admin edit modal states
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingModule, setEditingModule] = useState(null);
  const [adminSaving, setAdminSaving] = useState(false);

  // Load modules & topics dynamically from Spring Boot & MySQL
  useEffect(() => {
    let isMounted = true;
    const fetchCoreJavaSyllabus = async () => {
      try {
        setLoading(true);
        // Subject 1 = Core Java
        const [modsData, topicsData] = await Promise.all([
          getModulesBySubjectIdApi(1),
          getTopicsBySubjectIdApi(1)
        ]);

        if (isMounted) {
          setModules(Array.isArray(modsData) ? modsData : []);
          setTopics(Array.isArray(topicsData) ? topicsData : []);

          // Expand the first 3 modules by default
          if (Array.isArray(modsData) && modsData.length > 0) {
            setExpandedModules(new Set(modsData.slice(0, 3).map((m) => m.id)));
          }
        }
      } catch (err) {
        console.error('Failed to load Core Java syllabus:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCoreJavaSyllabus();
    return () => { isMounted = false; };
  }, []);

  // Save topic completion state
  const handleToggleComplete = async (topicId, e) => {
    e.stopPropagation();
    const updated = new Set(completedTopicIds);
    const isNowCompleted = !updated.has(topicId);

    if (isNowCompleted) {
      updated.add(topicId);
    } else {
      updated.delete(topicId);
    }
    setCompletedTopicIds(updated);

    try {
      localStorage.setItem(
        `interviewpocket_completed_topics_${user?.id || 'guest'}`,
        JSON.stringify(Array.from(updated))
      );
      // Persist to backend
      if (user?.id) {
        await api.post('/progress/topic', {
          userId: user.id,
          topicId,
          isCompleted: isNowCompleted
        });
      }
    } catch (err) {
      console.warn('Failed to persist progress:', err.message);
    }
  };

  const toggleModuleExpand = (modId) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(modId)) {
        next.delete(modId);
      } else {
        next.add(modId);
      }
      return next;
    });
  };

  const expandAllModules = () => {
    setExpandedModules(new Set(modules.map((m) => m.id)));
  };

  const collapseAllModules = () => {
    setExpandedModules(new Set());
  };

  // Group topics by module_id
  const moduleTopicsMap = useMemo(() => {
    const map = new Map();
    modules.forEach((m) => map.set(m.id, []));

    topics.forEach((t) => {
      const mId = t.module?.id || t.moduleId || (t.module && typeof t.module === 'object' ? t.module.id : null);
      if (mId && map.has(mId)) {
        map.get(mId).push(t);
      } else {
        // Fallback matching by display order range
        const matchingMod = modules.find((m) => m.id === t.moduleId);
        if (matchingMod && map.has(matchingMod.id)) {
          map.get(matchingMod.id).push(t);
        }
      }
    });

    return map;
  }, [modules, topics]);

  // Filter topics based on search, priority, difficulty
  const filterTopic = (topic) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const matchTitle = topic.title?.toLowerCase().includes(query);
      const matchSummary = topic.summary?.toLowerCase().includes(query);
      if (!matchTitle && !matchSummary) return false;
    }
    if (priorityFilter !== 'ALL' && topic.priority?.toUpperCase() !== priorityFilter.toUpperCase()) {
      return false;
    }
    if (difficultyFilter !== 'ALL' && topic.difficultyLevel?.toUpperCase() !== difficultyFilter.toUpperCase()) {
      return false;
    }
    return true;
  };

  // Overall Statistics
  const totalTopicsCount = topics.length;
  const totalCompletedCount = topics.filter((t) => completedTopicIds.has(t.id)).length;
  const overallPercentage = totalTopicsCount > 0 ? Math.round((totalCompletedCount / totalTopicsCount) * 100) : 0;

  // Handle Admin Save Topic
  const handleSaveTopic = async (e) => {
    e.preventDefault();
    if (!editingTopic) return;
    try {
      setAdminSaving(true);
      const updated = await updateTopicApi(editingTopic.id, editingTopic);
      setTopics((prev) => prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t)));
      setEditingTopic(null);
    } catch (err) {
      alert('Failed to update topic: ' + err.message);
    } finally {
      setAdminSaving(false);
    }
  };

  // Handle Admin Save Module
  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!editingModule) return;
    try {
      setAdminSaving(true);
      const updated = await updateModuleApi(editingModule.id, editingModule);
      setModules((prev) => prev.map((m) => (m.id === updated.id ? { ...m, ...updated } : m)));
      setEditingModule(null);
    } catch (err) {
      alert('Failed to update module: ' + err.message);
    } finally {
      setAdminSaving(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const p = (priority || 'HIGH').toUpperCase();
    if (p === 'VERY HIGH') {
      return <span className="badge rounded-pill bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25" style={{ fontSize: '0.72rem', fontWeight: 600 }}>Very High Priority</span>;
    }
    if (p === 'HIGH') {
      return <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25" style={{ fontSize: '0.72rem', fontWeight: 600 }}>High Priority</span>;
    }
    return <span className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25" style={{ fontSize: '0.72rem', fontWeight: 600 }}>Medium Priority</span>;
  };

  const getDifficultyBadge = (difficulty) => {
    const d = (difficulty || 'BEGINNER').toUpperCase();
    if (d === 'BEGINNER') {
      return <span className="badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-25" style={{ fontSize: '0.7rem' }}>Beginner</span>;
    }
    if (d === 'INTERMEDIATE') {
      return <span className="badge rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25" style={{ fontSize: '0.7rem' }}>Intermediate</span>;
    }
    return <span className="badge rounded-pill bg-purple bg-opacity-10 text-purple border border-purple border-opacity-25" style={{ fontSize: '0.7rem' }}>Advanced</span>;
  };

  return (
    <div className="container-fluid py-4 py-lg-5 px-3 px-md-4" style={{ maxWidth: '1280px' }}>
      {/* Top Header Breadcrumb */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <Link
          to="/dashboard"
          className="btn btn-sm btn-outline-secondary rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 text-decoration-none fw-medium"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <FiArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        {/* Global Progress Pill */}
        <div className="d-flex align-items-center gap-3">
          <div className="small text-secondary">
            Overall Syllabus Progress: <strong>{totalCompletedCount}</strong> of <strong>{totalTopicsCount}</strong> Topics ({overallPercentage}%)
          </div>
          <div className="progress" style={{ width: '130px', height: '8px', backgroundColor: 'var(--border-color)' }}>
            <div
              className="progress-bar rounded-pill"
              role="progressbar"
              style={{ width: `${overallPercentage}%`, backgroundColor: '#0062ff' }}
              aria-valuenow={overallPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div
        className="p-4 p-md-5 rounded-4 border shadow-sm mb-4 position-relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          background: 'linear-gradient(135deg, rgba(248, 152, 32, 0.08) 0%, rgba(0, 98, 255, 0.03) 100%)'
        }}
      >
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="rounded-4 d-flex align-items-center justify-content-center text-white shadow-sm"
            style={{ width: '56px', height: '56px', backgroundColor: '#f89820' }}
          >
            <FaJava size={32} />
          </div>
          <div>
            <div className="badge rounded-pill bg-warning bg-opacity-20 text-warning-emphasis mb-1" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em' }}>
              COMPLETE 18-MODULE INTERVIEW SYLLABUS
            </div>
            <h1 className="fw-extrabold mb-0" style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)' }}>
              Core Java Curriculum
            </h1>
          </div>
        </div>

        <p className="text-secondary lead fs-6 mb-4" style={{ maxWidth: '820px' }}>
          Master the complete Core Java curriculum organized into 18 modules and 130 structured topics. Every topic is equipped with three dedicated sections: <strong>Notes</strong>, <strong>Interview Questions</strong>, and <strong>Randomized Quizzes</strong>.
        </p>

        {/* Quick Syllabus Stats */}
        <div className="row g-3" style={{ maxWidth: '720px' }}>
          <div className="col-4 col-sm-3">
            <div className="p-3 rounded-3 border bg-white bg-opacity-75 shadow-sm text-center">
              <div className="fs-4 fw-bold text-dark">{modules.length}</div>
              <div className="text-muted small" style={{ fontSize: '0.72rem' }}>Modules</div>
            </div>
          </div>
          <div className="col-4 col-sm-3">
            <div className="p-3 rounded-3 border bg-white bg-opacity-75 shadow-sm text-center">
              <div className="fs-4 fw-bold text-dark">{totalTopicsCount}</div>
              <div className="text-muted small" style={{ fontSize: '0.72rem' }}>Topics</div>
            </div>
          </div>
          <div className="col-4 col-sm-3">
            <div className="p-3 rounded-3 border bg-white bg-opacity-75 shadow-sm text-center">
              <div className="fs-4 fw-bold" style={{ color: '#0062ff' }}>3</div>
              <div className="text-muted small" style={{ fontSize: '0.72rem' }}>Cards / Topic</div>
            </div>
          </div>
          <div className="col-4 col-sm-3">
            <div className="p-3 rounded-3 border bg-white bg-opacity-75 shadow-sm text-center">
              <div className="fs-4 fw-bold text-success">{totalCompletedCount}</div>
              <div className="text-muted small" style={{ fontSize: '0.72rem' }}>Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & Controls Toolbar */}
      <div
        className="p-3 rounded-4 border shadow-sm mb-4"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="row g-3 align-items-center">
          {/* Search Bar */}
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'var(--border-color)' }}>
                <FiSearch size={16} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem'
                }}
                placeholder="Search across all 18 modules and 130 topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn border-start-0 text-muted"
                  style={{ borderColor: 'var(--border-color)' }}
                  onClick={() => setSearchQuery('')}
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="col-6 col-md-2">
            <select
              className="form-select small"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.86rem'
              }}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="ALL">All Priorities</option>
              <option value="VERY HIGH">Very High</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="col-6 col-md-2">
            <select
              className="form-select small"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.86rem'
              }}
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="ALL">All Levels</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>

          {/* Expand / Collapse Controls */}
          <div className="col-12 col-md-3 text-md-end">
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ borderColor: 'var(--border-color)', fontSize: '0.8rem' }}
                onClick={expandAllModules}
              >
                Expand All
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ borderColor: 'var(--border-color)', fontSize: '0.8rem' }}
                onClick={collapseAllModules}
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading Core Java syllabus...</span>
          </div>
          <p className="text-secondary small mt-3">Fetching modules and topics from MySQL database...</p>
        </div>
      ) : (
        /* 18 Modules Accordion & Topic Listings */
        <div className="d-flex flex-column gap-4">
          {modules.map((mod) => {
            const rawTopics = moduleTopicsMap.get(mod.id) || [];
            const filteredTopics = rawTopics.filter(filterTopic);
            const isExpanded = expandedModules.has(mod.id) || searchQuery.trim().length > 0;
            const completedCount = rawTopics.filter((t) => completedTopicIds.has(t.id)).length;
            const modPercentage = rawTopics.length > 0 ? Math.round((completedCount / rawTopics.length) * 100) : 0;

            // Hide module if searching and no matching topics
            if (searchQuery.trim() && filteredTopics.length === 0) {
              return null;
            }

            return (
              <div
                key={mod.id}
                id={`module-${mod.id}`}
                className="rounded-4 border shadow-sm overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                {/* Module Header Bar */}
                <div
                  className="p-3 p-md-4 d-flex align-items-center justify-content-between cursor-pointer border-bottom"
                  style={{
                    backgroundColor: isExpanded ? 'rgba(0, 98, 255, 0.02)' : 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleModuleExpand(mod.id)}
                >
                  <div className="d-flex align-items-start gap-3 flex-grow-1">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0 mt-1"
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#0062ff',
                        fontSize: '0.9rem'
                      }}
                    >
                      {mod.displayOrder || mod.id}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                        <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '1.18rem', letterSpacing: '-0.01em' }}>
                          {mod.title}
                        </h4>
                        {getPriorityBadge(mod.priority)}
                        <span className="badge rounded-pill bg-light text-secondary border" style={{ fontSize: '0.72rem' }}>
                          {rawTopics.length} Topics
                        </span>
                        {isAdmin && (
                          <button
                            type="button"
                            className="btn btn-sm btn-link p-0 text-decoration-none text-muted ms-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingModule(mod);
                            }}
                            title="Edit Module Details (Admin)"
                          >
                            <FiEdit2 size={13} />
                          </button>
                        )}
                      </div>
                      <p className="text-secondary small mb-0" style={{ fontSize: '0.85rem', lineHeight: 1.45, maxWidth: '850px' }}>
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Progress & Expand Arrow */}
                  <div className="d-flex align-items-center gap-3 ms-2">
                    <div className="d-none d-sm-block text-end">
                      <span className="small text-secondary fw-semibold" style={{ fontSize: '0.8rem' }}>
                        {completedCount} / {rawTopics.length} Done
                      </span>
                      <div className="progress mt-1" style={{ width: '90px', height: '6px', backgroundColor: 'var(--border-color)' }}>
                        <div
                          className="progress-bar rounded-pill"
                          style={{ width: `${modPercentage}%`, backgroundColor: '#0062ff' }}
                        ></div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center"
                      style={{ width: '32px', height: '32px', borderColor: 'var(--border-color)' }}
                      aria-label={isExpanded ? 'Collapse module' : 'Expand module'}
                    >
                      {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Module Topics Grid */}
                {isExpanded && (
                  <div className="p-3 p-md-4" style={{ backgroundColor: '#F8FAFC' }}>
                    {filteredTopics.length === 0 ? (
                      <div className="text-center py-4 text-muted small">
                        No topics match the selected filters in this module.
                      </div>
                    ) : (
                      <div className="row g-3">
                        {filteredTopics.map((topic, idx) => {
                          const isCompleted = completedTopicIds.has(topic.id);
                          return (
                            <div key={topic.id} className="col-12 col-md-6 col-xl-4">
                              <div
                                className="h-100 p-3 rounded-4 border shadow-sm d-flex flex-column justify-content-between transition-all"
                                style={{
                                  backgroundColor: '#ffffff',
                                  borderColor: isCompleted ? '#10b981' : '#e2e8f0',
                                  borderLeft: isCompleted ? '4px solid #10b981' : '1px solid #e2e8f0'
                                }}
                              >
                                <div>
                                  {/* Topic Top Row: Number, Priority, Difficulty, Admin Edit */}
                                  <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="d-flex align-items-center gap-1">
                                      <span className="badge rounded-pill bg-light text-muted border" style={{ fontSize: '0.68rem' }}>
                                        #{topic.displayOrder || idx + 1}
                                      </span>
                                      {getPriorityBadge(topic.priority)}
                                      {getDifficultyBadge(topic.difficultyLevel)}
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                      {isAdmin && (
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-link p-0 text-decoration-none text-muted me-1"
                                          onClick={() => setEditingTopic(topic)}
                                          title="Edit Topic (Admin)"
                                        >
                                          <FiEdit2 size={13} />
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={(e) => handleToggleComplete(topic.id, e)}
                                        className="btn btn-sm btn-link p-0 text-decoration-none"
                                        title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                                        style={{ color: isCompleted ? '#10b981' : '#cbd5e1' }}
                                      >
                                        {isCompleted ? <FiCheckCircle size={18} /> : <FiCircle size={18} />}
                                      </button>
                                    </div>
                                  </div>

                                  {/* Topic Title */}
                                  <h5
                                    className="fw-bold mb-2 text-dark"
                                    style={{ fontSize: '1.02rem', lineHeight: 1.35 }}
                                  >
                                    {topic.title}
                                  </h5>

                                  {/* Topic Summary */}
                                  <p
                                    className="text-secondary small mb-3"
                                    style={{
                                      fontSize: '0.8rem',
                                      lineHeight: 1.45,
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    {topic.summary || 'Master fundamental definitions, practical code examples, internal workings, and interview answers.'}
                                  </p>
                                </div>

                                {/* Three Cards Teaser & Open Topic Button */}
                                <div className="pt-2 border-top d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center gap-2 small text-muted" style={{ fontSize: '0.72rem' }}>
                                    <span title="Notes Card Available">📘 Notes</span>
                                    <span>•</span>
                                    <span title="Interview Questions Available">❓ Questions</span>
                                    <span>•</span>
                                    <span title="Quiz Card Available">🎯 Quiz</span>
                                  </div>

                                  <Link
                                    to={`/subjects/core-java/topics/${topic.slug}`}
                                    className="btn btn-sm text-white px-3 py-1 rounded-3 fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
                                    style={{
                                      backgroundColor: '#0062ff',
                                      fontSize: '0.8rem',
                                      height: '32px'
                                    }}
                                  >
                                    <span>Open Topic</span>
                                    <FiExternalLink size={13} />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Admin Topic Edit Modal */}
      {editingTopic && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark">Edit Topic: {editingTopic.title}</h5>
                <button type="button" className="btn-close" onClick={() => setEditingTopic(null)}></button>
              </div>
              <form onSubmit={handleSaveTopic}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Topic Title</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editingTopic.title || ''}
                      onChange={(e) => setEditingTopic({ ...editingTopic, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Slug</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editingTopic.slug || ''}
                      onChange={(e) => setEditingTopic({ ...editingTopic, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-dark">Priority</label>
                      <select
                        className="form-select form-select-sm"
                        value={editingTopic.priority || 'High'}
                        onChange={(e) => setEditingTopic({ ...editingTopic, priority: e.target.value })}
                      >
                        <option value="Very High">Very High</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-dark">Difficulty Level</label>
                      <select
                        className="form-select form-select-sm"
                        value={editingTopic.difficultyLevel || 'Beginner'}
                        onChange={(e) => setEditingTopic({ ...editingTopic, difficultyLevel: e.target.value })}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Summary / Description</label>
                    <textarea
                      rows={3}
                      className="form-control form-control-sm"
                      value={editingTopic.summary || ''}
                      onChange={(e) => setEditingTopic({ ...editingTopic, summary: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setEditingTopic(null)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={adminSaving} className="btn btn-sm btn-primary px-3" style={{ backgroundColor: '#0062ff' }}>
                    {adminSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Admin Module Edit Modal */}
      {editingModule && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark">Edit Module: {editingModule.title}</h5>
                <button type="button" className="btn-close" onClick={() => setEditingModule(null)}></button>
              </div>
              <form onSubmit={handleSaveModule}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Module Title</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editingModule.title || ''}
                      onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-8">
                      <label className="form-label small fw-semibold text-dark">Slug</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editingModule.slug || ''}
                        onChange={(e) => setEditingModule({ ...editingModule, slug: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label small fw-semibold text-dark">Priority</label>
                      <select
                        className="form-select form-select-sm"
                        value={editingModule.priority || 'High'}
                        onChange={(e) => setEditingModule({ ...editingModule, priority: e.target.value })}
                      >
                        <option value="Very High">Very High</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Description</label>
                    <textarea
                      rows={3}
                      className="form-control form-control-sm"
                      value={editingModule.description || ''}
                      onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setEditingModule(null)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={adminSaving} className="btn btn-sm btn-primary px-3" style={{ backgroundColor: '#0062ff' }}>
                    {adminSaving ? 'Saving...' : 'Save Changes'}
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
