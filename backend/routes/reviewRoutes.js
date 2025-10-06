import express from "express";
import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
const router = express.Router();

// POST /api/reviews
router.post("/", async (req, res) => {
  try {
    const { userId, bookingId, rating, reviewText } = req.body;

    // ✅ Check if booking exists and belongs to this user
    const booking = await Booking.findOne({ _id: bookingId, user: userId, status: "Completed" });
    if (!booking) {
      return res.status(403).json({ message: "You can only review completed services you booked." });
    }

    // ✅ Save Review
    const review = new Review({
      user: userId,
      service: booking._id,
      rating,
      reviewText
    });

    await review.save();

    res.status(201).json({ message: "Review submitted successfully", review });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting review" });
  }
});

export default router;
