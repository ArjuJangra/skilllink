const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../middleware/upload');

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

router.post('/upload-profile-picture', authenticateUser, upload.single('profile'), async (req, res) => {
  try {
    console.log("🟨 req.user: ", req.user);        // debug auth
    console.log("🟨 req.file: ", req.file);        // debug multer

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user._id;
    const filename = req.file.filename;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: filename },
      { new: true }
    );

    return res.json({ message: 'Profile picture updated', profilePic: filename });
  } catch (err) {
    console.error("🔴 Upload Error:", err);
    return res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});



module.exports = router;

