<template>
  <div class="property-card">
    <div class="card-header">
      <img 
        :src="property.imageUrl" 
        :alt="property.address"
        class="property-image"
      />
      <button 
        class="favorite-btn"
        :class="{ active: isFavorite }"
        @click.stop="toggleFavorite"
      >
        <el-icon><Star :fill="isFavorite ? '#f56c6c' : 'none'" /></el-icon>
      </button>
      <div class="county-badge">{{ property.county }}</div>
    </div>

    <div class="card-body">
      <h3 class="property-address">{{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zipCode }}</h3>

      <div class="property-values">
        <div class="value-item primary">
          <span class="value-label">After Repair Value</span>
          <span class="value-amount">{{ formatCurrency(property.afterRepairValue) }}</span>
        </div>
        <div class="value-item secondary">
          <span class="value-label">Foreclosure Amt</span>
          <span class="value-amount">{{ formatCurrency(property.foreclosureAmount) }}</span>
        </div>
      </div>

      <div class="property-details">
        <div class="detail-item">
          <span class="detail-label">Beds</span>
          <span class="detail-value">{{ property.beds }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Baths</span>
          <span class="detail-value">{{ property.baths }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Sq. Ft.</span>
          <span class="detail-value">{{ property.sqFt.toLocaleString() }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Built</span>
          <span class="detail-value">{{ property.yearBuilt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Star } from '@element-plus/icons-vue'
import type { Property } from '@/types/property'
import { formatCurrency } from '@/services/propertyService'

interface Props {
  property: Property
}

const props = defineProps<Props>()
const store = useStore()

const isFavorite = computed(() => 
  store.getters['properties/isFavorite'](props.property.id)
)

const toggleFavorite = (): void => {
  store.dispatch('properties/toggleFavorite', props.property.id)
}
</script>

<style lang="scss" scoped>
.property-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.card-header {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    color: #f56c6c;
  }
}

.county-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #2c3e50;
}

.card-body {
  padding: 16px;
}

.property-address {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 16px;
  line-height: 1.4;
}

.property-values {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.value-item {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.primary {
    .value-amount {
      color: #1e5b8a;
      font-weight: 700;
    }
  }

  &.secondary {
    .value-amount {
      color: #5a6c7d;
    }
  }
}

.value-label {
  font-size: 11px;
  color: #8b98a5;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
}

.value-amount {
  font-size: 16px;
  font-weight: 600;
}

.property-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #e8ecef;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.detail-label {
  font-size: 11px;
  color: #8b98a5;
  font-weight: 500;
}

.detail-value {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 600;
}
</style>

