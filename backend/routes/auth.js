const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const authenticateUser = require('../middleware/authMiddleware');

// ---------------------- SIGNUP ----------------------
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !password || !role) {
      return res.status(400).json({ message: 'Name, password, and role are required.' });
    }

    if (!email && !phone) {
      return res.status(400).json({ message: 'Either email or phone is required.' });
    }

    // Normalize
    const normalizedEmail = email ? email.trim().toLowerCase() : undefined;
    const normalizedPhone = phone ? phone.trim() : undefined;

    // Check duplicates safely
    const query = [];
    if (normalizedEmail) query.push({ email: normalizedEmail });
    if (normalizedPhone) query.push({ phone: normalizedPhone });

    if (query.length > 0) {
      const existingUser = await User.findOne({ $or: query });
      if (existingUser) {
        return res.status(409).json({ message: 'Email or phone already registered.' });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      password: hashedPassword,
      role,
      email: normalizedEmail,
      phone: normalizedPhone
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// ---------------------- LOGIN ----------------------
router.post('/login', async (req, res) => {
  try {
    const { contact, password, role } = req.body; // contact = email or phone

    if (!contact || !password || !role) {
      return res.status(400).json({ message: 'Contact, password, and role are required.' });
    }

    const normalizedContact = contact.trim().toLowerCase();

    let account;
    if (role === 'provider') {
      account = await ServiceProvider.findOne({
        $or: [
          { email: normalizedContact },
          { phone: normalizedContact }
        ]
      });
    } else {
      account = await User.findOne({
        $or: [
          { email: normalizedContact },
          { phone: normalizedContact }
        ]
      });
    }

    if (!account) return res.status(401).json({ message: 'Invalid email/phone or password' });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email/phone or password' });

    const token = jwt.sign({ id: account._id, role: account.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: account._id,
        name: account.name,
        email: account.email,
        phone: account.phone,
        role: account.role
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// ---------------------- CHECK AUTH ----------------------
router.get('/check', authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
