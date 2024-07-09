// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// Create Context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status when the app starts
    const checkAuthStatus = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (token) => {
    await SecureStore.setItemAsync('token', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
