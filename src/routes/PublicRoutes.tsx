import React from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes: React.FC = () => {
  const { isLoggedIn, tokenChecking } = useAuth();
  return tokenChecking ? (
    <></>
  ) : isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
