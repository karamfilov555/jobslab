import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth context
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage when the app loads
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set authentication status based on token existence
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true); // Update the state to reflect authentication
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); // Update the state to reflect logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
