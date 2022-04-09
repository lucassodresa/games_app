import { useCallback } from 'react';
import axios from 'axios';
import StatusCodes from 'http-status-codes';
import useAuth from '../hooks/useAuth';
import { getToken } from '../helpers/auth';

const useAxios = (props) => {
  const { logout } = useAuth();
  const api = useCallback(() => {
    const axiosInstance = axios.create({
      baseURL: `${process.env.BASE_URL}/api`
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
  }, [getToken, logout]);

  return api;
};

export default useAxios;
