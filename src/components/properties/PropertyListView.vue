<template>
  <div class="property-list-view">
    <el-table 
      :data="properties" 
      style="width: 100%"
      :default-sort="{ prop: 'afterRepairValue', order: 'descending' }"
      stripe
    >
      <el-table-column type="index" width="50" />
      
      <el-table-column label="" width="60">
        <template #default="{ row }">
          <button 
            class="favorite-btn-list"
            :class="{ active: isFavorite(row.id) }"
            @click="toggleFavorite(row.id)"
          >
            <el-icon><Star :fill="isFavorite(row.id) ? '#f56c6c' : 'none'" /></el-icon>
          </button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="Address" min-width="200">
        <template #default="{ row }">
          <div class="address-cell">
            <div class="address-line">{{ row.address }},</div>
            <div class="city-line">{{ row.city }}, {{ row.state }} {{ row.zipCode }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column 
        prop="afterRepairValue" 
        label="Est. Value" 
        width="150"
        sortable
        align="right"
      >
        <template #default="{ row }">
          <span class="value-text">{{ formatCurrency(row.afterRepairValue) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="beds" label="Beds" width="80" align="center" sortable />
      
      <el-table-column prop="baths" label="Bath" width="80" align="center" sortable />
      
      <el-table-column 
        prop="sqFt" 
        label="Sq Ft" 
        width="100" 
        align="right"
        sortable
      >
        <template #default="{ row }">
          {{ row.sqFt.toLocaleString() }}
        </template>
      </el-table-column>
      
      <el-table-column 
        prop="yearBuilt" 
        label="Bld Yr" 
        width="100" 
        align="center"
        sortable
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { Star } from '@element-plus/icons-vue'
import type { Property } from '@/types/property'
import { formatCurrency } from '@/services/propertyService'

interface Props {
  properties: Property[]
}

defineProps<Props>()
const store = useStore()

const isFavorite = (id: number): boolean => store.getters['properties/isFavorite'](id)

const toggleFavorite = (id: number): void => {
  store.dispatch('properties/toggleFavorite', id)
}
</script>

<style lang="scss" scoped>
.property-list-view {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.favorite-btn-list {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }

  &.active {
    color: #f56c6c;
  }
}

.address-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.address-line {
  font-weight: 600;
  color: #2c3e50;
}

.city-line {
  font-size: 12px;
  color: #8b98a5;
}

.value-text {
  font-weight: 600;
  color: #1e5b8a;
}

:deep(.el-table) {
  font-size: 14px;

  .el-table__header th {
    background: #f5f7fa;
    color: #606266;
    font-weight: 600;
  }

  .el-table__row {
    cursor: pointer;

    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>

