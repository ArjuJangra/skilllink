// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const generateToken = require('../utils/generateToken');

// Signup Controller (for User only)
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
    });

    const token = generateToken(user._id, 'user');

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'user',
        profilePic: user.profilePic || null,
      },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('➡️ Login attempt:\n', email);

    let user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    console.log(user ? '✅ Found in User' : '❌ Not in User');

    let role = 'user';

    if (!user) {
      console.log('🔍 Checking in ServiceProvider collection...');
      const testQuery = { email: { $regex: new RegExp(`^${email}$`, 'i') } };
      console.log('🔎 Query:', testQuery);

      user = await ServiceProvider.findOne(testQuery);
      console.log(user ? '✅ Found in ServiceProvider' : '❌ Not in ServiceProvider');

      if (user) {
        console.log('🧾 Found user:', {
          name: user.name,
          email: user.email,
          id: user._id,
        });
      }

      role = 'provider';
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id, role);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
        profilePic: user.profilePic || null,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


