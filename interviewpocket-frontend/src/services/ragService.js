import api from './api';

export const getTopicRagStatus = async (topicId) => {
  const res = await api.get(`/rag/status/${topicId}`);
  return res.data;
};

export const ingestTopicRag = async (topicId) => {
  const res = await api.post(`/rag/ingest/${topicId}`);
  return res.data;
};

export const generateRagQuestions = async (topicId) => {
  const res = await api.post(`/rag/generate-questions/${topicId}`);
  return res.data;
};

export const generateRagQuiz = async (topicId) => {
  const res = await api.post(`/rag/generate-quiz/${topicId}`);
  return res.data;
};

export const getPendingQuestions = async (topicId) => {
  const res = await api.get(`/rag/pending-questions/${topicId}`);
  return res.data;
};

export const getPendingQuizzes = async (topicId) => {
  const res = await api.get(`/rag/pending-quizzes/${topicId}`);
  return res.data;
};

export const approveRagQuestion = async (id) => {
  const res = await api.put(`/rag/questions/${id}/approve`);
  return res.data;
};

export const rejectRagQuestion = async (id, reason) => {
  const res = await api.put(`/rag/questions/${id}/reject`, { reason });
  return res.data;
};

export const approveRagQuizQuestion = async (id) => {
  const res = await api.put(`/rag/quiz-questions/${id}/approve`);
  return res.data;
};

export const rejectRagQuizQuestion = async (id, reason) => {
  const res = await api.put(`/rag/quiz-questions/${id}/reject`, { reason });
  return res.data;
};

export const bulkApproveRagTopic = async (topicId) => {
  const res = await api.post(`/rag/bulk-approve/${topicId}`);
  return res.data;
};

export const runRagTestPipeline = async (topicId) => {
  const res = await api.get(`/rag/test-pipeline/${topicId}`);
  return res.data;
};

