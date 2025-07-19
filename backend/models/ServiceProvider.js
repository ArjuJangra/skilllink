
const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String }, // or reference Service model
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: String,
  contact: String,
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
