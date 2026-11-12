import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubjectsApi } from '../services/subjectService';
import {
  FiBookOpen,
  FiSearch,
  FiArrowRight,
  FiLayers,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';
import { FaJava, FaHtml5, FaReact, FaDatabase, FaBrain } from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const getSubjectMeta = (slug) => {
    switch (slug) {
      case 'core-java':
        return {
          icon: <FaJava size={28} />,
          color: '#f89820',
          bg: 'rgba(248, 152, 32, 0.12)',
          topicsText: '130 Topics • 18 Modules',
          category: 'Backend',
          isReady: true,
          statusText: 'Active Curriculum'
        };
      case 'frontend':
        return {
          icon: <FaHtml5 size={28} />,
          color: '#e34f26',
          bg: 'rgba(227, 79, 38, 0.12)',
          topicsText: '22 Topics • 4 Modules',
          category: 'Web',
          isReady: true,
          statusText: 'Active Curriculum',
          buttonText: 'Explore 22 Topics'
        };
      case 'react':
        return {
          icon: <FaReact size={28} />,
          color: '#61dafb',
          bg: 'rgba(97, 218, 251, 0.12)',
          topicsText: 'In Development',
          category: 'Web',
          isReady: false,
          statusText: 'Coming Soon'
        };
      case 'advanced-java':
        return {
          icon: <SiSpringboot size={28} />,
          color: '#6db33f',
          bg: 'rgba(109, 179, 63, 0.12)',
          topicsText: 'In Development',
          category: 'Backend',
          isReady: false,
          statusText: 'Coming Soon'
        };
      case 'mysql':
        return {
          icon: <FaDatabase size={28} />,
          color: '#00758f',
          bg: 'rgba(0, 117, 143, 0.12)',
          topicsText: 'In Development',
          category: 'Database',
          isReady: false,
          statusText: 'Coming Soon'
        };
      case 'problem-solving':
        return {
          icon: <FaBrain size={28} />,
          color: '#8b5cf6',
          bg: 'rgba(139, 92, 246, 0.12)',
          topicsText: 'In Development',
          category: 'Algorithms',
          isReady: false,
          statusText: 'Coming Soon'
        };
      default:
        return {
          icon: <FiLayers size={28} />,
          color: '#0062ff',
          bg: 'rgba(0, 98, 255, 0.12)',
          topicsText: 'In Development',
          category: 'General',
          isReady: false,
          statusText: 'Coming Soon'
        };
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadSubjects = async () => {
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
    loadSubjects();
    return () => { isMounted = false; };
  }, []);

  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4 py-lg-5" style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <div className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-1 rounded-pill small fw-semibold">
            Technical Knowledge Bank
          </div>
          <h1 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Subject Categories
          </h1>
          <p className="text-secondary small mb-0">
            Choose a subject to revise core concepts, comprehensive notes, and curated interview questions.
          </p>
        </div>

        <div className="input-group" style={{ maxWidth: '320px' }}>
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
              fontSize: '0.88rem'
            }}
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
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
                  className="p-4 rounded-4 border shadow-sm h-100 d-flex flex-column justify-content-between"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div
                        className="rounded-3 p-3 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        {meta.icon}
                      </div>
                      <span className={`badge rounded-pill small ${meta.isReady ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-25' : 'bg-secondary bg-opacity-10 text-secondary border'}`}>
                        {meta.statusText}
                      </span>
                    </div>

                    <h4 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {sub.name}
                    </h4>
                    <div className="small text-muted mb-2 fw-medium" style={{ fontSize: '0.78rem' }}>
                      {meta.topicsText}
                    </div>
                    <p className="text-secondary small mb-3" style={{ lineHeight: 1.6, minHeight: '48px' }}>
                      {sub.description}
                    </p>
                  </div>

                  {meta.isReady ? (
                    <Link
                      to={`/subjects/${sub.slug}`}
                      className="btn btn-sm w-100 py-2 rounded-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 mt-2"
                      style={{ backgroundColor: meta.color }}
                    >
                      <span>{meta.buttonText || (sub.slug === 'core-java' ? 'Explore 18 Modules' : 'Explore Topics')}</span>
                      <FiArrowRight size={14} />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="btn btn-sm w-100 py-2 rounded-3 btn-outline-secondary d-flex align-items-center justify-content-center gap-2 mt-2 opacity-50"
                      style={{ cursor: 'not-allowed' }}
                    >
                      <span>In Development</span>
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
