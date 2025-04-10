// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { removeToken } from '../utils/helperFunctions';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const initializeAuth = async () => {
        setIsLoading(true);
        try {
          const user = await authService.getCurrentUser();
          if(user) setCurrentUser(user);
        } catch(e) {
          removeToken();
        }
        
        setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    currentUser,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


