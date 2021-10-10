import axios from 'axios';
import env from '../config/env';

const axiosInstance = axios.create({
  baseURL: env.baseURL,
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { url } = error.response.config;
    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem('@Kontrola:token');
      localStorage.removeItem('@Kontrola:user');
      if (url !== '/login') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

const api = axiosInstance;

export default api;
