import React, { useState, useEffect } from 'react';
import {
  getTopicRagStatus,
  generateRagQuestions,
  generateRagQuiz,
  getPendingQuestions,
  getPendingQuizzes,
  approveRagQuestion,
  rejectRagQuestion,
  approveRagQuizQuestion,
  rejectRagQuizQuestion,
  bulkApproveRagTopic,
  runRagTestPipeline
} from '../../services/ragService';
import {
  FiCpu,
  FiZap,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiDatabase,
  FiFileText,
  FiAward,
  FiRefreshCw,
  FiLayers,
  FiCheck,
  FiX
} from 'react-icons/fi';

export default function TopicRagAdminBar({ topic, subject, onContentUpdated }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [runningTests, setRunningTests] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Modals
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [pendingQuizzes, setPendingQuizzes] = useState([]);
  const [reviewTab, setReviewTab] = useState('questions'); // questions, quizzes
  const [reviewActionLoading, setReviewActionLoading] = useState(false);

  // Test results modal
  const [showTestModal, setShowTestModal] = useState(false);
  const [testReport, setTestReport] = useState(null);

  const fetchStatus = async () => {
    if (!topic?.id) return;
    try {
      const data = await getTopicRagStatus(topic.id);
      setStatus(data);
    } catch (e) {
      console.error('Failed to fetch RAG status:', e);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [topic?.id]);

  const handleGenerateQuestions = async () => {
    try {
      setGeneratingQuestions(true);
      setFeedback({ type: 'info', msg: 'RAG Pipeline running: Chunking approved notes → Dense embedding retrieval → LLM generation → Anti-duplicate validation...' });
      const res = await generateRagQuestions(topic.id);
      setFeedback({
        type: 'success',
        msg: `Generated ${res.savedPendingReviewCount} interview questions! They are in PENDING_REVIEW status awaiting admin approval.`
      });
      await fetchStatus();
      if (onContentUpdated) onContentUpdated();
    } catch (e) {
      console.error(e);
      setFeedback({
        type: 'danger',
        msg: e.response?.data?.message || 'Error occurred during RAG question generation.'
      });
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const handleGenerateQuiz = async () => {
    try {
      setGeneratingQuiz(true);
      setFeedback({ type: 'info', msg: 'RAG Pipeline running: Retrieving chunks → Embedding vector matching → LLM MCQ generation → Validating 4 options & 1 correct...' });
      const res = await generateRagQuiz(topic.id);
      setFeedback({
        type: 'success',
        msg: `Generated ${res.savedPendingReviewCount} MCQs! They are in PENDING_REVIEW status awaiting admin approval.`
      });
      await fetchStatus();
      if (onContentUpdated) onContentUpdated();
    } catch (e) {
      console.error(e);
      setFeedback({
        type: 'danger',
        msg: e.response?.data?.message || 'Error occurred during RAG quiz generation.'
      });
    } finally {
      setGeneratingQuiz(false);
    }
  };

  const handleOpenReview = async () => {
    try {
      setReviewActionLoading(true);
      setShowReviewModal(true);
      const [pq, pz] = await Promise.all([
        getPendingQuestions(topic.id),
        getPendingQuizzes(topic.id)
      ]);
      setPendingQuestions(pq || []);
      setPendingQuizzes(pz || []);
    } catch (e) {
      console.error('Failed to load pending items:', e);
    } finally {
      setReviewActionLoading(false);
    }
  };

  const handleApproveQuestion = async (id) => {
    try {
      setReviewActionLoading(true);
      await approveRagQuestion(id);
      setPendingQuestions((prev) => prev.filter((q) => q.id !== id));
      await fetchStatus();
      if (onContentUpdated) onContentUpdated();
    } catch (e) {
      console.error(e);
    } finally {
      setReviewActionLoading(false);
    }
  };

  const handleRejectQuestion = async (id) => {
    const reason = window.prompt('Enter reason for rejecting this question (optional):', 'Duplicate or inaccurate');
    if (reason === null) return;
    try {
      setReviewActionLoading(true);
      await rejectRagQuestion(id, reason);
      setPendingQuestions((prev) => prev.filter((q) => q.id !== id));
      await fetchStatus();
      if (onContentUpdated) onContentUpdated();
    } catch (e) {
      console.error(e);
    } finally {
      setReviewActionLoading(false);
    }
  };

  const handleApproveQuiz = async (id) => {
    try {
      setReviewActionLoading(true);
      await approveRagQuizQuestion(id);
      setPendingQuizzes((prev) => prev.filter((q) => q.id !== id));
      await fetchStatus();
      if (onContentUpdated) onContentUpdated();
    } catch (e) {
      console.error(e);
    } finally {
      setReviewActionLoading(false);
    }
  };

  const handleRejectQuiz = async (id) => {
    const reason = window.prompt('Enter reason for rejecting this quiz question (optional):', 'Inaccurate options');
    if (reason === null) return;
    try {
      setReviewActionLoading(true);
      await rejectRagQuizQuestion(id, reason);
      setPendingQuizzes((prev) => prev.filter((q) => q.id !== id));
      await fetchStatus();
      if (onContentUpdated) onContentUpdated();
    } catch (e) {
      console.error(e);
    } finally {
      setReviewActionLoading(false);
    }
  };

  const handleBulkApprove = async () => {
    if (!window.confirm(`Bulk approve all pending interview questions and quizzes for ${topic.title}?`)) return;
    try {
      setReviewActionLoading(true);
      await bulkApproveRagTopic(topic.id);
      setPendingQuestions([]);
      setPendingQuizzes([]);
      setShowReviewModal(false);
      setFeedback({ type: 'success', msg: 'All pending items successfully approved and published to students!' });
      await fetchStatus();
      if (onContentUpdated) onContentUpdated();
    } catch (e) {
      console.error(e);
    } finally {
      setReviewActionLoading(false);
    }
  };

  const handleRunTests = async () => {
    try {
      setRunningTests(true);
      setShowTestModal(true);
      setTestReport(null);
      const res = await runRagTestPipeline(topic.id);
      setTestReport(res);
      await fetchStatus();
      if (onContentUpdated) onContentUpdated();
    } catch (e) {
      console.error(e);
      alert('Error running test suite: ' + (e.response?.data?.message || e.message));
    } finally {
      setRunningTests(false);
    }
  };

  const totalPending = (status?.pendingQuestionsCount || 0) + (status?.pendingQuizzesCount || 0);

  return (
    <div className="mb-4">
      {/* Pilot Scope Card */}
      <div
        className="p-4 rounded-4 border shadow-sm"
        style={{
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          borderColor: '#1e293b'
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3 border-bottom border-secondary border-opacity-25 pb-3">
          <div className="d-flex align-items-center gap-2">
            <span
              className="rounded-3 p-2 text-white d-inline-flex align-items-center justify-content-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
            >
              <FiCpu size={20} />
            </span>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h5 className="fw-bold mb-0 text-white">AI Content Generator (RAG Pipeline)</h5>
                <span className="badge bg-warning text-dark fw-bold" style={{ fontSize: '0.72rem' }}>
                  PILOT: FRONTEND ONLY
                </span>
              </div>
              <p className="text-secondary small mb-0 mt-0.5">
                Approved Notes → Semantic Chunking → 384-D Vector Store → Similarity Retrieval → Grounded LLM → Strict Validation → MySQL
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="badge bg-dark border border-secondary px-2.5 py-1.5 small font-monospace d-inline-flex align-items-center gap-1.5">
              <FiDatabase className="text-info" size={13} /> Chunks: <strong className="text-info">{status?.vectorChunksCount ?? 0}</strong>
            </span>
            <span className="badge bg-dark border border-secondary px-2.5 py-1.5 small font-monospace d-inline-flex align-items-center gap-1.5">
              <FiFileText className="text-success" size={13} /> Approved Qs: <strong className="text-success">{status?.approvedQuestionsCount ?? 0}</strong>
            </span>
            <span className="badge bg-dark border border-secondary px-2.5 py-1.5 small font-monospace d-inline-flex align-items-center gap-1.5">
              <FiAward className="text-warning" size={13} /> Approved Quizzes: <strong className="text-warning">{status?.approvedQuizzesCount ?? 0}</strong>
            </span>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={handleGenerateQuestions}
              disabled={generatingQuestions || generatingQuiz}
              className="btn btn-sm btn-primary rounded-3 px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
            >
              {generatingQuestions ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  <span>Generating 20 Questions...</span>
                </>
              ) : (
                <>
                  <FiZap size={15} />
                  <span>Generate Interview Questions</span>
                </>
              )}
            </button>

            <button
              onClick={handleGenerateQuiz}
              disabled={generatingQuestions || generatingQuiz}
              className="btn btn-sm btn-outline-warning rounded-3 px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm text-warning"
            >
              {generatingQuiz ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  <span>Generating 10 MCQs...</span>
                </>
              ) : (
                <>
                  <FiAward size={15} />
                  <span>Generate Quiz</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenReview}
              className={`btn btn-sm rounded-3 px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm ${
                totalPending > 0 ? 'btn-warning text-dark' : 'btn-outline-light'
              }`}
            >
              <FiLayers size={15} />
              <span>Review & Approvals</span>
              {totalPending > 0 && (
                <span className="badge bg-danger rounded-pill px-2 py-0.5" style={{ fontSize: '0.72rem' }}>
                  {totalPending} Pending
                </span>
              )}
            </button>
          </div>

          <div>
            <button
              onClick={handleRunTests}
              disabled={runningTests}
              className="btn btn-sm btn-outline-info rounded-3 px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 text-info"
            >
              <FiCheckCircle size={15} />
              <span>{runningTests ? 'Running 10 Scenarios...' : 'Run 10-Scenario Test Suite'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Status / Progress Feedback */}
        {feedback && (
          <div className={`alert alert-${feedback.type} py-2.5 px-3 rounded-3 mt-3 mb-0 small d-flex align-items-center justify-content-between`}>
            <span>{feedback.msg}</span>
            <button onClick={() => setFeedback(null)} className="btn-close btn-close-white small ms-2" />
          </div>
        )}
      </div>

      {/* Admin Review Drawer / Modal */}
      {showReviewModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1055 }}
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-bottom px-4 py-3 bg-light">
                <div className="d-flex align-items-center gap-2">
                  <FiLayers className="text-primary" size={20} />
                  <h5 className="modal-title fw-bold">Admin Content Approval Workflow: {topic.title}</h5>
                </div>
                <button type="button" className="btn-close" onClick={() => setShowReviewModal(false)} />
              </div>

              <div className="modal-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                  <ul className="nav nav-pills gap-2">
                    <li className="nav-item">
                      <button
                        className={`nav-link rounded-pill px-3 py-1.5 small fw-semibold ${reviewTab === 'questions' ? 'active' : ''}`}
                        onClick={() => setReviewTab('questions')}
                      >
                        Pending Questions ({pendingQuestions.length})
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link rounded-pill px-3 py-1.5 small fw-semibold ${reviewTab === 'quizzes' ? 'active' : ''}`}
                        onClick={() => setReviewTab('quizzes')}
                      >
                        Pending Quizzes ({pendingQuizzes.length})
                      </button>
                    </li>
                  </ul>

                  {(pendingQuestions.length > 0 || pendingQuizzes.length > 0) && (
                    <button
                      onClick={handleBulkApprove}
                      disabled={reviewActionLoading}
                      className="btn btn-sm btn-success rounded-3 px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1.5 shadow-sm"
                    >
                      <FiCheck size={16} /> Bulk Approve All
                    </button>
                  )}
                </div>

                {/* Tab: Questions */}
                {reviewTab === 'questions' && (
                  <div>
                    {pendingQuestions.length === 0 ? (
                      <div className="text-center py-5 text-secondary">
                        <FiCheckCircle size={40} className="text-success mb-2" />
                        <p className="fw-semibold mb-0">No questions awaiting review.</p>
                        <small>All generated questions have been approved or rejected.</small>
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-3">
                        {pendingQuestions.map((q, idx) => (
                          <div key={q.id} className="p-3.5 rounded-3 border bg-white shadow-sm">
                            <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
                              <div>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <span className="badge bg-secondary small">{q.difficulty}</span>
                                  {q.sourceReference && (
                                    <span className="badge bg-info bg-opacity-10 text-info-emphasis border border-info border-opacity-25 small">
                                      Source: {q.sourceReference}
                                    </span>
                                  )}
                                  <span className="badge bg-warning text-dark small">PENDING_REVIEW</span>
                                </div>
                                <h6 className="fw-bold mb-1 text-dark">
                                  {idx + 1}. {q.question}
                                </h6>
                              </div>
                              <div className="d-flex align-items-center gap-1.5 flex-shrink-0">
                                <button
                                  onClick={() => handleApproveQuestion(q.id)}
                                  disabled={reviewActionLoading}
                                  className="btn btn-sm btn-outline-success rounded-3 px-2.5 py-1 d-inline-flex align-items-center gap-1"
                                >
                                  <FiCheck size={14} /> Approve
                                </button>
                                <button
                                  onClick={() => handleRejectQuestion(q.id)}
                                  disabled={reviewActionLoading}
                                  className="btn btn-sm btn-outline-danger rounded-3 px-2.5 py-1 d-inline-flex align-items-center gap-1"
                                >
                                  <FiX size={14} /> Reject
                                </button>
                              </div>
                            </div>
                            <div className="p-2.5 rounded-2 bg-light border small text-secondary">
                              <strong>Answer:</strong> {q.simpleAnswer}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Quizzes */}
                {reviewTab === 'quizzes' && (
                  <div>
                    {pendingQuizzes.length === 0 ? (
                      <div className="text-center py-5 text-secondary">
                        <FiCheckCircle size={40} className="text-success mb-2" />
                        <p className="fw-semibold mb-0">No quiz questions awaiting review.</p>
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-3">
                        {pendingQuizzes.map((qz, idx) => (
                          <div key={qz.id} className="p-3.5 rounded-3 border bg-white shadow-sm">
                            <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
                              <div>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <span className="badge bg-secondary small">{qz.difficulty}</span>
                                  {qz.sourceReference && (
                                    <span className="badge bg-info bg-opacity-10 text-info-emphasis border border-info border-opacity-25 small">
                                      Source: {qz.sourceReference}
                                    </span>
                                  )}
                                  <span className="badge bg-warning text-dark small">PENDING_REVIEW</span>
                                </div>
                                <h6 className="fw-bold mb-2 text-dark">
                                  {idx + 1}. {qz.questionText}
                                </h6>
                              </div>
                              <div className="d-flex align-items-center gap-1.5 flex-shrink-0">
                                <button
                                  onClick={() => handleApproveQuiz(qz.id)}
                                  disabled={reviewActionLoading}
                                  className="btn btn-sm btn-outline-success rounded-3 px-2.5 py-1 d-inline-flex align-items-center gap-1"
                                >
                                  <FiCheck size={14} /> Approve
                                </button>
                                <button
                                  onClick={() => handleRejectQuiz(qz.id)}
                                  disabled={reviewActionLoading}
                                  className="btn btn-sm btn-outline-danger rounded-3 px-2.5 py-1 d-inline-flex align-items-center gap-1"
                                >
                                  <FiX size={14} /> Reject
                                </button>
                              </div>
                            </div>

                            <div className="row g-2 mb-2">
                              {qz.options?.map((opt) => (
                                <div key={opt.id || opt.optionLabel} className="col-12 col-md-6">
                                  <div
                                    className={`p-2 rounded-2 border small ${
                                      opt.isCorrect ? 'bg-success bg-opacity-10 border-success text-success fw-bold' : 'bg-light'
                                    }`}
                                  >
                                    <span className="me-2 fw-bold">{opt.optionLabel}.</span>
                                    {opt.optionText}
                                    {opt.isCorrect && <span className="ms-2 badge bg-success">Correct</span>}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="p-2 rounded-2 bg-light border small text-muted">
                              <strong>Explanation:</strong> {qz.explanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="modal-footer border-top px-4 py-3 bg-light">
                <button type="button" className="btn btn-secondary rounded-3 px-4" onClick={() => setShowReviewModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10-Scenario Test Suite Audit Modal */}
      {showTestModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-bottom px-4 py-3 bg-dark text-white">
                <div className="d-flex align-items-center gap-2">
                  <FiCheckCircle className="text-info" size={20} />
                  <h5 className="modal-title fw-bold text-white">RAG Pilot 10-Point Verification Suite</h5>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowTestModal(false)} />
              </div>

              <div className="modal-body p-4">
                {runningTests ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} />
                    <h6 className="fw-bold">Executing 10 Verification Scenarios on {topic.title}...</h6>
                    <p className="text-secondary small mb-0">Testing notes retrieval, topic isolation, duplicate checks, quiz correctness, and resilience.</p>
                  </div>
                ) : testReport ? (
                  <div>
                    <div className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-4 border" style={{ backgroundColor: testReport.allPassed ? '#ecfdf5' : '#fef2f2', borderColor: testReport.allPassed ? '#10b981' : '#ef4444' }}>
                      <div className="d-flex align-items-center gap-2">
                        {testReport.allPassed ? (
                          <FiCheckCircle size={28} className="text-success" />
                        ) : (
                          <FiAlertTriangle size={28} className="text-danger" />
                        )}
                        <div>
                          <h6 className="fw-bold mb-0 text-dark">
                            {testReport.allPassed ? 'All 10 Verification Scenarios Passed Successfully!' : 'Some Scenarios Failed'}
                          </h6>
                          <small className="text-muted">Target Topic: {testReport.topicTitle} (ID: {testReport.topicId})</small>
                        </div>
                      </div>
                      <span className={`badge ${testReport.allPassed ? 'bg-success' : 'bg-danger'} px-3 py-2 fs-6`}>
                        {testReport.passedScenarios}/{testReport.totalScenarios} Passed
                      </span>
                    </div>

                    <div className="d-flex flex-column gap-2.5">
                      {testReport.results?.map((sc) => (
                        <div key={sc.scenarioNumber} className="p-3 rounded-3 border bg-white shadow-sm">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <span className="fw-bold small text-dark d-flex align-items-center gap-2">
                              {sc.passed ? (
                                <FiCheckCircle className="text-success" size={16} />
                              ) : (
                                <FiXCircle className="text-danger" size={16} />
                              )}
                              Scenario {sc.scenarioNumber}: {sc.scenarioName}
                            </span>
                            <span className={`badge ${sc.passed ? 'bg-success' : 'bg-danger'} small`}>
                              {sc.passed ? 'PASSED' : 'FAILED'}
                            </span>
                          </div>
                          <p className="small text-secondary mb-0 font-monospace ps-4">
                            {sc.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="modal-footer border-top px-4 py-3 bg-light">
                <button type="button" className="btn btn-secondary rounded-3 px-4" onClick={() => setShowTestModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

