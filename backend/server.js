const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // apply cors middleware

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/address', require('./routes/addressRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
