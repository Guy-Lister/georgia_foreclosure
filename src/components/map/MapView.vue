<template>
  <div class="map-view-container">
    <div class="map-controls">
      <div class="map-type-toggle">
        <button 
          class="map-type-btn"
          :class="{ active: mapType === 'map' }"
          @click="setMapType('map')"
        >
          Map
        </button>
        <button 
          class="map-type-btn"
          :class="{ active: mapType === 'satellite' }"
          @click="setMapType('satellite')"
        >
          Satellite
        </button>
      </div>
      <button class="fullscreen-btn" @click="toggleFullscreen">
        <el-icon><FullScreen /></el-icon>
      </button>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, type Ref } from 'vue'
import { useStore } from 'vuex'
import L, { type Map, type Marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FullScreen } from '@element-plus/icons-vue'
import type { Property } from '@/types/property'
import type { MapType } from '@/types/property'
import { formatShortNumber } from '@/services/propertyService'

interface Props {
  properties: Property[]
}

const props = defineProps<Props>()
const store = useStore()
const mapContainer: Ref<HTMLElement | null> = ref(null)
let map: Map | null = null
let markers: Marker[] = []

const mapType = computed<MapType>(() => store.state.ui.mapType)

const setMapType = (type: MapType): void => {
  store.dispatch('ui/setMapType', type)
}

const toggleFullscreen = (): void => {
  if (mapContainer.value) {
    if (!document.fullscreenElement) {
      mapContainer.value.parentElement?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }
}

const initMap = (): void => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([33.7490, -84.3880], 9)

  updateTileLayer()
}

const updateTileLayer = (): void => {
  if (!map) return

  map.eachLayer((layer) => {
    if (layer instanceof L.TileLayer) {
      map!.removeLayer(layer)
    }
  })

  if (mapType.value === 'satellite') {
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri',
      maxZoom: 19
    }).addTo(map)
  } else {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map)
  }
}

const updateMarkers = (): void => {
  if (!map) return

  markers.forEach(marker => map!.removeLayer(marker))
  markers = []

  props.properties.forEach((property: Property) => {
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-content">
        <div class="marker-price">${formatShortNumber(property.afterRepairValue)}</div>
      </div>`,
      iconSize: [60, 30],
      iconAnchor: [30, 30]
    })

    const marker = L.marker([property.lat, property.lng], { icon: customIcon })
      .addTo(map!)
      .bindPopup(`
        <div class="map-popup">
          <img src="${property.imageUrl}" alt="${property.address}" class="popup-image" />
          <div class="popup-content">
            <h4>${property.address}</h4>
            <p>${property.city}, ${property.state} ${property.zipCode}</p>
            <div class="popup-price">$${property.afterRepairValue.toLocaleString()}</div>
            <div class="popup-details">
              ${property.beds} beds • ${property.baths} baths • ${property.sqFt.toLocaleString()} sqft
            </div>
          </div>
        </div>
      `)

    markers.push(marker)
  })

  if (props.properties.length > 0) {
    const bounds = L.latLngBounds(props.properties.map(p => [p.lat, p.lng]))
    map!.fitBounds(bounds, { padding: [50, 50] })
  }
}

onMounted(() => {
  initMap()
  updateMarkers()
})

watch(() => props.properties, () => {
  updateMarkers()
}, { deep: true })

watch(mapType, () => {
  updateTileLayer()
})
</script>

<style lang="scss">
.custom-marker {
  background: transparent;
  border: none;
}

.marker-content {
  background: #3b82f6;
  color: white;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  text-align: center;

  &:hover {
    background: #2563eb;
    transform: scale(1.05);
  }
}

.map-popup {
  .popup-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .popup-content {
    h4 {
      margin: 0 0 4px;
      font-size: 14px;
      font-weight: 600;
      color: #2c3e50;
    }

    p {
      margin: 0 0 8px;
      font-size: 12px;
      color: #5a6c7d;
    }
  }

  .popup-price {
    font-size: 16px;
    font-weight: 700;
    color: #1e5b8a;
    margin-bottom: 4px;
  }

  .popup-details {
    font-size: 12px;
    color: #5a6c7d;
  }
}
</style>

<style lang="scss" scoped>
.map-view-container {
  position: relative;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.map-controls {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1000;
  display: flex;
  gap: 8px;
}

.map-type-toggle {
  display: flex;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.map-type-btn {
  padding: 8px 16px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #5a6c7d;
  transition: all 0.2s;

  &:hover {
    background: #f5f7fa;
  }

  &.active {
    background: #3b82f6;
    color: white;
  }
}

.fullscreen-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    background: #f5f7fa;
  }
}

.map-container {
  width: 100%;
  height: 100%;
}
</style>

