const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Provider = require('../models/ServiceProvider'); // ✅ Correct model import

// Ensure main uploads directory exists
const mainUploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(mainUploadDir)) {
  fs.mkdirSync(mainUploadDir);
}

// ---------- FILE FILTER ----------
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, .png, and .gif files are allowed'));
  }
};

// ---------- USER PROFILE PIC STORAGE ----------
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mainUploadDir); // Uploads go to /uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = `user-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// ---------- PROVIDER PROFILE PIC STORAGE ----------
const providerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const providerDir = path.join(mainUploadDir, 'providers');
    if (!fs.existsSync(providerDir)) {
      fs.mkdirSync(providerDir, { recursive: true });
    }
    cb(null, providerDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `provider-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// ---------- MULTER INSTANCES ----------
const uploadUserPic = multer({
  storage: userStorage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

const uploadProviderPic = multer({
  storage: providerStorage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// ---------- PROVIDER PROFILE UPDATE FUNCTION ----------
const updateProviderProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const updatedFields = { name, email };
    if (req.file) {
      updatedFields.profilePic = req.file.filename;
    }

    const updatedProvider = await Provider.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedProvider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.status(200).json({
      message: 'Provider profile updated successfully',
      provider: updatedProvider,
      profilePicUrl: `/uploads/providers/${updatedProvider.profilePic}`
    });
  } catch (err) {
    console.error('Update Provider Profile Error:', err);
    res.status(500).json({ error: 'Failed to update provider profile' });
  }
};

// ---------- EXPORT ----------
module.exports = {
  uploadUserPic,
  uploadProviderPic,
  updateProviderProfile
};
