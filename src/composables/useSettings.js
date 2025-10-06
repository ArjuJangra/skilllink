// /src/composables/useSettings.js
import { reactive, ref } from 'vue';
import API from '@/api';
import { toast } from 'vue3-toastify';

export const useSettings = () => {
  // Password
  const passwordForm = reactive({ current: '', new: '', confirm: '' });
  const showPasswordForm = ref(false);
  const isChangingPassword = ref(false);

  const changePassword = async () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm)
      return toast.error("All fields required");
    if (passwordForm.new !== passwordForm.confirm)
      return toast.error("Passwords do not match");

    isChangingPassword.value = true;
    try {
      const { data } = await API.post('/user/change-password', {
        currentPassword: passwordForm.current,
        newPassword: passwordForm.new
      });
      toast.success(data.message || "Password updated!");
      showPasswordForm.value = false;
      Object.assign(passwordForm, { current: '', new: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error changing password");
    } finally {
      isChangingPassword.value = false;
    }
  };

  return { passwordForm, showPasswordForm, isChangingPassword, changePassword };
};
