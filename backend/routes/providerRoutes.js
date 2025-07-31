const express = require('express');
const router = express.Router();
const { uploadProviderPic } = require('../middleware/upload');
 
const authMiddleware = require('../middleware/authMiddleware');

const {
  providerSignup,
  providerLogin,
  updateProviderProfile, 
   getProviderProfile ,
} = require('../controllers/providerProfileController');

// Provider signup
router.post('/signup', providerSignup);

// Provider login
router.post('/login', providerLogin);

router.put('/profile/update/:id', uploadProviderPic.single('profilePic'), updateProviderProfile);
router.get('/profile', authMiddleware, getProviderProfile);


module.exports = router;

