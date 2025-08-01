const path = require('path');
const fs = require('fs');
const ServiceProvider = require('../models/ServiceProvider');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { deleteOldProviderPic } = require('../middleware/upload');

// Provider Signup
async function providerSignup(req, res) {
  try {
    const {
      name,
      email,
      password,
      latitude,
      longitude,
      address,
      contact,
      services,
      experience
    } = req.body;

    let profilePic = null;
    if (req.file) {
      profilePic = req.file.filename;
    }

    // Validations
    if (!name || !email || !password || !latitude || !longitude || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: 'All required fields must be filled including at least one service.' });
    }

    if (services.length > 3) {
      return res.status(400).json({ message: 'You can only select up to 3 services.' });
    }

    const existingProvider = await ServiceProvider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: 'Provider already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const provider = await ServiceProvider.create({
      name,
      email,
      password: hashedPassword,
      latitude,
      longitude,
      address,
      contact,
      services,
      experience,
      profilePic,
      role: 'provider'
    });

    const token = generateToken(provider._id, 'provider');

    res.status(201).json({
      token,
      user: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        profilePic: provider.profilePic || null,
        role: provider.role,
      },
    });

  } catch (error) {
    console.error('Provider Signup Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Provider Login
async function providerLogin(req, res) {
  const { email, password } = req.body;

  try {
    const provider = await ServiceProvider.findOne({ email });
    if (!provider) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(provider._id, 'provider');

    res.json({
      token,
      user: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        profilePic: provider.profilePic || null,
        role: provider.role,
      },
    });
  } catch (err) {
    console.error('Provider Login Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Update Provider Profile
async function updateProviderProfile(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    console.log('📥 Params:', id);
    console.log('📦 Body:', { name, email });
    console.log('🖼️ File:', req.file);

    const provider = await ServiceProvider.findById(id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Delete old profile picture if new one uploaded
    if (req.file && provider.profilePic) {
      deleteOldProviderPic(provider.profilePic);
    }

    const updateData = { name, email };
    if (req.file) {
      updateData.profilePic = req.file.filename;
    }

    const updatedProvider = await ServiceProvider.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProvider) {
      return res.status(500).json({ message: 'Update failed' });
    }

    res.json({
      message: 'Provider profile updated successfully',
      provider: updatedProvider,
      profilePicUrl: `/uploads/providers/${updatedProvider.profilePic}`
    });

  } catch (error) {
    console.error('❌ Update Provider Error:', error);
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    return res.status(500).json({ message: 'Failed to update provider', error: error.message });
  }
}

// Get Provider Profile
const getProviderProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Return the already authenticated provider (excluding password)
    res.json(req.user);
  } catch (err) {
    console.error('Error fetching provider profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  providerSignup,
  providerLogin,
  updateProviderProfile,
  getProviderProfile
};

