// src/stores/auth.js
import { reactive } from 'vue';

export const auth = reactive({
  isLoggedIn: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
});

export function loginUser(token, userData) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  auth.isLoggedIn = true;
  auth.user = userData;
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  auth.isLoggedIn = false;
  auth.user = null;
}


