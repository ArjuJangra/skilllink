// src/stores/auth.js
import { reactive } from 'vue'

export const auth = reactive({
  isLoggedIn: !!localStorage.getItem('token'),
  user: null,
})


export function loginUser(token, userData) {
  localStorage.setItem('token', token);
  auth.isLoggedIn = true;
  auth.user = userData;
}


export function logoutUser() {
  localStorage.removeItem('token')
  auth.isLoggedIn = false
  auth.user = null
}



