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
    try {
      const response = await API.get('/bookings/history');
      // Add hoverRating property for star hover effect per card
      history.value = response.data.map(h => ({ ...h, hoverRating: 0 }));
    } catch {
      toast.error("Failed to load history");
    }
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

 const submitReview = async (item, currentUser) => {
  // Validate rating
  if (!item.userRating) {
    toast.error("Select a rating first");
    return;
  }

  // Prevent double submission
  if (item.isSubmitting) return;

  item.isSubmitting = true;

  try {
    // Prepare payload for /api/reviews
    const payload = {
      userId: currentUser.id,      // Logged-in user ID
      bookingId: item.id,           // Booking being reviewed
      rating: item.userRating,
      reviewText: item.userReview || ""
    };

    // Call the Review API
    await API.post("/reviews", payload);

    // Update local history array
    const idx = history.value.findIndex(h => h.id === item.id);
    if (idx !== -1) {
      history.value[idx] = { 
        ...history.value[idx], 
        rating: item.userRating, 
        review: item.userReview 
      };
    }

    toast.success("Review submitted successfully!");
    
    // Emit socket event if needed
    socket.value?.emit("newReview", {
      providerId: item.provider?._id,
      bookingId: item.id,
      rating: item.userRating,
      review: item.userReview
    });

  } catch (err) {
    console.error("Review submission error:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to submit review");
  } finally {
    item.isSubmitting = false;
  }
};


  return { bookings, history, fetchBookings, fetchHistory, moveToHistory, deleteBooking, submitReview };
};
