// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },

type: {
  type: String,
  enum: ['OrderPlaced', 'OrderCancelled', 'OrderCompleted', 'OrderAccepted',   'OrderRejected'],
  required: true,
},

  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
