import axios from 'axios';

const authAxios = axios.create();

authAxios.interceptors.request.use(
  (config) => {
    const JWT_TOKEN = localStorage.getItem('token');
    if (JWT_TOKEN) {
      config.headers.Authorization = `Bearer ${JWT_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export {authAxios};

