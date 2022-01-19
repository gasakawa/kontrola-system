import axios from 'axios';
import { getToken, getUser } from 'utils/storage-helper';
import env from '../config/env';

const axiosInstance = axios.create({
  baseURL: env.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'x-lang': 'es',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response) {
      window.location.href = '/';
      localStorage.removeItem('@Kontrola:token');
      localStorage.removeItem('@Kontrola:user');
      if (axiosInstance.defaults.headers) {
        delete axiosInstance.defaults.headers['x-access-token'];
        delete axiosInstance.defaults.headers['x-session-id'];
      }
      return Promise.reject(error);
    }
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

axiosInstance.interceptors.request.use(
  request => {
    const token = getToken();
    const user = getUser();
    if (token) {
      if (request.headers) {
        request.headers['x-access-token'] = token;
      }
      if (user) {
        if (request.headers) {
          request.headers['x-session-id'] = user.data.sessionId;
          request.headers['x-user-sub'] = user.data.sub;
        }
      }
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

const api = axiosInstance;

export default api;
