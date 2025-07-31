const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  bio: String,
  notifications: {
    system: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true }
  },
  profilePic: {
    type: String,
    default: 'user.png'
  },
  role: {
    type: String,
    enum: ['user', 'provider', 'admin'],
    default: 'user'
  },
  services: { type: [String] },
  experience: { type: Number },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
}, {
  collection: 'users',
 timestamps: true 
});

module.exports = mongoose.model('User', userSchema);

