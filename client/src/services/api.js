import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Dar request sathe automatic token umervu (jo user login thai gayo hoy to)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;