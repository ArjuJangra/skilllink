<template>
  <div class="relative">
    <!-- Loading overlay -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
      <span class="text-[#0073b1] font-semibold text-lg">Loading map...</span>
    </div>

    <!-- Map container -->
    <div id="map" class="h-[500px] rounded-lg z-0"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
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

// Example category icons
const categoryIcons = {
  electrician: L.icon({ iconUrl: '/images/electrician.jpg', iconSize: [35, 35] }),
  plumber: L.icon({ iconUrl: '/images/plumber.jpeg', iconSize: [35, 35] }),
  appliance: L.icon({ iconUrl: '/icons/appliance.png', iconSize: [35, 35] }),
  default: L.icon({ iconUrl: '/images/default-user.png', iconSize: [35, 35] }),
}

onMounted(async () => {
  const map = L.map('map').setView([28.6139, 77.2090], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // User location
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

    // Create cluster group
    const markers = L.markerClusterGroup()

    providers.forEach((provider) => {
      if (!provider.latitude || !provider.longitude) return

      const icon = categoryIcons[provider.category?.toLowerCase()] || categoryIcons.default
      const marker = L.marker([provider.latitude, provider.longitude], { icon })

      marker.bindPopup(`
        <div class="popup-content">
          <strong>${provider.name}</strong><br/>
          <small>${provider.category || 'Service'}</small><br/>
          <span id="distance-${provider._id}">Calculating distance...</span><br/>
          <button class="text-[#0073b1]" onclick="window.drawRoute(${provider.latitude}, ${provider.longitude}, '${provider._id}')">🧭 Route</button>
          <button class="text-[#0073b1]" onclick="window.bookService('${provider._id}')">📅 Book Now</button>
        </div>
      `)

      markers.addLayer(marker)
    })

    map.addLayer(markers)

    // Expose routing function
    window.drawRoute = (destLat, destLng, providerId) => {
      if (!userLatLng) return alert("User location not available!")

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

      // Calculate distance/time and update popup
      const url = `https://router.project-osrm.org/route/v1/driving/${userLatLng[1]},${userLatLng[0]};${destLng},${destLat}?overview=false`
      fetch(url)
        .then(r => r.json())
        .then(data => {
          if (data.routes && data.routes[0]) {
            const distKm = (data.routes[0].distance / 1000).toFixed(1)
            const timeMin = Math.ceil(data.routes[0].duration / 60)
            const span = document.getElementById(`distance-${providerId}`)
            if (span) span.innerHTML = `Distance: ${distKm} km, ETA: ${timeMin} min`
          }
        })
    }

    // Booking function
    window.bookService = (providerId) => {
      window.location.href = `/booking?provider=${providerId}`
    }

    loading.value = false
  } catch (err) {
    console.error('❌ Failed to fetch providers:', err)
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

