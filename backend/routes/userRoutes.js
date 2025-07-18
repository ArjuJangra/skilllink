// routes/userRoutes.js
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const { signup, login, getUserProfile, changePassword } = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateUser, getUserProfile);
router.post('/change-password', authenticateUser, changePassword);

// Test route
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
