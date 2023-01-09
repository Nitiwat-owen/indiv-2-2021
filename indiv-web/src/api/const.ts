import axios from 'axios';

export const apiAxios = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8080/api/v1',
});

// Add a request interceptor
apiAxios.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers.Authorization = "Bearer " + authToken;
    console.log("Bearer " + authToken);
  }
  return config;
});