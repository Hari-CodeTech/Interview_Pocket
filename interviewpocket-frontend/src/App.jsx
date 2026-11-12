import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoreJavaPage from './pages/CoreJavaPage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import TopicDetailPage from './pages/TopicDetailPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('InterviewPocket ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center">
          <div className="p-5 mx-auto rounded-4 border shadow-sm" style={{ maxWidth: '600px', backgroundColor: '#ffffff' }}>
            <div className="fs-1 text-danger mb-3">⚠️</div>
            <h3 className="fw-bold mb-2 text-dark">Something went wrong</h3>
            <p className="text-secondary mb-3">{this.state.error?.message || 'An unexpected rendering error occurred.'}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Reload InterviewPocket
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signin" element={<Navigate to="/login" replace />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                
                {/* Dedicated Core Java Subject Module */}
                <Route
                  path="/subjects/core-java"
                  element={
                    <ProtectedRoute>
                      <CoreJavaPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/core-java"
                  element={<Navigate to="/subjects/core-java" replace />}
                />

                {/* General Subjects & Topics */}
                <Route
                  path="/subjects"
                  element={
                    <ProtectedRoute>
                      <SubjectsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subjects/:slug"
                  element={
                    <ProtectedRoute>
                      <SubjectDetailPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subjects/:slug/topics/:topicSlug"
                  element={
                    <ProtectedRoute>
                      <TopicDetailPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subjects/:slug/topics/:topicSlug/:section"
                  element={
                    <ProtectedRoute>
                      <TopicDetailPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
