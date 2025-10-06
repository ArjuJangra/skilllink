// /src/composables/useBookings.js
import { ref } from 'vue';
import API from '@/api';
import { toast } from 'vue3-toastify';

export const useBookings = (socket) => {
  const bookings = ref([]);
  const history = ref([]);

  const fetchBookings = async () => {
    try { bookings.value = (await API.get('/bookings')).data; } 
    catch { toast.error("Failed to load bookings"); }
  };

  const fetchHistory = async () => {
    try { history.value = (await API.get('/bookings/history')).data; } 
    catch { toast.error("Failed to load history"); }
  };

  const moveToHistory = (b) => {
    history.value.push({ ...b, date: new Date(b.updatedAt).toLocaleDateString() });
    bookings.value = bookings.value.filter(x => x._id !== b._id);
  };

  const deleteBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      bookings.value = bookings.value.filter(b => b._id !== id);
      toast.success('Booking deleted');
    } catch {
      toast.error('Failed to delete booking');
    }
  };

  const submitReview = async (item) => {
    if (!item.userRating) return toast.error("Select rating first");
    item.isSubmitting = true;
    try {
      await API.put(`/bookings/review/${item.id}`, {
        rating: item.userRating,
        review: item.userReview,
        providerId: item.provider?._id
      });
      const idx = history.value.findIndex(h => h.id === item.id);
      if (idx !== -1) history.value[idx] = { ...history.value[idx], rating: item.userRating, review: item.userReview };

      toast.success("Review submitted!");
      socket.value?.emit('newReview', { providerId: item.provider?._id, bookingId: item.id, rating: item.userRating, review: item.userReview });
    } catch {
      toast.error("Failed to submit review");
    } finally { item.isSubmitting = false; }
  };

  return { bookings, history, fetchBookings, fetchHistory, moveToHistory, deleteBooking, submitReview };
};
