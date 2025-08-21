import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import './assets/main.css';
import './assets/tailwind.css';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import '@fortawesome/fontawesome-free/css/all.css';
import { initAuth } from './stores/auth';
AOS.init();

const app = createApp(App);

app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right',
});


initAuth().finally(() => {
  app.mount('#app');
});
