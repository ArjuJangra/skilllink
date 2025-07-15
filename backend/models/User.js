const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'provider'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  services: { type: [String], default: [] },
  experience: { type: Number },
  address: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
