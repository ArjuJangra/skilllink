const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
  signup,
  login,
  getUserProfile,
  changePassword,
  updateUserProfile,
  getNotificationSettings,
  updateNotifications
} = require('../controllers/userController');

const authenticateUser = require('../middleware/authMiddleware');

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);

// Protected Routes
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);
router.post('/change-password', authenticateUser, changePassword);
router.put('/profile', authenticateUser, updateUserProfile);


router.get('/notifications', authenticateUser, getNotificationSettings);
router.put('/notifications', authenticateUser, updateNotifications);


module.exports = router;

