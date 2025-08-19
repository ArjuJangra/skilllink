import axios from 'axios';
import { reactive } from 'vue';

// Helper to check both storages
function getFromStorage(key) {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
}

// Helper to remove from both storages
function removeFromStorages(key) {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}

// Reactive auth state
export const auth = reactive({
  token: getFromStorage('token') || null,
  user: JSON.parse(getFromStorage('user')) || null,
  isLoggedIn: !!getFromStorage('token')
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

    // Update in both storages so session is fresh
    if (localStorage.getItem('token')) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } else {
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
    }
  } catch (err) {
    console.warn('Token invalid or expired:', err.response?.data || err.message);
    logoutUser();
  }
}

/**
 * Logs in a user.
 * @param {string} token - JWT token
 * @param {object} userData - User data object
 * @param {boolean} remember - If true, use localStorage, else sessionStorage
 */
export function loginUser(token, userData, remember = false) {
  const storage = remember ? localStorage : sessionStorage;

  storage.setItem('token', token);
  storage.setItem('user', JSON.stringify(userData));

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  auth.token = token;
  auth.user = userData;
  auth.isLoggedIn = true;
}

export function logoutUser() {
  removeFromStorages('token');
  removeFromStorages('user');

  delete axios.defaults.headers.common['Authorization'];
  auth.isLoggedIn = false;
  auth.user = null;
  auth.token = null;
}

export async function fetchUserProfile() {
  try {
    const response = await axios.get('http://localhost:5000/api/user/profile');
    auth.user = response.data;

    // Update only where the token exists
    if (localStorage.getItem('token')) {
      localStorage.setItem('user', JSON.stringify(response.data));
    } else if (sessionStorage.getItem('token')) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('❌ Fetch profile error:', error);
    if (error.response?.status === 401) {
      logoutUser();
    }
  }
}
