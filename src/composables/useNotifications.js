// /src/composables/useNotifications.js
import { reactive, ref } from 'vue';
import API from '@/api';
import { toast } from 'vue3-toastify';

export const useNotifications = () => {
  const notificationSettings = reactive({ email: true, sms: false, push: true });
  const isSaving = ref(false);

  const fetchNotificationSettings = async () => {
    try { Object.assign(notificationSettings, (await API.get('/user/notifications')).data); } 
    catch { toast.error("Failed to load notifications"); }
  };

  const updateNotificationSettings = async () => {
    isSaving.value = true;
    try { 
      const { data } = await API.put('/user/notifications', notificationSettings); 
      toast.success(data.message || "Preferences updated"); 
    } catch { toast.error("Failed to update notifications"); } 
    finally { isSaving.value = false; }
  };

  return { notificationSettings, isSaving, fetchNotificationSettings, updateNotificationSettings };
};
