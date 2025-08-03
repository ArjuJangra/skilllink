<template>
  <div class="relative">
    <!-- Loading overlay -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
      <span class="text-[#0073b1] font-semibold text-lg">Loading map...</span>
    </div>

    <!-- Map container -->
    <div id="map" class="h-[400px] rounded-lg z-0"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import axios from 'axios'

const loading = ref(true)
let routingControl = null
let userLatLng = null

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
})

onMounted(async () => {
  const map = L.map('map').setView([28.6139, 77.2090], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Show user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      userLatLng = [pos.coords.latitude, pos.coords.longitude]

      L.marker(userLatLng)
        .addTo(map)
        .bindPopup("You are here")
        .openPopup()

      map.setView(userLatLng, 13)
    })
  }

  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:5000/api/services/locations', {
      headers: { Authorization: `Bearer ${token}` }
    })

    const providers = res.data

    providers.forEach((provider) => {
      if (provider.latitude && provider.longitude) {
        const marker = L.marker([provider.latitude, provider.longitude]).addTo(map)

        marker.bindPopup(`
          <div>
            <strong>${provider.name}</strong><br/>
            <button class="text-[#0073b1]" onclick="window.drawRoute(${provider.latitude}, ${provider.longitude})">🧭 Route</button>
          </div>
        `)
      }
    })

    // Expose routing globally
    window.drawRoute = (destLat, destLng) => {
      if (!userLatLng) return alert("User location not available yet!")

      // Remove previous route
      if (routingControl) {
        map.removeControl(routingControl)
      }

      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLatLng),
          L.latLng(destLat, destLng)
        ],
        routeWhileDragging: false,
        show: false
      }).addTo(map)
    }

    loading.value = false
  } catch (err) {
    console.error('❌ Failed to fetch provider locations:', err)
    loading.value = false
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

