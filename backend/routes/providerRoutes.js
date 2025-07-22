const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Provider = require('../models/ServiceProvider');

router.put('/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Update fields
    provider.name = req.body.name || provider.name;
    provider.email = req.body.email || provider.email;

    // Update profile picture if uploaded
    if (req.file) {
      provider.profilePic = req.file.filename;
    }

    const updatedProvider = await provider.save();
    res.json(updatedProvider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
