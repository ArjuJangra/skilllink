const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');
const authenticateUser = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// GET all orders assigned to this provider
router.get('/', authenticateUser, async (req, res) => {
  try {
    const orders = await Booking.find({ providerId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch provider orders' });
  }
});

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

    if (order.providerId?._id?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;

    await Notification.create({
      userId: order.userId._id,
      type: status === 'Accepted' ? 'OrderAccepted' : 'OrderRejected',
      message: `Your order has been ${status.toLowerCase()} by ${order.providerId?.name || 'Provider'}`,
    });

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


router.get('/stats', authenticateUser, async (req, res) => {
  try {
    // Fetch all orders for this provider (no need to call ObjectId)
    const orders = await Booking.find({ providerId: req.user.id });

    const completed = orders.filter(order => order.status === 'Completed');
    const earnings = completed.reduce((sum, order) => sum + (Number(order.price) || 0), 0);

    const earningsData = Array(12).fill(0);

    completed.forEach(order => {
      const date = order.createdAt ? new Date(order.createdAt)
                 : order.date ? new Date(order.date)
                 : order.updatedAt ? new Date(order.updatedAt)
                 : null;

      if (date && !isNaN(date.getTime())) {
        const month = date.getMonth();
        earningsData[month] += Number(order.price) || 0;
      }
    });

    res.json({
      total: orders.length,
      completed: completed.length,
      earnings,
      earningsData
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// GET /api/providers/orders/recent
router.get('/recent', authenticateUser, async (req, res) => {
  try {
    const orders = await Booking.find({ providerId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5); // latest 5 orders
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching recent orders:', err);
    res.status(500).json({ message: 'Failed to fetch recent orders' });
  }
});

module.exports = router;
