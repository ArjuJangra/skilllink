const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Booking = require('../models/Booking');
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const authenticateUser = require('../middleware/authMiddleware');

// ✅ Test route
router.get('/test', (req, res) => res.send('✅ Booking route is working'));

// GET active bookings
router.get('/', authenticateUser, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
      status: { $ne: 'Completed' },
    }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
});

// POST create booking
router.post(
  '/',
  authenticateUser,
  [
    body('service').notEmpty().withMessage('Service is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('contact').notEmpty().withMessage('Contact is required'),
    body('address').notEmpty().withMessage('Address is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { service, name, contact, address, providerId, price } = req.body;

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      let assignedProvider;

      if (providerId) {
        assignedProvider = await ServiceProvider.findOne({
          _id: providerId,
          services: { $in: [service] },
        });

        if (!assignedProvider) {
          return res.status(404).json({ message: 'Selected provider is not available for this service' });
        }
      } else {
        const matchingProviders = await ServiceProvider.find({
          services: { $in: [service] },
          pincode: user.pincode,
        });

        if (!matchingProviders.length) {
          return res.status(404).json({ message: 'No providers available in your area for this service' });
        }

        assignedProvider = matchingProviders[Math.floor(Math.random() * matchingProviders.length)];
      }

      const booking = new Booking({
        userId: req.user.id,
        providerId: assignedProvider._id,
        service,
        name,
        contact,
        address,
        price: price && price > 0 ? price : 100,
      });

      const savedBooking = await booking.save();
      console.log('✅ Booking saved:', savedBooking);

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

// DELETE booking with ownership check
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await booking.remove();
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
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

// GET provider orders
router.get('/provider-orders', authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== 'provider') return res.status(403).json({ message: 'Access denied' });

    const orders = await Booking.find({ providerId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching provider orders:', err);
    res.status(500).json({ message: 'Failed to fetch provider orders', error: err.message });
  }
});

module.exports = router;
