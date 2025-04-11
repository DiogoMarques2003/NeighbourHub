import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { removeToken } from '../utils/helperFunctions';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
        setIsLoading(true);
        const result = await authService.getCurrentUser();
        if(!result || result?.error) {
          removeToken();
          setCurrentUser(null);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
        setCurrentUser(result);
    };

    checkLoggedIn();
  }, []);

  const logout = async () => {
      removeToken();
      setCurrentUser(null);
  };

  const updateCurrentUser = (userData) => {
    setCurrentUser(prev => ({...prev, ...userData}));
  };

  const value = {
    currentUser,
    updateCurrentUser,
    logout,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


