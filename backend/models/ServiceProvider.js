const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  contact: String,
  profilePic: { type: String, default: '' },
  role: {
    type: String,
    enum: ['user', 'provider'],
    default: 'provider'
  },
}, {
  collection: 'serviceproviders', // explicit collection name
  timestamps: true
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
