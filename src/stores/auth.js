import { reactive } from 'vue';

export const auth = reactive({
  isLoggedIn: false,
  user: {
    name: '',
    avatar: '', // This will be the path to user's profile image
  },
});
