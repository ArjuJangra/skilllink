// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Booking route works!' });
});

module.exports = router;
