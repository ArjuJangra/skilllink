// controllers/serviceController.js
const ServiceProvider = require('../models/ServiceProvider');

exports.getNearbyServices = async (req, res) => {
    console.log('📥 Incoming request:', req.body);
  const { latitude, longitude, service, maxDistance = 10000 } = req.body; // default 10 km

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and longitude are required.' });
  }

  try {
    let providers = await ServiceProvider.find({
      latitude: { $ne: null },
      longitude: { $ne: null },
    });

    if (service) {
      providers = providers.filter((provider) =>
        provider.services.includes(service)
      );
    }

    const toRad = (value) => (value * Math.PI) / 180;

    const isWithinRadius = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth radius in km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d * 1000 <= maxDistance; // convert to meters
    };

    const nearbyProviders = providers.filter((provider) =>
      isWithinRadius(latitude, longitude, provider.latitude, provider.longitude)
    );

    res.json(nearbyProviders);
  } catch (error) {
    console.error('❌ Error fetching nearby providers:', error);
    res.status(500).json({ message: 'Server error while fetching providers.' });
  }
};
