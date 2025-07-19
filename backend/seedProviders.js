// seedProviders.js
const mongoose = require('mongoose');
const ServiceProvider = require('./models/ServiceProvider');

mongoose.connect('mongodb://127.0.0.1:27017/skilllink', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  seedData();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const providers = [
  {
    name: "Ravi Electric Works",
    category: "Electrician",
    latitude: 28.6448,
    longitude: 77.2167,
  },
  {
    name: "Noida Plumbing Services",
    category: "Plumber",
    latitude: 28.5355,
    longitude: 77.3910,
  },
  {
    name: "Raj Bike Repairs",
    category: "Mechanic",
    latitude: 28.4595,
    longitude: 77.0266,
  }
];

async function seedData() {
  try {
    await ServiceProvider.deleteMany({});
    await ServiceProvider.insertMany(providers);
    console.log('Service providers seeded!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
  }
}
