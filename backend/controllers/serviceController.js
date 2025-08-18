// controllers/serviceController.js
const ServiceProvider = require('../models/ServiceProvider');

exports.getNearbyServices = async (req, res) => {
  console.log('📥 Incoming request:', req.body);
  const { latitude, longitude, service, maxDistance = 50000 } = req.body;

  try {
    let providers = await ServiceProvider.find({
      latitude: { $ne: null },
      longitude: { $ne: null },
    });

    console.log('🔥 Providers in DB:', providers.map(p => ({
      name: p.name,
      services: p.services,
      lat: p.latitude,
      lon: p.longitude
    })));

    // Service filter
    if (service) {
      const normalized = service.toLowerCase().trim();
      console.log('🔎 Looking for service:', normalized);

      providers = providers.filter(
        (provider) =>
          (provider.services || []).some(
            (s) => s.toLowerCase().trim() === normalized
          )
      );

      console.log('✅ Providers after service filter:', providers.map(p => p.name));
    }

    if (!latitude || !longitude) {
      return res.json(providers);
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    const toRad = (value) => (value * Math.PI) / 180;
    const isWithinRadius = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // km
      return d * 1000 <= maxDistance; // convert to meters
    };

    const nearbyProviders = providers.filter((provider) =>
      isWithinRadius(lat, lon, provider.latitude, provider.longitude)
    );

    console.log('📏 Providers after distance filter:', nearbyProviders.map(p => p.name));

    res.json(nearbyProviders);
  } catch (error) {
    console.error('❌ Error fetching nearby providers:', error);
    res.status(500).json({ message: 'Server error while fetching providers.' });
  }
};
