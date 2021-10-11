import axios from 'axios';
import env from '../config/env';

const axiosInstance = axios.create({
  baseURL: env.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
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
      if (axiosInstance.defaults.headers) {
        delete axiosInstance.defaults.headers['x-access-token'];
        delete axiosInstance.defaults.headers['x-session-id'];
      }
      if (url !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

const api = axiosInstance;

export default api;
