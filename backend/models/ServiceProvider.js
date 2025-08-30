const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  contact: { type: String },
  profilePic: { type: String, default: '' },
  role: { type: String, enum: ['user', 'provider'], default: 'provider' },
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
        return val.length > 0 && val.length <= 3;
      },
      message: 'You must select between 1 and 3 services.'
    }
  },
  language: { type: String, default: "English" },
  experience: { type: Number, default: 0 },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
}, {
  collection: 'serviceproviders',
  timestamps: true
});

// 🔑 Method to compare password
serviceProviderSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
