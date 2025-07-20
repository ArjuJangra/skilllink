const User = require('../models/User');

// Get Notification Settings
exports.getNotificationSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('notifications');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json(user.notifications);
  } catch (error) {
    console.error('Get Notifications Error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Notification Settings
exports.updateNotifications = async (req, res) => {
  const { email, sms, push } = req.body;

  if (
    typeof email !== 'boolean' ||
    typeof sms !== 'boolean' ||
    typeof push !== 'boolean'
  ) {
    return res.status(400).json({ message: 'Invalid notification values' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { notifications: { email, sms, push } },
      { new: true }
    ).select('notifications');

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({
      message: 'Notification settings updated successfully.',
      notifications: user.notifications,
    });
  } catch (error) {
    console.error('Update Notifications Error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
