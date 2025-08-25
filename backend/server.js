const bookingRoutes = require('./routes/bookingRoutes');
const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const providerRoutes = require('./routes/providerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const providerOrdersRoutes = require('./routes/providerOrders');
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);

// ===== Allowed Origins =====
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  process.env.CLIENT_ORIGIN,
];

// ===== Setup Socket.IO =====
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by WS CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});
global.io = io;

// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Atlas connection error:", err));

// ===== Middleware =====
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ===== Health Check =====
app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

// ===== API Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/providerorders', providerOrdersRoutes);
app.use('/api/notifications', notificationRoutes);


// ===== Socket.IO JWT Authentication =====
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication error'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error('Authentication error'));
  }
});

// ===== Socket.IO Connection Handler =====
io.on('connection', (socket) => {
  console.log('🟢 Client connected:', socket.user?.id || socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`👤 User ${userId} joined their room`);
  });

  socket.on('message', (msg) => io.emit('newMessage', msg));

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => console.log('🔴 Client disconnected:', socket.id));
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, server, io };
