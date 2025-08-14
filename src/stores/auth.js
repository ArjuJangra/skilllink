import axios from 'axios';
import { reactive } from 'vue';

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

  axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
  try {
    const res = await axios.get('http://localhost:5000/api/auth/check');
    auth.user = res.data.user;
    auth.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(res.data.user));
  } catch (err) {
    console.warn('Token invalid or expired:', err.response?.data || err.message);
    logoutUser();
  }
}

export function loginUser(token, userData) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  auth.token = token;
  auth.user = userData;
  auth.isLoggedIn = true;
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  auth.isLoggedIn = false;
  auth.user = null;
  auth.token = null;
}

export async function fetchUserProfile() {
  try {
    const response = await axios.get('http://localhost:5000/api/user/profile');
    auth.user = response.data;
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (error) {
    console.error('❌ Fetch profile error:', error);
    if (error.response?.status === 401) {
      logoutUser();
    }
  }
}


