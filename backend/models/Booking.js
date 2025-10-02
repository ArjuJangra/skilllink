const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  service: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  price: { type: Number, required: false, default: 100 },
  paymentMethod: { type: String, default: "Cash" },
  paymentStatus: { type: String, default: "pending" },
  bookingId: { type: String, required: true },
  upiScreenshot: { type: String, default: null },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Accepted', 'Completed', 'Rejected', 'Cancelled'],
    default: 'Pending'
  },
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);
