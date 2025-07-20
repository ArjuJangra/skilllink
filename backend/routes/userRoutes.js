const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
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

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);

// Protected Routes
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);
router.post('/change-password', authenticateUser, changePassword);

router.put(
  '/profile/picture',
  authenticateUser,
  upload.single('profile'),
  updateProfilePicture
);

router.get('/notifications', authenticateUser, getNotificationSettings);
router.put('/notifications', authenticateUser, updateNotifications);

module.exports = router;

