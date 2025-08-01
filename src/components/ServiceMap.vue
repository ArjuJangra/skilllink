<template>
  <div id="map" class="h-[400px] rounded-lg"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
})

onMounted(async () => {
  // Initialize map
  const map = L.map('map').setView([28.6139, 77.2090], 10)

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // 📍 Fetch service provider locations
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:5000/api/services/locations', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const providers = res.data

    providers.forEach((provider) => {
      if (
        provider.latitude !== undefined &&
        provider.longitude !== undefined &&
        provider.latitude !== null &&
        provider.longitude !== null
      ) {
        L.marker([provider.latitude, provider.longitude]).addTo(map)
      }
    })
  } catch (err) {
    console.error('❌ Failed to fetch locations:', err)
  }

  // 📍 Show current user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("You are here")
        .openPopup()

      map.setView([latitude, longitude], 13)
    }, () => {
      console.warn("⚠️ Geolocation access denied or unavailable.")
    })
  } else {
    console.warn("⚠️ Geolocation is not supported by this browser.")
  }
})
</script>

<style>
#map {
  height: 300px;
}
@media (min-width: 768px) {
  #map {
    height: 400px;
  }
}
</style>
