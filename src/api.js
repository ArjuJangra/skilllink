// src/api.js
import axios from "axios";

let baseURL;
let uploadsBaseURL;

// Set URLs depending on environment
if (window.location.hostname === "localhost") {
  baseURL = process.env.VUE_APP_API_URL || "http://localhost:5000";
  uploadsBaseURL = process.env.VUE_APP_UPLOADS_URL || "http://localhost:5000/uploads/";
} else {
  baseURL = process.env.VUE_APP_API_URL_PROD;
  uploadsBaseURL = process.env.VUE_APP_UPLOADS_URL_PROD;
}

// Ensure no trailing slash issues
if (baseURL.endsWith("/")) baseURL = baseURL.slice(0, -1);
if (!uploadsBaseURL.endsWith("/")) uploadsBaseURL += "/";

// Axios instance for API
const API = axios.create({
  baseURL: `${baseURL}/api`,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add uploadsBaseURL and helper function
API.uploadsBaseURL = uploadsBaseURL;
API.getImageUrl = (filename) => `${uploadsBaseURL}${filename}`;

console.log("👉 API Base URL:", `${baseURL}/api`);
console.log("👉 Uploads Base URL:", uploadsBaseURL);

export default API;






