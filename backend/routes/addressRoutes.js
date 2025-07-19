// routes/addressRoutes.js
const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const authMiddleware = require('../middleware/authMiddleware');



// GET /api/address
router.get('/', authMiddleware, async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch addresses.' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newAddress = new Address({
      userId: req.user.id,
      ...req.body
    });
    await newAddress.save();
    res.status(201).json({ message: 'Address saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save address.' });
  }
});

module.exports = router;
