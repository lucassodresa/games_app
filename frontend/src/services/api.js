// libraries
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userTokenSelector } from '../recoil/user';

// utils
// import { getJWT, clearJWT } from "../utils/jwt"

// import { StatusCodes } from 'http-status-codes';

const axiosInstance = () => {
  const api = axios.create({
    baseURL: `${process.env.BASE_URL}/api`
  });

  //   api.interceptors.request.use((config) => {
  //     config.headers.authorization = `Bearer ${getJWT()}`;

  //     return config;
  //   });

  //   api.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       const status = error.response?.status;

  //       if (status === StatusCodes.UNAUTHORIZED) {
  //         clearJWT();
  //         return error.response.data;
  //       }
  //       if (status === StatusCodes.CONFLICT) {
  //         return error.response.data;
  //       } else {
  //         return error;
  //       }
  //     }
  //   );

  return api;
};

export default axiosInstance;
