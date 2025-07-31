const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure main and provider upload directories exist
const mainUploadDir = path.join(__dirname, '..', 'uploads');
const providerUploadDir = path.join(mainUploadDir, 'providers');

if (!fs.existsSync(mainUploadDir)) {
  fs.mkdirSync(mainUploadDir, { recursive: true });
}
if (!fs.existsSync(providerUploadDir)) {
  fs.mkdirSync(providerUploadDir, { recursive: true });
}

// ---------- FILE FILTER ----------
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (.jpg, .jpeg, .png, .gif, .webp) are allowed'));
  }
};

// ---------- USER PROFILE PIC STORAGE ----------
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mainUploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `user-${base}-${Date.now()}${ext}`);
  }
});

// ---------- PROVIDER PROFILE PIC STORAGE ----------
const providerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, providerUploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `provider-${base}-${Date.now()}${ext}`);
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

// Optional: Helper to delete old provider profile picture
const deleteOldProviderPic = (filename) => {
  if (!filename) return;
  const filePath = path.join(providerUploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('🗑️ Old provider profile picture deleted:', filename);
  }
};

// ---------- EXPORT ----------
module.exports = {
  uploadUserPic,
  uploadProviderPic,
  deleteOldProviderPic, 
};
