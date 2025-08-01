const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const ServiceProvider = require('../models/ServiceProvider');
const authenticateToken = require('../middleware/authMiddleware');
const { getNearbyServices } = require('../controllers/serviceController'); 

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load services' });
  }
});

// GET service provider locations
router.get('/locations', authenticateToken, async (req, res) => {
  try {
    const providers = await ServiceProvider.find({}, 'name category latitude longitude');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching service locations' });
  }
});

// POST: Find nearby services using geo location
router.post('/nearby', getNearbyServices); // New route added here

module.exports = router;
