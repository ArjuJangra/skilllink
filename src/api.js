// src/api.js
import axios from 'axios';

let baseURL;

if (window.location.hostname === 'localhost') {
  baseURL = process.env.VUE_APP_API_URL || "http://localhost:5000";
} else {
  baseURL = process.env.VUE_APP_API_URL_PROD;
}

const API = axios.create({
  baseURL: `${baseURL}/api`,   // now guaranteed correct
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

console.log("👉 API Base URL:", `${baseURL}/api`); // Debug log

export default API;




