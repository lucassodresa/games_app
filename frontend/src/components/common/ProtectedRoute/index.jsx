import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInSelector } from '../../../recoil/user';

const ProtectedRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
