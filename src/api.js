// src/api.js
import axios from 'axios';

let baseURL;

// If running locally → use local API
if (window.location.hostname === 'localhost') {
  baseURL = process.env.VUE_APP_API_URL;
} else {
  // Else → use prod API from environment
  baseURL = process.env.VUE_APP_API_URL_PROD;
}

const API = axios.create({
  baseURL: baseURL + 'api',
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;



