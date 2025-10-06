// /src/composables/useUser.js
import { ref, reactive } from 'vue';
import API from '@/api';
import { toast } from 'vue3-toastify';

export const useUser = () => {
  const user = ref({ name: '', email: '', phone: '', bio: '', profilePic: '' });
  const editForm = reactive({ name: '', email: '', phone: '' });
  const previewImage = ref(null);

  const getUserProfile = async () => {
    try {
      const { data } = await API.get('/user/profile');
      user.value = data;
      localStorage.setItem("user", JSON.stringify(data));
    } catch {
      toast.error("Failed to load user data");
    }
  };

  const updateUserProfile = async () => {
    if (!editForm.name || !editForm.email) return toast.error("Name and email required");
    try {
      const { data } = await API.put("/user/profile", editForm);
      Object.assign(user.value, editForm);
      toast.success(data.message || "Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleProfileImageChange = async (e) => {
    const f = e.target.files[0];
    if (!f?.type.startsWith('image/')) return toast.error("Please select an image.");

    previewImage.value = URL.createObjectURL(f);
    const fd = new FormData();
    fd.append('profilePic', f);

    try {
      const { data } = await API.put('/user/profile/picture', fd);
      const pic = `${data.profilePic}?t=${Date.now()}`;
      user.value.profilePic = pic;

      const stored = JSON.parse(localStorage.getItem("user")) || {};
      stored.profilePic = pic;
      localStorage.setItem("user", JSON.stringify(stored));

      toast.success("Profile picture updated!");
    } catch {
      toast.error("Failed to upload profile picture.");
    }
  };

  return { user, editForm, previewImage, getUserProfile, updateUserProfile, handleProfileImageChange };
};
