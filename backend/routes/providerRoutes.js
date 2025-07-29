const express = require('express');
const router = express.Router();
const { uploadProviderPic, updateProviderProfile } = require('../middleware/upload');

router.put('/:id', uploadProviderPic.single('profilePic'), updateProviderProfile);


module.exports = router;
