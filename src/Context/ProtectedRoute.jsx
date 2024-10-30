import React from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/loginPage" />;
};

export default ProtectedRoute;
