const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
   status: {
    type: String,
    default: 'Confirmed', // or 'Pending'
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled']
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

