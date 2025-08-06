//  routes/notificationRoutes.js
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

// PATCH /api/notifications/:id/read
router.patch('/:id/read', authenticateUser, async (req, res) => {
  try {
    const notificationId = req.params.id;

    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      { $set: { read: true } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('❌ Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/notifications/:id
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const deleted = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // ensure only the owner can delete
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Notification not found or unauthorized' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/notifications/unread-count
router.get('/unread-count', authenticateUser, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user.id,
      read: false
    });
    res.json({ count });
  } catch (err) {
    console.error('❌ Error fetching unread count:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/notifications/mark-all-read
router.patch('/mark-all-read', authenticateUser, async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('❌ Error marking all as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
