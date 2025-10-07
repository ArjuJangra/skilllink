// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const generateToken = require('../utils/generateToken');

// -------------------- SIGNUP --------------------
exports.signup = async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    role,
    services,
    experience,
    address,
    latitude,
    longitude,
    area
  } = req.body;

  try {
    if (!name || !password || !role) {
      return res.status(400).json({ message: 'Name, password, and role are required.' });
    }

    if (!email && !phone) {
      return res.status(400).json({ message: 'Either email or phone is required.' });
    }

    // Check if email or phone already exists
    const existingUser = await User.findOne({
      $or: [{ email: email?.toLowerCase() }, { phone }]
    });

    const existingProvider = await ServiceProvider.findOne({
      $or: [{ email: email?.toLowerCase() }, { phone }]
    });

    if (existingUser || existingProvider) {
      return res.status(409).json({ message: 'Email or phone already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newAccount;

    if (role === 'provider') {
      if (!services || !Array.isArray(services) || services.length === 0 || !experience || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All provider fields are required.' });
      }

      newAccount = new ServiceProvider({
        name,
        email: email?.toLowerCase(),
        phone,
        password: hashedPassword,
        role: 'provider',
        services,
        experience,
        address,
        latitude,
        longitude,
        area
      });
    } else {
      newAccount = new User({
        name,
        email: email?.toLowerCase(),
        phone,
        password: hashedPassword,
        role: 'user'
      });
    }

    await newAccount.save();

    const token = generateToken(newAccount._id, role);

    res.status(201).json({
      token,
      user: {
        id: newAccount._id,
        name: newAccount.name,
        email: newAccount.email || null,
        phone: newAccount.phone || null,
        role: newAccount.role,
        services: newAccount.services || [],
        experience: newAccount.experience || 0,
        address: newAccount.address || '',
      }
    });

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// -------------------- LOGIN --------------------
exports.login = async (req, res) => {
  const { contact, password, role } = req.body; // contact = email or phone

  try {
    if (!contact || !password || !role) {
      return res.status(400).json({ message: 'Contact, password, and role are required.' });
    }

    let account;

    // Use regex for email, exact match for phone
    const query = contact.includes('@')
      ? { email: { $regex: new RegExp(`^${contact}$`, 'i') } }
      : { phone: contact };

    if (role === 'provider') {
      account = await ServiceProvider.findOne(query);
    } else {
      account = await User.findOne(query);
    }

    if (!account) {
      return res.status(401).json({ message: 'Invalid email/phone or password.' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email/phone or password.' });

    const token = generateToken(account._id, role);

    res.status(200).json({
      token,
      user: {
        id: account._id,
        name: account.name,
        email: account.email || null,
        phone: account.phone || null,
        role: account.role,
        services: account.services || [],
        experience: account.experience || 0,
        address: account.address || ''
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
