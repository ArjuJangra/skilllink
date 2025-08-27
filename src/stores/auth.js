import { reactive } from 'vue';
import API from "@/api"; 

export const auth = reactive({
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('token')
});

export async function initAuth() {
  if (!auth.token) {
    logoutUser();
    return;
  }

  // ✅ Only set Authorization if token is valid
  if (auth.token && auth.token !== "null" && auth.token !== "undefined") {
    API.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  } else {
    logoutUser();
    return;
  }

  try {
    const res = await API.get("/auth/check");
    auth.user = res.data.user;
    auth.isLoggedIn = true;
    localStorage.setItem("user", JSON.stringify(res.data.user));
  } catch (err) {
    console.warn("Token invalid or expired:", err.response?.data || err.message);
    logoutUser();
  }
}


export function loginUser(token, userData) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  auth.token = token;
  auth.user = userData;
  auth.isLoggedIn = true;
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete API.defaults.headers.common['Authorization'];
  auth.isLoggedIn = false;
  auth.user = null;
  auth.token = null;
}

export async function fetchUserProfile() {
  try {
    const response = await API.get("/user/profile");
    auth.user = response.data;
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    console.error("❌ Fetch profile error:", error);
    if (error.response?.status === 401) {
      logoutUser();
    }
  }
}
