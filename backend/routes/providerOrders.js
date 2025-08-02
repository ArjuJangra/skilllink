const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authenticateUser = require('../middleware/authMiddleware');


// GET all orders assigned to this provider
router.get('/', authenticateUser, async (req, res) => {
  try {
    const orders = await Booking.find({ providerId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch provider orders' });
  }
});

// PUT update order status (accept/reject/complete)

router.put('/:id/status', authenticateUser, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Accepted', 'Rejected', 'Completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const order = await Booking.findById(req.params.id).populate('userId providerId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
console.log('🔐 Authenticated Provider ID:', req.user.id);
console.log('📦 Order Provider ID:', order.providerId?.toString());

    if (order.providerId?._id?.toString() !== req.user.id)
 {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    await order.save();

    //  Emit real-time update if accepted
 if (status === 'Accepted') {
  global.io.to(order.userId._id.toString()).emit('orderAccepted', {
    providerName: order.providerId?.name || 'Provider',
    bookingId: order._id
  });
} else if (status === 'Rejected') {
  global.io.to(order.userId._id.toString()).emit('orderRejected', {
    providerName: order.providerId?.name || 'Provider',
    bookingId: order._id
  });
}

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating order status' });
  }
});




module.exports = router;
