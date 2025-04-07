import { useAuth } from '@/context/useAuth';
import React, { useEffect } from 'react';

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
