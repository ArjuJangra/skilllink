const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Profile
exports.updateUserProfile = async (req, res) => {
  try {
  const { name, phone, bio, city, pincode } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, bio, city, pincode },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
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

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({
      message: 'Profile picture updated',
      profilePic: filename
    });
  } catch (err) {
    console.error("🔴 Upload Error:", err);
    return res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password Change Error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
