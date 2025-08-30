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
    const { name, email, password, role, services, experience, address, latitude, longitude } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists in User or ServiceProvider
    const existingUser = await User.findOne({ email: normalizedEmail });
    const existingProvider = await ServiceProvider.findOne({ email: normalizedEmail });

    if (existingUser || existingProvider) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newAccount;
    if (role === 'provider') {
      // Validate provider-specific fields
      if (!services || !Array.isArray(services) || services.length === 0 || !experience || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All provider fields are required.' });
      }

      newAccount = new ServiceProvider({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: 'provider',
        services,
        experience,
        address,
        latitude,
        longitude,
      });

    } else {
      newAccount = new User({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: 'user',
      });
    }

    await newAccount.save();

    const token = jwt.sign({ id: newAccount._id, role: newAccount.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: {
        _id: newAccount._id,
        name: newAccount.name,
        email: newAccount.email,
        role: newAccount.role,
        services: newAccount.services || [],
        experience: newAccount.experience || 0,
        address: newAccount.address || '',
      },
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ---------------------- LOGIN ----------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let account;

    if (role === 'provider') {
      account = await ServiceProvider.findOne({ email: normalizedEmail });
    } else {
      account = await User.findOne({ email: normalizedEmail });
    }

    console.log('🔹 Attempting login with:', { email: normalizedEmail, role });
    console.log('🔹 Account found:', account);

    if (!account) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    console.log('🔹 Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: account._id, role: account.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: account._id,
        name: account.name,
        email: account.email,
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

