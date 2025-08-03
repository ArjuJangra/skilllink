require('dotenv').config();

const express = require('express');
const router = express.Router();
const { sendProviderMessage } = require('../controllers/contactController');
const { sendUserMessage } = require('../controllers/contactController');

router.post('/provider/contact', sendProviderMessage);

router.post('/', sendUserMessage);
module.exports = router;
