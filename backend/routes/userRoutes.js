const express = require('express');
const router = express.Router();
const { uploadUserPic } = require('../middleware/upload'); 
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
} = require('../controllers/userProfileController');

const {
  getNotificationSettings,
  updateNotifications
} = require('../controllers/settingController');

// ---------- Auth Routes ----------
router.post('/signup', signup);
router.post('/login', login);

// ---------- Protected User Routes ----------
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);
router.put('/change-password', authenticateUser, changePassword);

// ---------- Profile Picture Upload ----------
router.put(
  '/profile/picture',
  authenticateUser,
  uploadUserPic.single('profilePic'), // ✅ updated field name
  updateProfilePicture
);

// ---------- Notification Settings ----------
router.get('/notifications', authenticateUser, getNotificationSettings);
router.put('/notifications', authenticateUser, updateNotifications);

module.exports = router;
