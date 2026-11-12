import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSubjectsApi } from '../services/subjectService';
import {
  FiBookOpen,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiZap,
  FiArrowRight,
  FiSearch,
  FiCode,
  FiRotateCcw,
  FiLayers,
  FiCompass
} from 'react-icons/fi';
import { FaJava, FaHtml5, FaReact, FaDatabase, FaBrain } from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';

export default function DashboardPage() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [memoryTrickIdx, setMemoryTrickIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Compute actual completed topics from localStorage
  const completedCount = (() => {
    try {
      const saved = localStorage.getItem(`interviewpocket_completed_topics_${user?.id || 'guest'}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.length : 0;
      }
      return 0;
    } catch {
      return 0;
    }
  })();

  const TOTAL_CORE_JAVA_TOPICS = 130;
  const overallMasteryPct = Math.min(100, Math.round((completedCount / TOTAL_CORE_JAVA_TOPICS) * 100));

  const memoryTricks = [
    {
      topic: 'Core Java - OOP',
      title: 'Four Pillars of OOP: E-I-P-A',
      content: 'E - Encapsulation (Protect data with private fields & public accessors)\nI - Inheritance (Code reuse & hierarchical relationships)\nP - Polymorphism (Adaptability: Overloading & Overriding)\nA - Abstraction (Simplify complexity via Abstract Classes & Interfaces)'
    },
    {
      topic: 'JVM Architecture',
      title: 'JVM Execution Flow',
      content: 'Class Loader -> Bytecode Verifier -> JIT Compiler / Interpreter -> Garbage Collector.\nWrite Once, Run Anywhere (WORA) via universal .class bytecode.'
    },
    {
      topic: 'SQL Mastery',
      title: 'WHERE vs HAVING in SQL',
      content: 'WHERE filters individual ROWS before grouping.\nHAVING filters aggregated GROUPS after GROUP BY.'
    },
    {
      topic: 'Polymorphism',
      title: 'Method Overloading vs Overriding',
      content: 'Overloading: Same name, different parameters in SAME class (Compile-time).\nOverriding: Same name, identical signature in SUBCLASS (Runtime dynamic dispatch).'
    }
  ];

  // Map icon and color to subjects with authentic metadata
  const getSubjectMeta = (slug) => {
    switch (slug) {
      case 'core-java':
        return {
          icon: <FaJava size={28} />,
          color: '#f89820',
          bg: 'rgba(248, 152, 32, 0.1)',
          topicsText: '130 Topics (18 Modules)',
          progress: overallMasteryPct,
          isReady: true,
          badge: 'Complete Curriculum'
        };
      case 'frontend':
        return {
          icon: <FaHtml5 size={28} />,
          color: '#e34f26',
          bg: 'rgba(227, 79, 38, 0.1)',
          topicsText: '22 Topics • 4 Modules',
          progress: 5,
          isReady: true,
          badge: 'Active Curriculum'
        };
      case 'react':
        return {
          icon: <FaReact size={28} />,
          color: '#61dafb',
          bg: 'rgba(97, 218, 251, 0.1)',
          topicsText: 'Curriculum in Prep',
          progress: 0,
          isReady: false,
          badge: 'Coming Soon'
        };
      case 'advanced-java':
        return {
          icon: <SiSpringboot size={28} />,
          color: '#6db33f',
          bg: 'rgba(109, 179, 63, 0.1)',
          topicsText: 'Curriculum in Prep',
          progress: 0,
          isReady: false,
          badge: 'Coming Soon'
        };
      case 'mysql':
        return {
          icon: <FaDatabase size={28} />,
          color: '#00758f',
          bg: 'rgba(0, 117, 143, 0.1)',
          topicsText: 'Curriculum in Prep',
          progress: 0,
          isReady: false,
          badge: 'Coming Soon'
        };
      case 'problem-solving':
        return {
          icon: <FaBrain size={28} />,
          color: '#8b5cf6',
          bg: 'rgba(139, 92, 246, 0.1)',
          topicsText: 'Curriculum in Prep',
          progress: 0,
          isReady: false,
          badge: 'Coming Soon'
        };
      default:
        return {
          icon: <FiLayers size={28} />,
          color: '#0062ff',
          bg: 'rgba(0, 98, 255, 0.1)',
          topicsText: 'In Development',
          progress: 0,
          isReady: false,
          badge: 'Coming Soon'
        };
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchSubjects = async () => {
      try {
        const data = await getSubjectsApi();
        if (isMounted) {
          setSubjects(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load subjects:', err);
        if (isMounted) setLoading(false);
      }
    };
    fetchSubjects();
    return () => { isMounted = false; };
  }, []);

  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4 py-lg-5">
      {/* 1. Welcome Message & Quick Overview */}
      <div
        className="p-4 p-md-5 rounded-4 border shadow-sm mb-4 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 98, 255, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%)',
          borderColor: 'rgba(0, 98, 255, 0.2)'
        }}
      >
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 bg-primary bg-opacity-10 text-primary small fw-semibold">
              <FiZap size={14} /> Ready for Technical Interviews
            </div>
            <h1 className="fw-bold mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Welcome back, {user?.fullName || 'Developer'}!
            </h1>
            <p className="text-secondary mb-3 lead fs-6" style={{ maxWidth: '600px' }}>
              Your technical knowledge, clean notebook explanations, visual concepts, and interview practice questions are primed and ready for revision.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Link
                to="/subjects/core-java"
                className="btn btn-sm text-white px-3 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2 fw-semibold"
                style={{ backgroundColor: '#0062ff' }}
              >
                <span>Continue: Core Java (18 Modules)</span>
                <FiArrowRight size={14} />
              </Link>
              <Link
                to="/subjects"
                className="btn btn-sm btn-outline-secondary px-3 py-2 rounded-3 fw-medium border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                Browse All Subjects
              </Link>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0 text-lg-end">
            <div className="p-3 rounded-3 border d-inline-block text-start w-100" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', maxWidth: '320px' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small text-secondary fw-semibold">Core Java Mastery</span>
                <span className="badge bg-primary bg-opacity-10 text-primary fw-bold">{overallMasteryPct}%</span>
              </div>
              <div className="progress mb-2" style={{ height: '8px' }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${overallMasteryPct}%` }} aria-valuenow={overallMasteryPct} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
                <span>{completedCount} of 130 Topics Completed</span>
                <span>18 Modules</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row (Dynamic, Authentic Counts) */}
      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3">
          <div className="p-3 rounded-4 border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="fs-3 fw-bold text-primary mb-1">18</div>
            <div className="small text-secondary fw-medium">Core Java Modules</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="p-3 rounded-4 border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="fs-3 fw-bold text-success mb-1">130</div>
            <div className="small text-secondary fw-medium">In-Depth Topics</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="p-3 rounded-4 border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="fs-3 fw-bold text-warning mb-1">390</div>
            <div className="small text-secondary fw-medium">Curated Interview Q&As</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="p-3 rounded-4 border shadow-sm text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="fs-3 fw-bold text-info mb-1">260</div>
            <div className="small text-secondary fw-medium">Practice MCQs</div>
          </div>
        </div>
      </div>

      {/* 3. Quick Revision Flashcards & Daily Challenge */}
      <div className="row g-4 mb-5">
        {/* Flashcard / Memory Trick */}
        <div className="col-lg-7">
          <div className="p-4 rounded-4 border shadow-sm h-100" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-2 p-1 bg-warning bg-opacity-10 text-warning">
                  <FiRotateCcw size={18} />
                </div>
                <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Quick Revision Flashcard</h5>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary py-1 px-2 rounded-2"
                style={{ fontSize: '0.8rem' }}
                onClick={() => setMemoryTrickIdx((prev) => (prev + 1) % memoryTricks.length)}
              >
                Next Trick ({memoryTrickIdx + 1}/{memoryTricks.length})
              </button>
            </div>

            <div className="p-3 rounded-3 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="badge bg-primary bg-opacity-10 text-primary mb-2" style={{ fontSize: '0.72rem' }}>
                {memoryTricks[memoryTrickIdx].topic}
              </div>
              <h6 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {memoryTricks[memoryTrickIdx].title}
              </h6>
              <p className="small text-secondary mb-0" style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {memoryTricks[memoryTrickIdx].content}
              </p>
            </div>
          </div>
        </div>

        {/* Daily Coding Challenge Card */}
        <div className="col-lg-5">
          <div className="p-4 rounded-4 border shadow-sm h-100" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="rounded-2 p-1 bg-primary bg-opacity-10 text-primary">
                <FiCode size={18} />
              </div>
              <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Featured Interview Problem</h5>
            </div>

            <div className="p-3 rounded-3 border mb-3" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="badge bg-warning bg-opacity-10 text-warning" style={{ fontSize: '0.72rem' }}>Classic Interview</span>
                <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Core Java / Collections</span>
              </div>
              <div className="fw-bold small mb-1" style={{ color: 'var(--text-primary)' }}>
                Internal Working of HashMap: Buckets & Treeification
              </div>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.8rem' }}>
                How HashMap achieves O(1) average lookup and switches to Red-Black Trees when collisions exceed 8.
              </p>
            </div>

            <Link
              to="/subjects/core-java/topics/hashmap-internal-working-deepdive"
              className="btn btn-sm btn-outline-primary w-100 py-2 rounded-3 fw-semibold"
            >
              Explore HashMap Deep Dive
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Subject Categories Header & Search */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Subject Modules</h3>
          <p className="text-secondary small mb-0">Select any module to explore structured notes and interview questions</p>
        </div>

        <div className="input-group" style={{ maxWidth: '300px' }}>
          <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ borderColor: 'var(--border-color)' }}>
            <FiSearch size={15} />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem'
            }}
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 5. Subject Cards Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading subjects...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredSubjects.map((sub) => {
            const meta = getSubjectMeta(sub.slug);
            return (
              <div key={sub.id} className="col-md-6 col-lg-4">
                <div
                  className="p-4 rounded-4 border shadow-sm h-100 d-flex flex-column justify-content-between transition-all"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div
                        className="rounded-3 p-3 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        {meta.icon}
                      </div>
                      <span className={`badge rounded-pill small ${meta.isReady ? 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25' : 'bg-secondary bg-opacity-10 text-secondary border'}`}>
                        {meta.badge}
                      </span>
                    </div>

                    <h4 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {sub.name}
                    </h4>
                    <p className="text-secondary small mb-3" style={{ lineHeight: 1.6, minHeight: '48px' }}>
                      {sub.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between text-muted mb-1" style={{ fontSize: '0.75rem' }}>
                        <span>{meta.topicsText}</span>
                        {meta.isReady && <span>{meta.progress}%</span>}
                      </div>
                      {meta.isReady ? (
                        <div className="progress" style={{ height: '6px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${meta.progress}%`, backgroundColor: meta.color }}
                            aria-valuenow={meta.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      ) : (
                        <div className="text-muted small" style={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
                          Authoring in progress
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {meta.isReady ? (
                    <Link
                      to={`/subjects/${sub.slug}`}
                      className="btn btn-sm w-100 py-2 rounded-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 mt-2"
                      style={{ backgroundColor: meta.color }}
                    >
                      <span>{sub.slug === 'core-java' ? 'Explore 18 Modules' : 'Explore Curriculum'}</span>
                      <FiArrowRight size={14} />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="btn btn-sm w-100 py-2 rounded-3 btn-outline-secondary d-flex align-items-center justify-content-center gap-2 mt-2 opacity-50"
                      style={{ cursor: 'not-allowed' }}
                    >
                      <span>Coming Soon</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
