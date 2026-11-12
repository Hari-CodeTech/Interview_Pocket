import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiLayers, FiDatabase, FiCpu, FiShield, FiArrowRight } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="container py-5" style={{ maxWidth: '860px' }}>
      {/* Header */}
      <div className="text-center mb-5">
        <span className="badge rounded-pill px-3 py-1 mb-2" style={{ backgroundColor: 'rgba(0, 98, 255, 0.1)', color: '#0062ff' }}>
          About InterviewPocket
        </span>
        <h1 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Mastering Technical Interviews
        </h1>
        <p className="text-secondary lead mx-auto" style={{ maxWidth: '680px' }}>
          InterviewPocket was conceived to solve the problem of scattered notes, unorganized bookmarks, and chaotic interview prep.
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div
        className="p-4 p-md-5 rounded-4 border shadow-sm mb-4"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <h3 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Our Purpose</h3>
        <p className="text-secondary mb-4" style={{ lineHeight: 1.7 }}>
          When preparing for software developer and full-stack interviews, candidates often jump across dozens of browser tabs, PDFs, scratch notes, and repositories. InterviewPocket provides a consolidated, reliable repository designed specifically for rapid revision and deep understanding.
        </p>

        <h4 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Technology Stack</h4>
        <div className="row g-3">
          <div className="col-sm-6">
            <div className="p-3 rounded-3 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="fw-bold small mb-1" style={{ color: 'var(--text-primary)' }}>Frontend Architecture</div>
              <ul className="list-unstyled small text-secondary mb-0">
                <li>• React.js (Single Page Application)</li>
                <li>• React Router DOM v6</li>
                <li>• Axios HTTP Client</li>
                <li>• Bootstrap 5 & React Icons</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-3 rounded-3 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="fw-bold small mb-1" style={{ color: 'var(--text-primary)' }}>Backend Architecture</div>
              <ul className="list-unstyled small text-secondary mb-0">
                <li>• Java 21 & Spring Boot 3</li>
                <li>• Spring Security & JWT</li>
                <li>• BCrypt Password Hashing</li>
                <li>• Spring Data JPA & Hibernate</li>
                <li>• MySQL Database</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div
        className="p-4 rounded-4 text-center border text-white"
        style={{ background: 'linear-gradient(135deg, #0062ff 0%, #1e40af 100%)', borderColor: '#1d4ed8' }}
      >
        <h3 className="fw-bold mb-2">Ready to Start Preparing?</h3>
        <p className="mb-4 opacity-90 small">Create your developer account or sign in to access your dashboard.</p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/register" className="btn btn-light px-4 py-2 rounded-3 fw-bold text-primary">
            Create Account
          </Link>
          <Link to="/login" className="btn btn-outline-light px-4 py-2 rounded-3 fw-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

