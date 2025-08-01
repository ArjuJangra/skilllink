// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  imageUrl: String,

  // GeoJSON location
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },

  // Optional: reference to provider who offers this service
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
  },
}, { timestamps: true });

// Add geospatial index
serviceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Service', serviceSchema);
