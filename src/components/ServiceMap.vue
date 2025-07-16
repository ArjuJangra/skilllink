<template>
  <div id="map" class="h-[400px] rounded-lg"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href
})
onMounted(() => {
  const map = L.map('map').setView([28.6139, 77.2090], 10) // Default: Delhi

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Example: Add markers
  const serviceLocations = [
    { lat: 28.6448, lng: 77.2167, label: 'Connaught Place' },
    { lat: 28.5355, lng: 77.3910, label: 'Noida' }
  ]

  serviceLocations.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.label)
  })
})
</script>

<style>
#map {
  width: 100%;
}
</style>
