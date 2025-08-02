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
  services: {
    type: [String],
    required: true,
    validate: {
      validator: function (val) {
        return val.length <= 3;
      },
      message: 'You can select up to 3 services only.'
    }
  },
  experience: {
    type: Number,
    default: 0
  },
  area: {
  type: String,
  required: true
},
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
}, {
  collection: 'serviceproviders', // explicit collection name
  timestamps: true
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
