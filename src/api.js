// src/api.js
import axios from "axios";

let baseURL;
let uploadsBaseURL;

// Use NODE_ENV to determine environment
if (process.env.NODE_ENV === "development") {
  baseURL = process.env.VUE_APP_API_URL || "http://localhost:5000";
  uploadsBaseURL = process.env.VUE_APP_UPLOADS_URL || "http://localhost:5000/uploads/";
} else {
  baseURL = process.env.VUE_APP_API_URL_PROD || "https://skilllink-7hfa.onrender.com";
  uploadsBaseURL = process.env.VUE_APP_UPLOADS_URL_PROD || "https://skilllink-7hfa.onrender.com/uploads/";
}

// Remove trailing slash from baseURL
if (baseURL.endsWith("/")) baseURL = baseURL.slice(0, -1);
// Ensure uploadsBaseURL ends with slash
if (!uploadsBaseURL.endsWith("/")) uploadsBaseURL += "/";

// Axios instance
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

// Attach uploads helpers
API.uploadsBaseURL = uploadsBaseURL;
API.getImageUrl = (filename) => `${uploadsBaseURL}${filename}`;

console.log("👉 API Base URL:", `${baseURL}/api`);
console.log("👉 Uploads Base URL:", uploadsBaseURL);

export default API;







