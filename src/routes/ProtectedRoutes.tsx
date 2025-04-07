import React from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

const ProtectedRoutes: React.FC = () => {
  const { isLoggedIn, tokenChecking } = useAuth();

  return tokenChecking ? (
    <></>
  ) : isLoggedIn ? (
    <div className="  lg:ml-64">
      <Header />
      <div className="mt-16 p-4  bg-slate-100 font-ubuntu">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
