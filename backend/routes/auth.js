const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// SIGNUP
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: { name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Login

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('➡️ Login attempt:', email);

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ error: 'User not found' });
    }

    // 2. Compare password
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

   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

res.status(200).json({
  message: 'Login successful',
  token,  // ✅ include this
  user: {
    name: user.name,
    email: user.email,
    role: user.role,
    services: user.services,
    experience: user.experience,
    address: user.address,
  },
});


  } catch (err) {
    console.error('❌ Login error:', err.message); // <-- IMPORTANT
    res.status(500).json({ error: 'Login failed. Try again later' });
  }
});
module.exports = router;
