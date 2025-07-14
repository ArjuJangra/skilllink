import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 👈 import the router
import './assets/main.css';

const app = createApp(App);
app.use(router); // 👈 use the router
app.mount('#app');
