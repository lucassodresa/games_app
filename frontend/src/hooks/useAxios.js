import { useCallback } from 'react';
import axios from 'axios';
import StatusCodes from 'http-status-codes';
import { clearToken, getToken } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedUserInfoState } from '../recoil/user';
import { useMutation } from 'react-query';
import authService from '../services/auth';

const useAxios = (props) => {
  const setIsLoggedIn = useRecoilState(loggedUserInfoState)[1];
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setIsLoggedIn(null);
    clearToken();
    navigate('/signin');
  }, [navigate, setIsLoggedIn]);

  const api = useCallback(() => {
    const axiosInstance = axios.create({
      baseURL: `http://localhost:3001/api`
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;

        if (status === StatusCodes.FORBIDDEN) logout();

        return Promise.reject(error);
      }
    );

    if (props?.withAuth) {
      axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${getToken()}`;

        return config;
      });
    }

    return axiosInstance;
  }, [logout, props]);

  const { mutate, isLoading } = useMutation(authService.validateToken(api), {
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate('/');
    },
    onError: () => logout()
  });

  const login = useCallback(() => {
    mutate();
  }, [mutate]);

  return { api, logout, login, isLoadingLogin: isLoading };
};

export default useAxios;
