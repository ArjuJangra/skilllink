const express = require('express');
const router = express.Router();
const { sendProviderMessage } = require('../controllers/contactController');

router.post('/provider/contact', sendProviderMessage);

module.exports = router;
