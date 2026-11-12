import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectBySlugApi, getTopicsBySubjectIdApi } from '../services/subjectService';
import {
  FiArrowLeft,
  FiBookOpen,
  FiHelpCircle,
  FiCheckCircle,
  FiChevronRight,
  FiLayers
} from 'react-icons/fi';
import { FaJava, FaHtml5, FaReact, FaDatabase, FaBrain } from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';

export default function SubjectDetailPage() {
  const { slug } = useParams();
  const [subject, setSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubjectMeta = (sSlug) => {
    switch (sSlug) {
      case 'core-java':
        return { icon: <FaJava size={32} />, color: '#f89820', bg: 'rgba(248, 152, 32, 0.12)' };
      case 'frontend':
        return { icon: <FaHtml5 size={32} />, color: '#e34f26', bg: 'rgba(227, 79, 38, 0.12)' };
      case 'react':
        return { icon: <FaReact size={32} />, color: '#61dafb', bg: 'rgba(97, 218, 251, 0.12)' };
      case 'advanced-java':
        return { icon: <SiSpringboot size={32} />, color: '#6db33f', bg: 'rgba(109, 179, 63, 0.12)' };
      case 'mysql':
        return { icon: <FaDatabase size={32} />, color: '#00758f', bg: 'rgba(0, 117, 143, 0.12)' };
      case 'problem-solving':
        return { icon: <FaBrain size={32} />, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' };
      default:
        return { icon: <FiLayers size={32} />, color: '#0062ff', bg: 'rgba(0, 98, 255, 0.12)' };
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      try {
        setLoading(true);
        const subData = await getSubjectBySlugApi(slug);
        if (isMounted && subData) {
          setSubject(subData);
          const topicsData = await getTopicsBySubjectIdApi(subData.id);
          if (isMounted) {
            setTopics(topicsData);
          }
        }
      } catch (err) {
        console.error('Failed to load subject details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDetails();
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading topic details...</span>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="container py-5 text-center">
        <div className="p-5 mx-auto rounded-4 border shadow-sm" style={{ maxWidth: '540px', backgroundColor: 'var(--bg-card)' }}>
          <h3 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Subject Not Found</h3>
          <p className="text-secondary small mb-4">The requested subject could not be located in the database.</p>
          <Link to="/subjects" className="btn btn-primary px-4 py-2 rounded-3">
            Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  const meta = getSubjectMeta(subject.slug);

  return (
    <div className="container py-4 py-lg-5" style={{ maxWidth: '960px' }}>
      {/* Back link */}
      <Link to="/subjects" className="text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1 mb-3 text-secondary">
        <FiArrowLeft /> Back to Subjects
      </Link>

      {/* Subject Header Banner */}
      <div
        className="p-4 p-md-5 rounded-4 border shadow-sm mb-4"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="d-flex align-items-start gap-3">
          <div
            className="rounded-3 p-3 d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ backgroundColor: meta.bg, color: meta.color }}
          >
            {meta.icon}
          </div>
          <div>
            <div className="badge rounded-pill bg-primary bg-opacity-10 text-primary mb-2 small fw-semibold">
              {topics.length} Technical Topics
            </div>
            <h1 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {subject.name}
            </h1>
            <p className="text-secondary small mb-0" style={{ lineHeight: 1.6 }}>
              {subject.description}
            </p>
          </div>
        </div>
      </div>

      {/* Topic List */}
      <div className="mb-4">
        <h4 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Topics & Study Guides</h4>
        {topics.length === 0 ? (
          <div className="p-4 p-md-5 rounded-4 border text-center shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="fs-1 mb-2">📚</div>
            <h5 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Curriculum Authoring in Progress</h5>
            <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '500px' }}>
              The curriculum, comprehensive notes, and interview Q&As for {subject.name} are currently being authored. In the meantime, explore our complete 18-module Core Java curriculum!
            </p>
            <Link to="/subjects/core-java" className="btn btn-primary px-4 py-2 rounded-3 fw-semibold">
              Explore Core Java (18 Modules)
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {topics.map((topic, idx) => (
              <div
                key={topic.id}
                className="p-3 p-md-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                    style={{ width: '36px', height: '36px', backgroundColor: meta.color, fontSize: '0.85rem' }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h5 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>
                        {topic.title}
                      </h5>
                      {topic.slug === 'html-forms-and-validation' && (
                        <span className="badge bg-warning text-dark fw-bold px-2 py-0.5" style={{ fontSize: '0.72rem' }}>
                          ⚡ AI RAG Pilot Active
                        </span>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-2 text-muted small" style={{ fontSize: '0.78rem' }}>
                      {topic.module?.title && <span>{topic.module.title} •</span>}
                      <span>Slug: <code>{topic.slug}</code></span>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Link
                    to={`/subjects/${subject.slug}/topics/${topic.slug}`}
                    className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 rounded-3 px-3 py-2 fw-semibold"
                  >
                    <FiBookOpen size={14} />
                    <span>Notes & Q&A</span>
                    <FiChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

