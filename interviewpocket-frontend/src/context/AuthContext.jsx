import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi, getMeApi } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('interviewpocket_token'));
  const [loading, setLoading] = useState(true);

  // Synchronize authentication on mount or token change
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const storedToken = localStorage.getItem('interviewpocket_token');
      if (!storedToken) {
        if (isMounted) {
          setUser(null);
          setToken(null);
          setLoading(false);
        }
        return;
      }

      try {
        const currentUser = await getMeApi();
        if (isMounted) {
          setUser(currentUser);
          setToken(storedToken);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.response?.data?.message || err.message);
        if (isMounted) {
          localStorage.removeItem('interviewpocket_token');
          setUser(null);
          setToken(null);
          setLoading(false);
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    const jwtToken = data.token;
    const userData = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      role: data.role || (data.roles && data.roles[0]) || 'ROLE_USER'
    };

    if (credentials.rememberMe !== false) {
      localStorage.setItem('interviewpocket_token', jwtToken);
    } else {
      sessionStorage.setItem('interviewpocket_token', jwtToken);
      localStorage.setItem('interviewpocket_token', jwtToken);
    }

    setToken(jwtToken);
    setUser(userData);
    return data;
  };

  const register = async (signUpData) => {
    const data = await registerApi(signUpData);
    const jwtToken = data.token;
    const userData = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      role: data.role || (data.roles && data.roles[0]) || 'ROLE_USER'
    };

    if (jwtToken) {
      localStorage.setItem('interviewpocket_token', jwtToken);
      setToken(jwtToken);
      setUser(userData);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('interviewpocket_token');
    sessionStorage.removeItem('interviewpocket_token');
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = Boolean(token && user);
  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.roles?.includes('ROLE_ADMIN');

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
