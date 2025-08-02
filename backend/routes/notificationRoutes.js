// in routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authenticateUser = require('../middleware/authMiddleware');

// GET /api/notifications
router.get('/', authenticateUser, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

module.exports = router;
