import axios from 'axios';
import { reactive } from 'vue';

export const auth = reactive({
  isLoggedIn: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null
});

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
    const response = await axios.get('/api/user/profile');
    auth.user = response.data;
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (error) {
    console.error('❌ Fetch profile error:', error);
  }
}


