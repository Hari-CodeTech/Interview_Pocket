import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const LogoBadge = () => (
  <div
    className="d-flex align-items-center justify-content-center shadow-sm"
    style={{
      width: '64px',
      height: '64px',
      borderRadius: '20px',
      background: 'linear-gradient(145deg, #182232 0%, #0d131f 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)'
    }}
  >
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z"
        fill="url(#gradCap)"
      />
      <path
        d="M5 13.18V17.18C5 19.39 8.13 21.18 12 21.18C15.87 21.18 19 19.39 19 17.18V13.18L12 17L5 13.18Z"
        fill="url(#gradCap)"
      />
      <defs>
        <linearGradient id="gradCap" x1="1" y1="3" x2="23" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState(location.state?.message || '');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showGoogleNotice, setShowGoogleNotice] = useState(false);

  // If already authenticated, redirect to dashboard or intended route
  const from = location.state?.from?.pathname || '/dashboard';
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      setLoading(true);
      await login({
        email: email.trim(),
        password,
        rememberMe
      });
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAutofill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center py-5 px-3 min-vh-100"
      style={{ backgroundColor: '#F3F5F9' }}
    >
      <div
        className="w-100 shadow-sm"
        style={{
          maxWidth: '560px',
          backgroundColor: '#ffffff',
          borderRadius: '35px',
          padding: '42px 40px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Top Logo Badge */}
        <div className="d-flex justify-content-center mb-3">
          <LogoBadge />
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1 text-dark" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
            Login
          </h2>
          <p className="text-secondary small mb-0">Sign in to your account</p>
        </div>

        {/* Info Message */}
        {infoMessage && (
          <div className="alert alert-success d-flex align-items-center gap-2 py-2 px-3 rounded-3 small mb-3 border-0">
            <FiCheckCircle className="flex-shrink-0 text-success" size={16} />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 rounded-3 small mb-3 border-0">
            <FiAlertCircle className="flex-shrink-0 text-danger" size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Address */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-dark mb-1">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control py-2 px-3"
              style={{
                borderRadius: '12px',
                fontSize: '0.94rem',
                borderColor: '#dee2e6',
                height: '46px'
              }}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="form-label small fw-semibold text-dark mb-1">
              Password <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control py-2 px-3 pe-5"
                style={{
                  borderRadius: '12px',
                  fontSize: '0.94rem',
                  borderColor: '#dee2e6',
                  height: '46px'
                }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y text-secondary border-0 pe-3"
                style={{ background: 'transparent' }}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link (aligned right) */}
          <div className="d-flex justify-content-end mb-4">
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none small fw-semibold"
              style={{ color: '#0062ff', fontSize: '0.88rem' }}
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </button>
          </div>

          {/* Full-width blue Sign In button */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-100 py-2 text-white fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3"
            style={{
              backgroundColor: '#0062ff',
              borderRadius: '12px',
              fontSize: '0.98rem',
              height: '48px',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="d-flex align-items-center my-3">
          <div className="flex-grow-1 border-top" style={{ borderColor: '#e2e8f0' }}></div>
          <span className="px-3 text-secondary small fw-bold" style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}>
            OR
          </span>
          <div className="flex-grow-1 border-top" style={{ borderColor: '#e2e8f0' }}></div>
        </div>

        {/* Continue with Google button */}
        <button
          type="button"
          onClick={() => setShowGoogleNotice(true)}
          className="btn w-100 py-2 bg-white border d-flex align-items-center justify-content-center gap-2 mb-4 shadow-sm"
          style={{
            borderRadius: '50px',
            borderColor: '#dee2e6',
            color: '#1e293b',
            fontSize: '0.94rem',
            fontWeight: 600,
            height: '46px',
            transition: 'all 0.15s ease'
          }}
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        {/* Bottom Link to Register */}
        <div className="text-center mb-3">
          <span className="text-secondary small">Don't have an account? </span>
          <Link
            to="/register"
            className="text-decoration-none fw-semibold small"
            style={{ color: '#0062ff' }}
          >
            Register
          </Link>
        </div>

        {/* One-click demo credential pill */}
        <div className="pt-3 border-top text-center">
          <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Demo Quick Login: </span>
          <button
            type="button"
            className="btn btn-sm btn-link p-0 text-decoration-none fw-semibold ms-1"
            style={{ fontSize: '0.75rem', color: '#0062ff' }}
            onClick={() => handleAutofill('dev@interviewpocket.com', 'dev123')}
          >
            Alex Mercer (Developer)
          </button>
          <span className="text-muted mx-1">•</span>
          <button
            type="button"
            className="btn btn-sm btn-link p-0 text-decoration-none fw-semibold"
            style={{ fontSize: '0.75rem', color: '#64748b' }}
            onClick={() => handleAutofill('admin@interviewpocket.com', 'admin123')}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Google Notice Modal */}
      {showGoogleNotice && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <GoogleIcon /> Google Authentication
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowGoogleNotice(false)}></button>
              </div>
              <div className="modal-body text-secondary small py-3">
                <p>
                  Google OAuth 2.0 single sign-on can be activated by providing the <code>GOOGLE_CLIENT_ID</code> in <code>application.properties</code>.
                </p>
                <p className="mb-0">
                  For immediate access, please sign in with your email or use the one-click demo credentials below the card.
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-primary px-4 rounded-3"
                  style={{ backgroundColor: '#0062ff' }}
                  onClick={() => setShowGoogleNotice(false)}
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark">Password Recovery</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForgotModal(false)}
                ></button>
              </div>
              <div className="modal-body text-secondary small py-3">
                <p>
                  To reset your password, contact your InterviewPocket workspace administrator or use your registered email address.
                </p>
                <div className="p-2 rounded bg-light border text-muted">
                  Default developer credentials: <code>dev@interviewpocket.com</code> / <code>dev123</code>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-sm btn-primary px-3 rounded-3"
                  style={{ backgroundColor: '#0062ff' }}
                  onClick={() => setShowForgotModal(false)}
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
