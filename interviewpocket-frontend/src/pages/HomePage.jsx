import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiCheckCircle, FiShield, FiZap, FiArrowRight, FiLock, FiBookOpen, FiCode } from 'react-icons/fi';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="py-5 text-center container">
        <div className="row py-lg-5 justify-content-center">
          <div className="col-lg-9 col-md-10">
            {/* Pill Tag */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <span className="badge rounded-pill" style={{ backgroundColor: '#0062ff' }}>Secure & Ready</span>
              <span className="small text-secondary" style={{ fontSize: '0.85rem' }}>
                Spring Security & JWT Authentication Active
              </span>
            </div>

            <h1 className="display-4 fw-extrabold mb-3" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Your Technical Knowledge.<br />
              <span style={{ color: '#0062ff' }}>One Place. Always Ready.</span>
            </h1>

            <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: '640px', fontSize: '1.15rem' }}>
              InterviewPocket is your personal technical interview preparation platform. Access curated notes, coding problems, SQL queries, and concept revisions with real-time authentication.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn btn-lg text-white px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2 fw-semibold"
                  style={{ backgroundColor: '#0062ff' }}
                >
                  <span>Go to Dashboard</span>
                  <FiArrowRight />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn btn-lg text-white px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2 fw-semibold"
                    style={{ backgroundColor: '#0062ff' }}
                  >
                    <span>Create Free Account</span>
                    <FiArrowRight />
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-lg btn-outline-secondary px-4 py-2 rounded-3 fw-semibold border"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Architecture & Core Pillars</h2>
            <p className="text-secondary small">Engineered with production-grade separation of concerns</p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-4">
              <div
                className="h-100 p-4 rounded-4 border shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              >
                <div
                  className="rounded-3 d-inline-flex p-3 mb-3 text-white"
                  style={{ backgroundColor: '#0062ff' }}
                >
                  <FiLock size={24} />
                </div>
                <h4 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Real JWT Security</h4>
                <p className="text-secondary small mb-3">
                  Stateless token authentication backed by Spring Security, BCrypt password hashing, and MySQL database persistence.
                </p>
                <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> Token expiry & session protection
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> Sanitized responses without leaked hashes
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div
                className="h-100 p-4 rounded-4 border shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              >
                <div
                  className="rounded-3 d-inline-flex p-3 mb-3 text-white"
                  style={{ backgroundColor: '#10b981' }}
                >
                  <FiBookOpen size={24} />
                </div>
                <h4 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Structured Learning</h4>
                <p className="text-secondary small mb-3">
                  Organized technical knowledge covering Core Java, Advanced Java, React, Frontend, MySQL, and Problem Solving.
                </p>
                <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> Clean topic breakdowns
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> Real interview questions & answers
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div
                className="h-100 p-4 rounded-4 border shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              >
                <div
                  className="rounded-3 d-inline-flex p-3 mb-3 text-white"
                  style={{ backgroundColor: '#8b5cf6' }}
                >
                  <FiZap size={24} />
                </div>
                <h4 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Minimal & Responsive</h4>
                <p className="text-secondary small mb-3">
                  Distraction-free interface crafted for fast revisions across desktop, tablet, and mobile devices.
                </p>
                <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> Dark and Light mode support
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FiCheckCircle className="text-success" /> Instant local & network accessibility
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

