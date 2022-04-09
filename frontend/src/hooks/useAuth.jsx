import React, { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { clearToken } from '../helpers/auth';
import { loggedUserInfoState } from '../recoil/user';
import authService from '../services/auth';
import useAxios from './useAxios';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedUserInfoState);

  const navigate = useNavigate();
  const logout = useCallback(() => {
    setIsLoggedIn(null);
    clearToken();
    navigate('/signin');
  }, []);

  const login = useCallback(() => {
    const api = useAxios({ withAuth: true });
    const validateToken = useQuery(
      'validateToken',
      authService.validateToken(api),
      {
        onSuccess: () => {
          setIsLoggedIn(true);
          navigate('/');
        },
        onError: (error) => logout()
      }
    );
  }, []);

  return { logout, login };
};

export default useAuth;
