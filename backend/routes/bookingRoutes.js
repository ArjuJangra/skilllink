const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authenticateUser = require('../middleware/authMiddleware');

// GET /api/bookings
router.get('/', authenticateUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
});


// POST /api/bookings
router.post('/', authenticateUser, async (req, res) => {
  try {
   console.log('➡️ Booking request received:', req.body);
    console.log('🔐 Authenticated User:', req.user);

    const { service, name, contact, address } = req.body;
    const booking = new Booking({
      userId: req.user.id,
      service,
      name,
      contact,
      address,
    });
      const savedBooking = await booking.save();
    console.log('✅ Booking saved:', savedBooking);

    res.status(201).json({ message: 'Booking confirmed', booking: savedBooking });
  } catch (err) {
     console.error('❌ Booking error:', err);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

module.exports = router;
