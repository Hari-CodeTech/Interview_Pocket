import api from './api';

export const getSubjectsApi = async () => {
  const response = await api.get('/subjects');
  return response.data;
};

export const getSubjectBySlugApi = async (slug) => {
  const response = await api.get(`/subjects/${slug}`);
  return response.data;
};

export const getModulesBySubjectIdApi = async (subjectId) => {
  const response = await api.get(`/modules/subject/${subjectId}`);
  return response.data;
};

export const getTopicsBySubjectIdApi = async (subjectId) => {
  const response = await api.get(`/topics/subject/${subjectId}`);
  return response.data;
};

export const getTopicsByModuleIdApi = async (moduleId) => {
  const response = await api.get(`/topics/module/${moduleId}`);
  return response.data;
};

export const getTopicBySlugApi = async (slug) => {
  const response = await api.get(`/topics/slug/${slug}`);
  return response.data;
};

export const updateModuleApi = async (moduleId, moduleData) => {
  const response = await api.put(`/modules/${moduleId}`, moduleData);
  return response.data;
};

export const updateTopicApi = async (topicId, topicData) => {
  const response = await api.put(`/topics/${topicId}`, topicData);
  return response.data;
};

export const getNoteByTopicSlugApi = async (topicSlug) => {
  try {
    const response = await api.get(`/notes/topic-slug/${topicSlug}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getQuestionsByTopicIdApi = async (topicId) => {
  try {
    const response = await api.get(`/questions?topicId=${topicId}`);
    return response.data;
  } catch (err) {
    return [];
  }
};

export const getQuestionsByTopicSlugApi = async (topicSlug) => {
  try {
    const response = await api.get(`/questions/topic-slug/${topicSlug}`);
    return response.data;
  } catch (err) {
    return [];
  }
};

export const recordQuestionStatusApi = async (userId, questionId, status = 'PRACTICED') => {
  const response = await api.post('/questions/status', { userId, questionId, status });
  return response.data;
};

export const getUserQuestionStatusesApi = async (userId) => {
  try {
    const response = await api.get(`/questions/user/${userId}/status`);
    return response.data;
  } catch {
    return [];
  }
};

export const generateQuizSessionApi = async ({ topicSlug, subjectSlug, limit = 5, difficulty = '' }) => {
  const params = { limit };
  if (topicSlug) params.topicSlug = topicSlug;
  if (subjectSlug) params.subjectSlug = subjectSlug;
  if (difficulty) params.difficulty = difficulty;
  const response = await api.get('/quizzes/generate', { params });
  return response.data;
};

export const checkQuizAnswerApi = async (questionId, selectedOptionId) => {
  const response = await api.post('/quizzes/check-answer', { questionId, selectedOptionId });
  return response.data;
};

export const submitQuizAttemptApi = async (attemptData) => {
  const response = await api.post('/quizzes/attempts', attemptData);
  return response.data;
};

export const getUserQuizAttemptsApi = async (userId) => {
  try {
    const response = await api.get(`/quizzes/attempts/user/${userId}`);
    return response.data;
  } catch {
    return [];
  }
};

export const getCardProgressApi = async (userId, topicId) => {
  try {
    const response = await api.get(`/progress/user/${userId}/topic/${topicId}`);
    return response.data;
  } catch {
    return null;
  }
};

export const updateCardProgressApi = async (userId, topicId, cardType, completed, score) => {
  const response = await api.post('/progress/card', {
    userId,
    topicId,
    cardType,
    completed,
    score
  });
  return response.data;
};
