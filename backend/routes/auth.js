const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authMiddleware');

// ---------------------- SIGNUP ----------------------
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password, role, services, experience, address, latitude, longitude } = req.body;

    // Basic validation
    if (!name || !password || !role) {
      return res.status(400).json({ message: 'Name, password, and role are required.' });
    }

    if (!email && !phone) {
      return res.status(400).json({ message: 'Either email or phone is required.' });
    }

    const normalizedEmail = email ? email.trim().toLowerCase() : null;
    const normalizedPhone = phone ? phone.trim() : null;

    // Build query for checking duplicates safely (ignore empty strings)
    const queryConditions = [];
    if (normalizedEmail) queryConditions.push({ email: normalizedEmail });
    if (normalizedPhone) queryConditions.push({ phone: normalizedPhone });

    let existingUser = null;
    let existingProvider = null;

    if (queryConditions.length > 0) {
      const safeConditions = queryConditions.filter(cond => {
        const value = Object.values(cond)[0];
        return value !== undefined && value !== null && value !== '';
      });

      if (safeConditions.length > 0) {
        existingUser = await User.findOne({ $or: safeConditions });
        existingProvider = await ServiceProvider.findOne({ $or: safeConditions });
      }
    }

    if (existingUser || existingProvider) {
      return res.status(409).json({ message: 'Email or phone already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newAccount;

    if (role === 'provider') {
      // Provider-specific validation
      if (!services || !Array.isArray(services) || services.length === 0 ||
          !experience || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All provider fields are required.' });
      }

      newAccount = new ServiceProvider({
        name,
        email: normalizedEmail,
        phone: normalizedPhone,
        password: hashedPassword,
        role: 'provider',
        services,
        experience,
        address,
        latitude,
        longitude
      });

    } else {
      // Regular user
      newAccount = new User({
        name,
        email: normalizedEmail,
        phone: normalizedPhone,
        password: hashedPassword,
        role: 'user'
      });
    }

    await newAccount.save();

    // Generate JWT token
    const token = jwt.sign({ id: newAccount._id, role: newAccount.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: {
        _id: newAccount._id,
        name: newAccount.name,
        email: newAccount.email,
        phone: newAccount.phone,
        role: newAccount.role,
        services: newAccount.services || [],
        experience: newAccount.experience || 0,
        address: newAccount.address || ''
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
    const { contact, password, role } = req.body; // contact can be email or phone

    if (!contact || !password || !role) {
      return res.status(400).json({ message: 'Contact (email/phone), password, and role are required.' });
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

    if (!account) {
      return res.status(401).json({ message: 'Invalid email/phone or password' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email/phone or password' });
    }

    const token = jwt.sign({ id: account._id, role: account.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: account._id,
        name: account.name,
        email: account.email,
        phone: account.phone,
        role: account.role,
        services: account.services || [],
        experience: account.experience || 0,
        address: account.address || '',
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed. Try again later', error: err.message });
  }
});

router.get('/check', authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
