const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Send a message
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const newMessage = await Message.create({ senderId, receiverId, content });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get chat between two users
router.get('/:user1Id/:user2Id', async (req, res) => {
  const { user1Id, user2Id } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id },
      ],
    }).sort('createdAt');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
