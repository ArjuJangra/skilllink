const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true,
};


app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

 

// Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/address', require('./routes/addressRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:8080', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  },
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

  global.io = io;
  
  io.on('connection', (socket) => {
    console.log('🟢 New client connected:', socket.id);
    socket.on('message', (msg) => {
      io.emit('newMessage', msg); // broadcast to all
    });
    
    
    socket.on('sendMessage', ({ roomId, message }) => {
    // You can save the message to MongoDB here if needed
    io.to(roomId).emit('receiveMessage', message);
  });

  
  socket.on('disconnect', () => {
    console.log(' Client disconnected:', socket.id);
  });
});
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, server, io };