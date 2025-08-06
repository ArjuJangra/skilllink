const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // make sure this path is correct

const { uploadProviderPic } = require('../middleware/upload');
 
const authMiddleware = require('../middleware/authMiddleware');

const {
  providerSignup,
  providerLogin,
  updateProviderProfile, 
   getProviderProfile ,
} = require('../controllers/providerProfileController');

// Provider signup
router.post('/signup', providerSignup);

// Provider login
router.post('/login', providerLogin);

router.put('/profile/update/:id', uploadProviderPic.single('profilePic'), updateProviderProfile);
router.get('/profile', authMiddleware, getProviderProfile);

// Get providers by service (and area)
router.post('/by-service', async (req, res) => {
  const { serviceTitle, userArea } = req.body;

  if (!serviceTitle) {
    return res.status(400).json({ message: 'Service title is required' });
  }

  const query = { services: serviceTitle };
  if (userArea) query.area = userArea;

  try {
    const ServiceProvider = require('../models/ServiceProvider');
    const providers = await ServiceProvider.find(query).select('-password');
    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/orders/count', authMiddleware, async (req, res) => {
  try {
    const providerId = req.user._id;
    console.log("👤 Provider ID from token:", providerId.toString());

    // ✅ Fetch using correct field name
    const bookings = await Booking.find({ providerId });
    console.log("📦 Bookings found:", bookings);

    const count = await Booking.countDocuments({
      providerId,
      status: 'Pending',
    });

    console.log("✅ Order Count:", count);
    res.json({ count });
  } catch (error) {
    console.error('❌ Error in /orders/count:', error);
    res.status(500).json({ message: 'Failed to get order count' });
  }
});


module.exports = router;

