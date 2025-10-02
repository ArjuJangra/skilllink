const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Booking = require('../models/Booking');
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const authenticateUser = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sendEmail = require('../utils/mailer');
//  Test route
router.get('/test', (req, res) => res.send('✅ Booking route is working'));

// GET active bookings
router.get('/', authenticateUser, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
      status: { $ne: 'Completed' },
    })
      .sort({ createdAt: -1 })
      .populate('providerId', '-password -__v');

    const formattedBookings = bookings.map(b => {
      const booking = b.toObject();
      booking.provider = booking.providerId || null; // rename for frontend
      delete booking.providerId;
      return booking;
    });

    res.json(formattedBookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
});

// POST create booking
router.post(
  '/',
  authenticateUser,
  upload.single('upiScreenshot'),
  [
    body('service').notEmpty().withMessage('Service is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('contact').notEmpty().withMessage('Contact is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('bookingId').notEmpty().withMessage('Booking ID is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const {
        service, name, contact, address, providerId, price,
        paymentMethod, bookingId, date, time
      } = req.body;

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Assign provider
      let assignedProvider;
      if (providerId) {
        assignedProvider = await ServiceProvider.findOne({
          _id: providerId,
          services: { $in: [service] },
        });
        if (!assignedProvider) return res.status(404).json({ message: 'Provider not available' });
      } else {
        const matchingProviders = await ServiceProvider.find({
          services: { $in: [service] },
          pincode: user.pincode,
        });
        if (!matchingProviders.length)
          return res.status(404).json({ message: 'No providers in your area' });
        assignedProvider = matchingProviders[Math.floor(Math.random() * matchingProviders.length)];
      }

      // Create booking (always pending until verified)
      const booking = new Booking({
        userId: req.user.id,
        providerId: assignedProvider._id,
        service,
        name,
        contact,
        address,
        price: price && price > 0 ? price : 100,
        paymentMethod: paymentMethod || 'Cash',
        paymentStatus: 'pending',
        bookingId,
        upiScreenshot: req.file?.path || null,
        date,
        time
      });

      const savedBooking = await booking.save();
      await savedBooking.populate('providerId', '-password -__v');

      // === SEND EMAIL TO ADMIN ===
      try {
        await sendEmail({
          to: 'connectteamskilllink@gmail.com', // admin email
          subject: `New Booking - ${bookingId}`,
          text: `A new booking has been confirmed.\n
User: ${name}\n
Service: ${service}\n
Amount: ₹${price}\n
Payment Method: ${paymentMethod}\n
Booking ID: ${bookingId}\n
Date: ${date} ${time}\n
Please verify the payment.`,
          attachments: req.file ? [{ filename: req.file.originalname, path: req.file.path }] : []
        });
        console.log('✅ Admin notified by email');
      } catch (err) {
        console.error('❌ Failed to send email', err);
      }

      res.status(201).json({ message: 'Booking confirmed', booking: savedBooking });
    } catch (err) {
      console.error('❌ Booking error:', err);
      res.status(500).json({ message: 'Booking failed', error: err.message });
    }
  }
);

// PUT mark booking completed
router.put('/mark-completed/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'Completed';
    await booking.save();

    res.json({ message: 'Booking marked as completed', booking });
  } catch (err) {
    console.error('Error updating booking status:', err);
    res.status(500).json({ message: 'Failed to update booking status', error: err.message });
  }
});

router.delete('/clearhistory', authenticateUser, async (req, res) => {
  try {
    console.log("👉 clearhistory user:", req.user);

    await Booking.deleteMany({
      userId: req.user._id,
      status: { $in: ['Completed', 'Rejected'] }
    });

    res.json({ message: 'History cleared successfully' });
  } catch (err) {
    console.error('Error clearing history:', err);
    res.status(500).json({ message: 'Failed to clear history', error: err.message });
  }
});

// DELETE booking with ownership check
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const bookingId = req.params.id;

    if (!bookingId.match(/^[0-9a-fA-F]{24}$/)) {
      // Validate ObjectId format
      return res.status(400).json({ message: 'Invalid booking ID' });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure user owns the booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }

    await Booking.deleteOne({ _id: bookingId });

    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(`Error deleting booking [ID: ${req.params.id}]:`, err);
    res.status(500).json({ message: 'Server error while deleting booking', error: err.message });
  }
});

// PUT update booking (restricted fields)
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const allowedFields = ['name', 'contact', 'address', 'price'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) booking[field] = req.body[field];
    });

    const updated = await booking.save();
    res.json({ message: 'Booking updated successfully', booking: updated });
  } catch (err) {
    console.error('Error updating booking:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

// GET booking history
router.get('/history', authenticateUser, async (req, res) => {
  try {
    const historyBookings = await Booking.find({
      userId: req.user.id,
      status: { $in: ['Completed', 'Rejected'] },
    }).sort({ updatedAt: -1 });

    const formatted = historyBookings.map(b => ({
      id: b._id,
      service: b.service,
      date: b.updatedAt.toISOString().split('T')[0],
      status: b.status,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching booking history:', err);
    res.status(500).json({ message: 'Failed to fetch history', error: err.message });
  }
});

module.exports = router;
