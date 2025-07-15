// routes/addressRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Address route works!' });
});

module.exports = router;
