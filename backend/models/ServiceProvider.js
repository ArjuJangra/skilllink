const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  contact: { type: String },
  profilePic: { type: String, default: '' },
  role: {
    type: String,
    enum: ['user', 'provider'],
    default: 'provider'
  },

  // ✅ Keep only one area
  area: { type: String, required: true },

  privacySettings: {
    showEmail: { type: Boolean, default: false },
    showPhone: { type: Boolean, default: false }
  },

  services: {
    type: [String],
    required: true,
    validate: {
      validator: function (val) {
        return val.length > 0 && val.length <= 3; // ✅ must have at least 1 service
      },
      message: 'You must select between 1 and 3 services.'
    }
  },

  experience: { type: Number, default: 0 },

  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
}, {
  collection: 'serviceproviders', // explicit collection name
  timestamps: true
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
