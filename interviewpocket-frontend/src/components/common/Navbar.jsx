import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiHome,
  FiInfo,
  FiLayout,
  FiLogIn,
  FiUserPlus,
  FiChevronDown
} from 'react-icons/fi';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Handle click outside for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header
      className="sticky-top border-bottom"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        backdropFilter: 'blur(10px)',
        zIndex: 1030,
        transition: 'background-color 0.2s ease, border-color 0.2s ease'
      }}
    >
      <div className="container-fluid px-3 px-lg-4">
        <div className="d-flex align-items-center justify-content-between" style={{ height: '64px' }}>
          {/* Left: Logo & InterviewPocket Branding */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="text-decoration-none d-flex align-items-center gap-2"
          >
            <div
              className="rounded-3 d-flex align-items-center justify-content-center shadow-sm"
              style={{
                width: '38px',
                height: '38px',
                background: 'linear-gradient(135deg, #0062ff 0%, #3b82f6 100%)',
                color: '#ffffff'
              }}
            >
              <span className="fw-bold fs-6">IP</span>
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold tracking-tight fs-5" style={{ color: 'var(--text-primary)', lineHeight: 1.15 }}>
                Interview<span style={{ color: '#0062ff' }}>Pocket</span>
              </span>
              <span className="text-muted" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                TECHNICAL KNOWLEDGE
              </span>
            </div>
          </Link>

          {/* Right: Desktop Navigation Links & Controls */}
          <div className="d-none d-md-flex align-items-center gap-2">
            {/* Common Navigation Links */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-3 text-decoration-none fw-medium d-flex align-items-center gap-1 ${
                isActive('/')
                  ? 'text-primary fw-semibold'
                  : 'text-secondary'
              }`}
              style={{
                fontSize: '0.9rem',
                backgroundColor: isActive('/') ? 'rgba(0, 98, 255, 0.08)' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <FiHome size={16} />
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-3 text-decoration-none fw-medium d-flex align-items-center gap-1 ${
                isActive('/about')
                  ? 'text-primary fw-semibold'
                  : 'text-secondary'
              }`}
              style={{
                fontSize: '0.9rem',
                backgroundColor: isActive('/about') ? 'rgba(0, 98, 255, 0.08)' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <FiInfo size={16} />
              <span>About</span>
            </Link>

            {/* Authenticated State Links */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-3 text-decoration-none fw-medium d-flex align-items-center gap-1 ${
                    isActive('/dashboard')
                      ? 'text-primary fw-semibold'
                      : 'text-secondary'
                  }`}
                  style={{
                    fontSize: '0.9rem',
                    backgroundColor: isActive('/dashboard') ? 'rgba(0, 98, 255, 0.08)' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <FiLayout size={16} />
                  <span>Dashboard</span>
                </Link>

                {/* User Profile Dropdown */}
                <div className="position-relative ms-1" ref={profileDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="btn btn-sm d-flex align-items-center gap-2 rounded-pill px-2 py-1 border"
                    style={{
                      backgroundColor: isProfileOpen ? 'rgba(0, 98, 255, 0.06)' : 'var(--bg-card)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                      transition: 'all 0.15s ease'
                    }}
                    aria-expanded={isProfileOpen}
                    aria-label="User menu"
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        width: '28px',
                        height: '28px',
                        fontSize: '0.72rem',
                        backgroundColor: '#0062ff'
                      }}
                    >
                      {getInitials(user?.fullName)}
                    </div>
                    <span className="fw-semibold small px-1 d-inline-block text-truncate" style={{ maxWidth: '140px' }}>
                      {user?.fullName || 'User'}
                    </span>
                    <FiChevronDown
                      size={14}
                      className="text-muted"
                      style={{
                        transform: isProfileOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div
                      className="shadow-lg border rounded-4 p-2 position-absolute end-0 mt-2"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-color)',
                        minWidth: '220px',
                        zIndex: 1050,
                        animation: 'fadeIn 0.15s ease'
                      }}
                    >
                      {/* User Info Header */}
                      <div className="px-3 py-2 mb-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="fw-bold small text-truncate" style={{ color: 'var(--text-primary)' }}>
                          {user?.fullName}
                        </div>
                        <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>
                          {user?.email}
                        </div>
                        <div className="mt-1">
                          <span
                            className="badge rounded-pill"
                            style={{
                              backgroundColor: 'rgba(0, 98, 255, 0.1)',
                              color: '#0062ff',
                              fontSize: '0.68rem',
                              fontWeight: 600
                            }}
                          >
                            {user?.role || 'ROLE_USER'}
                          </span>
                        </div>
                      </div>

                      {/* Dropdown Items: Profile & Logout */}
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="dropdown-item py-2 px-3 rounded-3 small d-flex align-items-center gap-2 mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <FiUser size={15} style={{ color: '#0062ff' }} />
                        <span>Profile</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="dropdown-item py-2 px-3 rounded-3 small d-flex align-items-center gap-2 text-danger w-100 btn text-start"
                      >
                        <FiLogOut size={15} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Logged Out State Links */
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-3 text-decoration-none fw-medium d-flex align-items-center gap-1 ${
                    isActive('/login')
                      ? 'text-primary fw-semibold'
                      : 'text-secondary'
                  }`}
                  style={{
                    fontSize: '0.9rem',
                    backgroundColor: isActive('/login') ? 'rgba(0, 98, 255, 0.08)' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <FiLogIn size={16} />
                  <span>Sign In</span>
                </Link>

                <Link
                  to="/register"
                  className="btn btn-sm text-white px-3 py-2 rounded-3 fw-semibold shadow-sm d-flex align-items-center gap-1 ms-1"
                  style={{
                    backgroundColor: '#0062ff',
                    fontSize: '0.88rem',
                    height: '36px'
                  }}
                >
                  <FiUserPlus size={15} />
                  <span>Register</span>
                </Link>
              </>
            )}

            {/* Dark/Light Theme Toggle */}
            <div className="ms-2 ps-2 border-start" style={{ borderColor: 'var(--border-color)' }}>
              <ThemeToggle />
            </div>
          </div>

          {/* Right: Mobile Controls (Theme Toggle + Hamburger) */}
          <div className="d-flex d-md-none align-items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-sm btn-outline-secondary rounded-3 p-2"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="d-md-none border-top px-3 py-3"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="d-flex flex-column gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-3 text-decoration-none d-flex align-items-center gap-2 fw-medium ${
                isActive('/') ? 'text-primary bg-primary bg-opacity-10 fw-semibold' : 'text-secondary'
              }`}
            >
              <FiHome size={18} />
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-3 text-decoration-none d-flex align-items-center gap-2 fw-medium ${
                isActive('/about') ? 'text-primary bg-primary bg-opacity-10 fw-semibold' : 'text-secondary'
              }`}
            >
              <FiInfo size={18} />
              <span>About</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-3 text-decoration-none d-flex align-items-center gap-2 fw-medium ${
                    isActive('/dashboard') ? 'text-primary bg-primary bg-opacity-10 fw-semibold' : 'text-secondary'
                  }`}
                >
                  <FiLayout size={18} />
                  <span>Dashboard</span>
                </Link>

                {/* Mobile User Profile Section */}
                <div
                  className="p-3 mt-2 rounded-3 border"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        width: '32px',
                        height: '32px',
                        fontSize: '0.8rem',
                        backgroundColor: '#0062ff'
                      }}
                    >
                      {getInitials(user?.fullName)}
                    </div>
                    <div className="d-flex flex-column text-truncate">
                      <span className="small fw-bold text-truncate" style={{ color: 'var(--text-primary)' }}>
                        {user?.fullName}
                      </span>
                      <span className="text-muted text-truncate" style={{ fontSize: '0.72rem' }}>
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-2">
                    <Link
                      to="/dashboard"
                      className="btn btn-sm btn-outline-primary flex-grow-1 py-1 d-flex align-items-center justify-content-center gap-1"
                    >
                      <FiUser size={14} /> Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="btn btn-sm btn-outline-danger flex-grow-1 py-1 d-flex align-items-center justify-content-center gap-1"
                    >
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column gap-2 pt-2 mt-2 border-top" style={{ borderColor: 'var(--border-color)' }}>
                <Link
                  to="/login"
                  className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 fw-medium"
                >
                  <FiLogIn size={16} />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="btn text-white w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 fw-semibold shadow-sm"
                  style={{ backgroundColor: '#0062ff' }}
                >
                  <FiUserPlus size={16} />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
