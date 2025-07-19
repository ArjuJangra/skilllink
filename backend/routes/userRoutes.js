const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
  signup,
  login,
  getUserProfile,
  changePassword
} = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);

// Protected Routes
router.get('/profile', authenticateUser, getUserProfile);
router.post('/change-password', authenticateUser, changePassword);

// Notifications Route
router.get('/notifications', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('notifications');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
const { updateNotifications } = require('../controllers/userController');

router.put('/notifications', authenticateUser, updateNotifications);

module.exports = router;
