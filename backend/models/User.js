const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['user', 'provider'],
    default: 'user'
  },
  services: [String],
  experience: String,
  address: String
}, {
  collection: 'users' // 
});

module.exports = mongoose.model('User', userSchema);

