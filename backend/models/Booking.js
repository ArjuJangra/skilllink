const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true
  },

  service: { type: String, required: true },
  name: { type: String, required: true },       // Customer name
  contact: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },                // Problem description
  date: { type: Date },                         // Preferred service date

  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Accepted', 'Completed', 'Rejected', 'Cancelled'],
    default: 'Pending'
  },
   price: {
    type: Number,
    required: false,  
    default: 100
  }

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

