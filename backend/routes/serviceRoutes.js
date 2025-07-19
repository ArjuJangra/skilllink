const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const ServiceProvider = require('../models/ServiceProvider'); // ADD THIS
const authenticateToken = require('../middleware/authMiddleware'); // ADD THIS

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load services' });
  }
});

// ADD THIS: GET service provider locations
router.get('/locations', authenticateToken, async (req, res) => {
  try {
    const providers = await ServiceProvider.find({}, 'name category latitude longitude');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching service locations' });
  }
});

module.exports = router;
