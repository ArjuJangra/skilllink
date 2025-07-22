const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const providerRoutes = require('./routes/providerRoutes');
dotenv.config();

const app = express();
const server = http.createServer(app);

// ===== Setup Socket.IO =====
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:8080', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },
});
global.io = io;

// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ===== Middleware =====
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ===== Routes =====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/address', require('./routes/addressRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/provider/orders', require('./routes/providerOrders'));
app.use('/api/providers', providerRoutes);

// ===== Socket.IO connection =====
io.on('connection', (socket) => {
  console.log('🟢 Client connected:', socket.id);

  // Join user room
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`👤 User ${userId} joined their room`);
  });

  // Chat messages (optional)
  socket.on('message', (msg) => {
    io.emit('newMessage', msg);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, server, io };
