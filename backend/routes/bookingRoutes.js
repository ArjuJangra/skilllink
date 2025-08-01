const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authenticateUser = require('../middleware/authMiddleware');
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider'); 

router.get('/test', (req, res) => {
  res.send('✅ Booking route is working');
});
 
// GET /api/bookings
router.get('/', authenticateUser, async (req, res) => {
    res.send('Booking route working!');
  try {
   const bookings = await Booking.find({ userId: req.user.id, status: { $ne: 'Completed' } }).sort({ createdAt: -1 });

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

    const { service, name, contact, address, providerId } = req.body;

   

// Get user details including pincode
const user = await User.findById(req.user.id);
if (!user) return res.status(404).json({ message: 'User not found' });

console.log('🔍 Searching provider with ID and service:', providerId, service);
// If providerId is provided, use that
let assignedProvider;

if (providerId) {
 assignedProvider = await ServiceProvider.findOne({
  _id: providerId,
  services: { $in: [service] }
});

  if (!assignedProvider) {
    return res.status(404).json({ message: 'Selected provider is not available for this service' });
  }
} else {
  // Fallback: randomly assign a provider
  const matchingProviders = await ServiceProvider.find({
  services: { $in: [service] },
  pincode: user.pincode
});


  if (matchingProviders.length === 0) {
    return res.status(404).json({ message: 'No service providers available in your area for this service' });
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
    });
      const savedBooking = await booking.save();
    console.log('✅ Booking saved:', savedBooking);

    res.status(201).json({ message: 'Booking confirmed', booking: savedBooking });
  } catch (err) {
     console.error('❌ Booking error:', err);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

router.put('/mark-completed/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'Completed';
    await booking.save();

    res.json({ message: 'Booking marked as completed', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Failed to update booking status' });
  }
});


// DELETE a booking
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure user is the owner
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

// GET /api/bookings/history
router.get('/history', authenticateUser, async (req, res) => {
  try {
    const completed = await Booking.find({ userId: req.user.id, status: 'Completed' });
    const formatted = completed.map(b => ({
      service: b.service,
      date: b.updatedAt.toISOString().split('T')[0],
      status: b.status
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

// GET /api/bookings/provider-orders
router.get('/provider-orders', authenticateUser, async (req, res) => {
  try {
    // Only allow access if the user is a provider
    if (req.user.role !== 'provider') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orders = await Booking.find({ providerId: req.user.id }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch provider orders', error: err.message });
  }
});


module.exports = router;
