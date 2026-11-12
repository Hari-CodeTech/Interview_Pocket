import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="mt-auto py-4 border-top" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container py-2">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="rounded-2 d-flex align-items-center justify-content-center text-white fw-bold"
                style={{ width: '24px', height: '24px', backgroundColor: '#0062ff', fontSize: '0.75rem' }}
              >
                IP
              </div>
              <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>InterviewPocket</span>
              <span className="badge bg-secondary bg-opacity-10 text-secondary" style={{ fontSize: '0.7rem' }}>v1.0</span>
            </div>
            <p className="text-secondary small mb-0">
              Your Technical Knowledge. One Place. Always Ready.
            </p>
          </div>

          <div className="col-12 col-md-6 text-md-end">
            <div className="d-flex align-items-center justify-content-md-end gap-3 small text-secondary">
              <Link to="/" className="text-decoration-none text-secondary">Home</Link>
              <Link to="/about" className="text-decoration-none text-secondary">About</Link>
              {isAuthenticated ? (
                <Link to="/dashboard" className="text-decoration-none text-secondary">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" className="text-decoration-none text-secondary">Sign In</Link>
                  <Link to="/register" className="text-decoration-none text-secondary">Register</Link>
                </>
              )}
            </div>
            <small className="text-muted d-block mt-2" style={{ fontSize: '0.78rem' }}>
              © {new Date().getFullYear()} InterviewPocket. Built with React, Spring Boot & MySQL.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
