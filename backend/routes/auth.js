const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateUser = require('../middleware/authMiddleware');

// SIGNUP POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role, services, experience, address } = req.body;

  try {
    // 1. Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 2. Basic required fields check
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 3. If provider, ensure provider-specific fields are present
    if (role === 'provider') {
      if (!services || services.length === 0 || !experience || !address) {
        return res.status(400).json({ message: 'All provider fields are required' });
      }
    }
    
    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      ...(role === 'provider' && {
        services,
        experience,
        address
      })
    });

    await newUser.save();

    // 6. Sign JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        services: newUser.services,
        experience: newUser.experience,
        address: newUser.address
      }
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// LOGIN POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log('➡️ Login attempt:', email, '| Role:', role);

    let user;

    // Check role and query appropriate model
    if (role === 'provider') {
      user = await ServiceProvider.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password');
      return res.status(401).json({ error: 'Invalid password' });
    }

    console.log('✅ Password matched');

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET missing in .env');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        services: user.services,
        experience: user.experience,
        address: user.address,
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed. Try again later' });
  }
});

router.get('/check', authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

