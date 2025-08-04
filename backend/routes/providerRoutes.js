const express = require('express');
const router = express.Router();
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


module.exports = router;

