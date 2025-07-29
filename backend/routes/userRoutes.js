const express = require('express');
const router = express.Router();
const { uploadUserPic } = require('../middleware/upload'); // ✅ Correct import
const User = require('../models/User');
const authenticateUser = require('../middleware/authMiddleware');

const {
  signup,
  login
} = require('../controllers/authController');

const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  updateProfilePicture
} = require('../controllers/profileController');

const {
  getNotificationSettings,
  updateNotifications
} = require('../controllers/settingController');

// ---------- Auth Routes ----------
router.post('/signup', signup);
router.post('/login', login);

// ---------- Protected Routes ----------
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);
router.post('/change-password', authenticateUser, changePassword);

// Use correct middleware for user profile picture
router.put(
  '/profile/picture',
  authenticateUser,
  uploadUserPic.single('profile'),
  updateProfilePicture
);

// ---------- Notification Settings ----------
router.get('/notifications', authenticateUser, getNotificationSettings);
router.put('/notifications', authenticateUser, updateNotifications);

module.exports = router;
