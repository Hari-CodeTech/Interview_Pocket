import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiEye,
  FiEyeOff,
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
  FiCode,
  FiLayers,
  FiCpu
} from 'react-icons/fi';

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

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Multi-step State
  const [currentStep, setCurrentStep] = useState(1); // 1: Verify Email, 2: Select Batch, 3: Create Account
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Step 2 Batch Selection
  const [selectedBatch, setSelectedBatch] = useState('full-stack-java');

  // Step 3 User Details
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showGoogleNotice, setShowGoogleNotice] = useState(false);

  // If already logged in, go to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Step 1: Send verification code
  const handleSendCode = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    if (!email.trim() || !isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setCodeSent(true);
    setSuccessMessage(`A 6-digit verification code was sent to ${email.trim()} (Demo code: 123456)`);
  };

  // Step 1: Verify Code and move to Step 2
  const handleVerifyCode = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    if (!verificationCode.trim()) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }
    // Accept demo code 123456 or any 6-digit code for testing
    if (verificationCode.trim().length >= 4) {
      setEmailVerified(true);
      setSuccessMessage('');
      setCurrentStep(2);
    } else {
      setErrorMessage('Invalid verification code. Use demo code 123456 to continue.');
    }
  };

  // Step 2: Batch Selection -> Step 3
  const handleBatchSelected = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setCurrentStep(3);
  };

  // Step 3: Final Registration & Account Creation
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Full Name is required.');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your confirm password.');
      return;
    }

    try {
      setLoading(true);
      await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        learningLevel: selectedBatch,
        preparationGoal: selectedBatch
      });

      setSuccessMessage('Account created successfully! Launching your workspace...');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed. Please check your information.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const batches = [
    {
      id: 'full-stack-java',
      name: 'Full Stack Java Developer Batch (2026)',
      tag: 'Most Popular',
      desc: 'Core Java, Spring Boot, Microservices, JPA/Hibernate, MySQL & React frontend.',
      icon: <FiCode size={20} className="text-primary" />
    },
    {
      id: 'campus-interview',
      name: 'Interview Fast-Track & Placements',
      tag: 'Fast Track',
      desc: 'Top 500 Java interview questions, tricky coding drills, and OOP design patterns.',
      icon: <FiLayers size={20} className="text-success" />
    },
    {
      id: 'backend-systems',
      name: 'Backend Engineering & Distributed Systems',
      tag: 'Advanced',
      desc: 'Multithreading, Concurrency, JVM performance tuning, and Distributed Caching.',
      icon: <FiCpu size={20} className="text-warning" />
    }
  ];

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
        {/* Card Heading */}
        <div className="text-center mb-2">
          <h2 className="fw-bold mb-1 text-dark" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
            Create Account
          </h2>
          <p className="text-secondary small mb-0">
            {currentStep === 1 && 'Start by verifying your email address'}
            {currentStep === 2 && 'Select your target learning batch'}
            {currentStep === 3 && 'Complete your account credentials'}
          </p>
        </div>

        {/* 3-Step Stepper (Chaduvuko Style) */}
        <div className="d-flex align-items-center justify-content-center my-4">
          {/* Step 1 */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: '28px',
                height: '28px',
                fontSize: '0.85rem',
                backgroundColor: currentStep >= 1 ? '#0062ff' : '#e2e8f0',
                color: currentStep >= 1 ? '#ffffff' : '#64748b'
              }}
            >
              {emailVerified ? <FiCheck size={14} /> : '1'}
            </div>
            <span
              className="small fw-semibold"
              style={{
                fontSize: '0.86rem',
                color: currentStep === 1 ? '#0f172a' : '#64748b'
              }}
            >
              Verify Email
            </span>
          </div>

          {/* Line 1 */}
          <div
            className="mx-2"
            style={{
              height: '1px',
              width: '32px',
              backgroundColor: currentStep >= 2 ? '#0062ff' : '#cbd5e1'
            }}
          ></div>

          {/* Step 2 */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: '28px',
                height: '28px',
                fontSize: '0.85rem',
                backgroundColor: currentStep >= 2 ? '#0062ff' : '#cbd5e1',
                color: currentStep >= 2 ? '#ffffff' : '#64748b'
              }}
            >
              {currentStep > 2 ? <FiCheck size={14} /> : '2'}
            </div>
            <span
              className="small fw-semibold"
              style={{
                fontSize: '0.86rem',
                color: currentStep === 2 ? '#0f172a' : '#64748b'
              }}
            >
              Select Batch
            </span>
          </div>

          {/* Line 2 */}
          <div
            className="mx-2"
            style={{
              height: '1px',
              width: '32px',
              backgroundColor: currentStep >= 3 ? '#0062ff' : '#cbd5e1'
            }}
          ></div>

          {/* Step 3 */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: '28px',
                height: '28px',
                fontSize: '0.85rem',
                backgroundColor: currentStep === 3 ? '#0062ff' : '#cbd5e1',
                color: currentStep === 3 ? '#ffffff' : '#64748b'
              }}
            >
              3
            </div>
            <span
              className="small fw-semibold"
              style={{
                fontSize: '0.86rem',
                color: currentStep === 3 ? '#0f172a' : '#64748b'
              }}
            >
              Create Account
            </span>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="alert alert-success d-flex align-items-center gap-2 py-2 px-3 rounded-3 small mb-3 border-0">
            <FiCheckCircle className="flex-shrink-0 text-success" size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 rounded-3 small mb-3 border-0">
            <FiAlertCircle className="flex-shrink-0 text-danger" size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: VERIFY EMAIL (EXACTLY AS IN CHADUVUKO SCREENSHOT) */}
        {currentStep === 1 && (
          <div>
            {!codeSent ? (
              <form onSubmit={handleSendCode}>
                {/* Email Address Input */}
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
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    autoComplete="email"
                  />
                </div>

                {/* Send Verification Code Button */}
                <button
                  type="submit"
                  disabled={!isValidEmail(email)}
                  className="btn w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-2"
                  style={{
                    backgroundColor: isValidEmail(email) ? '#0062ff' : '#e2e8f0',
                    color: isValidEmail(email) ? '#ffffff' : '#94a3b8',
                    borderRadius: '12px',
                    fontSize: '0.96rem',
                    height: '48px',
                    cursor: isValidEmail(email) ? 'pointer' : 'not-allowed',
                    border: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>Send Verification Code</span>
                </button>

                {/* Subtext below button */}
                <p className="text-center text-secondary small mb-4" style={{ fontSize: '0.84rem' }}>
                  We'll send a 6-digit verification code to your email
                </p>
              </form>
            ) : (
              /* Verification Code Prompt */
              <form onSubmit={handleVerifyCode}>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <label className="form-label small fw-semibold text-dark mb-0">
                      Enter Verification Code <span className="text-danger">*</span>
                    </label>
                    <button
                      type="button"
                      className="btn btn-link p-0 small text-decoration-none"
                      style={{ fontSize: '0.8rem', color: '#0062ff' }}
                      onClick={() => setCodeSent(false)}
                    >
                      Change Email
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    className="form-control text-center fw-bold fs-5 tracking-widest py-2"
                    style={{
                      borderRadius: '12px',
                      borderColor: '#0062ff',
                      letterSpacing: '0.3em',
                      height: '50px'
                    }}
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    required
                    autoFocus
                  />
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
                      Code sent to <strong>{email}</strong>
                    </span>
                    <button
                      type="button"
                      className="btn btn-link p-0 small text-decoration-none"
                      style={{ fontSize: '0.78rem', color: '#0062ff' }}
                      onClick={() => setVerificationCode('123456')}
                    >
                      Autofill Demo Code
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn w-100 py-2 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 mb-3 shadow-sm"
                  style={{
                    backgroundColor: '#0062ff',
                    borderRadius: '12px',
                    fontSize: '0.96rem',
                    height: '48px'
                  }}
                >
                  <span>Verify Email & Continue</span>
                  <FiArrowRight />
                </button>
              </form>
            )}

            {/* OR REGISTER WITH divider */}
            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1 border-top" style={{ borderColor: '#e2e8f0' }}></div>
              <span className="px-3 text-secondary small fw-bold" style={{ fontSize: '0.76rem', letterSpacing: '0.05em' }}>
                OR REGISTER WITH
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

            {/* Bottom Link to Sign In */}
            <div className="text-center pt-2">
              <span className="text-secondary small">Already have an account? </span>
              <Link
                to="/login"
                className="text-decoration-none fw-semibold small"
                style={{ color: '#0062ff' }}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT BATCH */}
        {currentStep === 2 && (
          <div>
            <div className="d-flex flex-column gap-3 mb-4">
              {batches.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBatch(b.id)}
                  className="p-3 rounded-4 border cursor-pointer transition"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedBatch === b.id ? 'rgba(0, 98, 255, 0.04)' : '#ffffff',
                    borderColor: selectedBatch === b.id ? '#0062ff' : '#e2e8f0',
                    borderWidth: selectedBatch === b.id ? '2px' : '1px'
                  }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 rounded-3 bg-light border mt-1">
                      {b.icon}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="fw-bold small text-dark">{b.name}</span>
                        <span
                          className="badge rounded-pill"
                          style={{
                            backgroundColor: selectedBatch === b.id ? '#0062ff' : '#f1f5f9',
                            color: selectedBatch === b.id ? '#ffffff' : '#64748b',
                            fontSize: '0.68rem'
                          }}
                        >
                          {b.tag}
                        </span>
                      </div>
                      <p className="text-secondary small mb-0" style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                        {b.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary px-3 py-2 rounded-3 small d-flex align-items-center gap-1"
                onClick={() => setCurrentStep(1)}
              >
                <FiArrowLeft /> Back
              </button>
              <button
                type="button"
                onClick={handleBatchSelected}
                className="btn text-white flex-grow-1 py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                style={{ backgroundColor: '#0062ff', height: '46px' }}
              >
                <span>Continue to Account Details</span>
                <FiArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CREATE ACCOUNT CREDENTIALS */}
        {currentStep === 3 && (
          <form onSubmit={handleFinalSubmit} noValidate>
            {/* Summary Badge */}
            <div className="p-2 px-3 rounded-3 mb-3 d-flex align-items-center justify-content-between" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div className="small text-truncate">
                <span className="text-muted">Email: </span>
                <strong className="text-dark">{email}</strong>
              </div>
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none small"
                style={{ fontSize: '0.78rem', color: '#0062ff' }}
                onClick={() => setCurrentStep(1)}
              >
                Change
              </button>
            </div>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-dark mb-1">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control py-2 px-3"
                style={{ borderRadius: '12px', fontSize: '0.94rem', borderColor: '#dee2e6', height: '46px' }}
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-dark mb-1">
                Password <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control py-2 px-3 pe-5"
                  style={{ borderRadius: '12px', fontSize: '0.94rem', borderColor: '#dee2e6', height: '46px' }}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y text-secondary border-0 pe-3"
                  style={{ background: 'transparent' }}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label small fw-semibold text-dark mb-1">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-control py-2 px-3 pe-5"
                  style={{
                    borderRadius: '12px',
                    fontSize: '0.94rem',
                    borderColor: confirmPassword && confirmPassword !== password ? '#ef4444' : '#dee2e6',
                    height: '46px'
                  }}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y text-secondary border-0 pe-3"
                  style={{ background: 'transparent' }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <div className="text-danger small mt-1" style={{ fontSize: '0.78rem' }}>
                  Passwords do not match.
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="d-flex gap-2 mb-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-3 rounded-3 small d-flex align-items-center gap-1"
                onClick={() => setCurrentStep(2)}
              >
                <FiArrowLeft /> Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn text-white flex-grow-1 py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                style={{ backgroundColor: '#0062ff', height: '48px' }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account & Sign In</span>
                )}
              </button>
            </div>

            {/* Bottom Link to Sign In */}
            <div className="text-center pt-2 border-top">
              <span className="text-secondary small">Already have an account? </span>
              <Link
                to="/login"
                className="text-decoration-none fw-semibold small"
                style={{ color: '#0062ff' }}
              >
                Sign In
              </Link>
            </div>
          </form>
        )}
      </div>

      {/* Google Notice Modal */}
      {showGoogleNotice && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <GoogleIcon /> Google Registration
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowGoogleNotice(false)}></button>
              </div>
              <div className="modal-body text-secondary small py-3">
                <p>
                  Google OAuth 2.0 registration can be enabled by configuring <code>GOOGLE_CLIENT_ID</code> in the workspace backend settings.
                </p>
                <p className="mb-0">
                  You can register instantly using your email address and password in the current form.
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
    </div>
  );
}
