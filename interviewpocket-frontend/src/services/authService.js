import api from './api';

/**
 * Real Spring Boot Authentication APIs
 */

export const loginApi = async ({ email, password }) => {
  const response = await api.post('/auth/login', {
    email: email?.trim(),
    username: email?.trim(),
    password
  });
  return response.data;
};

export const registerApi = async ({ fullName, email, password }) => {
  const response = await api.post('/auth/register', {
    fullName: fullName?.trim(),
    email: email?.trim(),
    password
  });
  return response.data;
};

export const getMeApi = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
