<template>
  <div class="foreclosure-list-page">
    <!-- Top Filter Bar -->
    <div class="page-header">
      <FilterPanel />
    </div>

    <!-- Results Info and View Controls -->
    <div class="results-header">
      <div class="results-info">
        <h2 class="results-title">Showing {{ totalProperties }} properties</h2>
      </div>

      <div class="view-controls">
        <div class="filter-buttons">
          <el-popover
            placement="bottom-start"
            :width="400"
            trigger="click"
          >
            <template #reference>
              <el-button :type="hasBedsFilters ? 'primary' : 'default'">
                Beds & Baths
                <el-icon class="ml-1"><ArrowDown /></el-icon>
              </el-button>
            </template>
            <div class="filter-dropdown">
              <h4 class="filter-title">Number of Bedrooms</h4>
              <div class="option-buttons">
                <button 
                  v-for="num in [null, 1, 2, 3, 4, 5]" 
                  :key="num === null ? 'any' : num"
                  class="option-btn"
                  :class="{ active: bedrooms === num }"
                  @click="bedrooms = num"
                >
                  {{ num === null ? 'Any' : num + '+' }}
                </button>
              </div>
              
              <el-checkbox v-model="exactBedrooms" class="exact-match">
                Use exact match
              </el-checkbox>

              <h4 class="filter-title">Number of Bathrooms</h4>
              <div class="option-buttons">
                <button 
                  v-for="num in [null, 1, 1.5, 2, 3, 4]" 
                  :key="num === null ? 'any' : num"
                  class="option-btn"
                  :class="{ active: bathrooms === num }"
                  @click="bathrooms = num"
                >
                  {{ num === null ? 'Any' : num + '+' }}
                </button>
              </div>

              <div class="filter-actions">
                <el-button @click="resetBedsAndBaths">Reset</el-button>
                <el-button type="primary" @click="applyBedsAndBaths">Apply</el-button>
              </div>
            </div>
          </el-popover>
          
          <el-popover
            placement="bottom-start"
            :width="400"
            trigger="click"
          >
            <template #reference>
              <el-button :type="hasValueFilters ? 'primary' : 'default'">
                Value & Debt
                <el-icon class="ml-1"><ArrowDown /></el-icon>
              </el-button>
            </template>
            <div class="filter-dropdown">
              <h4 class="filter-title">Estimated After Repair Value</h4>
              <div class="range-inputs">
                <el-select v-model="minValue" placeholder="No Min" clearable>
                  <el-option label="No Min" :value="null" />
                  <el-option label="$100,000" :value="100000" />
                  <el-option label="$150,000" :value="150000" />
                  <el-option label="$200,000" :value="200000" />
                  <el-option label="$250,000" :value="250000" />
                  <el-option label="$300,000" :value="300000" />
                  <el-option label="$400,000" :value="400000" />
                  <el-option label="$500,000" :value="500000" />
                </el-select>
                <span class="range-separator">-</span>
                <el-select v-model="maxValue" placeholder="No Max" clearable>
                  <el-option label="No Max" :value="null" />
                  <el-option label="$200,000" :value="200000" />
                  <el-option label="$300,000" :value="300000" />
                  <el-option label="$400,000" :value="400000" />
                  <el-option label="$500,000" :value="500000" />
                  <el-option label="$750,000" :value="750000" />
                  <el-option label="$1,000,000" :value="1000000" />
                </el-select>
              </div>

              <h4 class="filter-title">Foreclosure Amount</h4>
              <div class="range-inputs">
                <el-select v-model="minForeclosure" placeholder="No Min" clearable>
                  <el-option label="No Min" :value="null" />
                  <el-option label="$50,000" :value="50000" />
                  <el-option label="$100,000" :value="100000" />
                  <el-option label="$150,000" :value="150000" />
                  <el-option label="$200,000" :value="200000" />
                  <el-option label="$250,000" :value="250000" />
                </el-select>
                <span class="range-separator">-</span>
                <el-select v-model="maxForeclosure" placeholder="No Max" clearable>
                  <el-option label="No Max" :value="null" />
                  <el-option label="$150,000" :value="150000" />
                  <el-option label="$200,000" :value="200000" />
                  <el-option label="$300,000" :value="300000" />
                  <el-option label="$400,000" :value="400000" />
                  <el-option label="$500,000" :value="500000" />
                </el-select>
              </div>

              <div class="filter-actions">
                <el-button @click="resetValueAndDebt">Reset</el-button>
                <el-button type="primary" @click="applyValueAndDebt">Apply</el-button>
              </div>
            </div>
          </el-popover>
          
          <el-popover
            placement="bottom-start"
            :width="400"
            trigger="click"
          >
            <template #reference>
              <el-button :type="hasMoreFilters ? 'primary' : 'default'">
                More
                <el-icon class="ml-1"><ArrowDown /></el-icon>
              </el-button>
            </template>
            <div class="filter-dropdown">
              <h4 class="filter-title">Year Built</h4>
              <div class="range-inputs">
                <el-input v-model.number="minYearBuilt" placeholder="No Min" clearable />
                <span class="range-separator">-</span>
                <el-input v-model.number="maxYearBuilt" placeholder="No Max" clearable />
              </div>

              <h4 class="filter-title">Finished Square Footage</h4>
              <div class="range-inputs">
                <el-input v-model.number="minSqFt" placeholder="No Min" clearable />
                <span class="range-separator">-</span>
                <el-input v-model.number="maxSqFt" placeholder="No Max" clearable />
              </div>

              <h4 class="filter-title">Incomplete Data</h4>
              <p class="filter-description">
                Include Properties with incomplete data in results?
              </p>
              <el-radio-group v-model="includeIncompleteData">
                <el-radio :label="true">Yes</el-radio>
                <el-radio :label="false">No</el-radio>
              </el-radio-group>

              <div class="filter-actions">
                <el-button @click="resetMoreFilters">Reset</el-button>
                <el-button type="primary" @click="applyMoreFilters">Apply</el-button>
              </div>
            </div>
          </el-popover>

          <el-button @click="handleFilter">
            Filter
            <el-icon class="ml-1"><Filter /></el-icon>
          </el-button>
        </div>

        <div class="view-toggle">
          <span class="view-label">View</span>
          <el-switch
            v-model="isListView"
            active-text="List"
            inactive-text="Tile"
            @change="handleViewChange"
          />
        </div>

        <div class="action-buttons">
          <el-button @click="handleSaveSearch">
            Save Search
            <el-icon class="ml-1"><CirclePlus /></el-icon>
          </el-button>
          <el-button type="danger" @click="handleExportList">
            Export List
          </el-button>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="map-section">
        <MapView :properties="displayedProperties" />
      </div>

      <div class="properties-section">
        <div v-if="loading" class="loading-state">
          <el-icon class="is-loading"><Loading /></el-icon>
          <p>Loading properties...</p>
        </div>

        <div v-else-if="totalProperties === 0" class="empty-state">
          <p>No properties found matching your criteria.</p>
          <el-button @click="resetFilters">Reset Filters</el-button>
        </div>

        <template v-else>
          <div v-if="!isListView" class="properties-grid">
            <PropertyCard 
              v-for="property in paginatedProperties" 
              :key="property.id"
              :property="property"
            />
          </div>

          <div v-else class="properties-list">
            <PropertyListView :properties="paginatedProperties" />
          </div>

          <div class="pagination-section">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[12, 24, 48, 96]"
              :total="totalProperties"
              layout="total, sizes, prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
            />
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type Ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { 
  ArrowDown, 
  Filter, 
  CirclePlus, 
  Loading 
} from '@element-plus/icons-vue'

import type { Property } from '@/types/property'
import FilterPanel from '@/components/filters/FilterPanel.vue'
import MapView from '@/components/map/MapView.vue'
import PropertyCard from '@/components/properties/PropertyCard.vue'
import PropertyListView from '@/components/properties/PropertyListView.vue'

const store = useStore()

const isListView: Ref<boolean> = ref(false)

const bedrooms = ref<number | null>(null)
const bathrooms = ref<number | null>(null)
const exactBedrooms = ref<boolean>(false)
const minValue = ref<number | null>(null)
const maxValue = ref<number | null>(null)
const minForeclosure = ref<number | null>(null)
const maxForeclosure = ref<number | null>(null)
const minYearBuilt = ref<number | null>(null)
const maxYearBuilt = ref<number | null>(null)
const minSqFt = ref<number | null>(null)
const maxSqFt = ref<number | null>(null)
const includeIncompleteData = ref<boolean>(true)

const loading = computed<boolean>(() => store.getters['properties/isLoading'])
const paginatedProperties = computed<Property[]>(() => store.getters['properties/paginatedProperties'])
const displayedProperties = computed<Property[]>(() => store.getters['properties/properties'])
const totalProperties = computed<number>(() => store.getters['properties/totalProperties'])
const currentPage = computed({
  get: (): number => store.state.properties.currentPage,
  set: (val: number) => store.dispatch('properties/setPage', val)
})
const pageSize = computed<number>(() => store.state.properties.pageSize)

const hasBedsFilters = computed<boolean>(() => {
  const filters = store.state.filters
  return filters.bedrooms !== null || filters.bathrooms !== null
})

const hasValueFilters = computed<boolean>(() => {
  const filters = store.state.filters
  return filters.minValue !== null || 
         filters.maxValue !== null || 
         filters.minForeclosure !== null || 
         filters.maxForeclosure !== null
})

const hasMoreFilters = computed<boolean>(() => {
  const filters = store.state.filters
  return filters.minYearBuilt !== null || 
         filters.maxYearBuilt !== null || 
         filters.minSqFt !== null || 
         filters.maxSqFt !== null ||
         filters.includeIncompleteData === false
})

const handleViewChange = (value: boolean): void => {
  store.dispatch('ui/setViewMode', value ? 'list' : 'tile')
}

const handleFilter = (): void => {
  ElMessage.info('Additional filter options')
}

const handleSaveSearch = (): void => {
  ElMessage.success('Search saved successfully!')
}

const handleExportList = (): void => {
  ElMessage.success('Exporting list...')
}

const handlePageChange = (page: number): void => {
  store.dispatch('properties/setPage', page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSizeChange = (size: number): void => {
  store.commit('properties/SET_PAGE_SIZE', size)
}

const resetFilters = (): void => {
  store.dispatch('filters/resetFilters')
}

const applyBedsAndBaths = (): void => {
  store.dispatch('filters/updateBedrooms', bedrooms.value)
  store.dispatch('filters/updateBathrooms', bathrooms.value)
  store.commit('filters/SET_EXACT_BEDROOMS', exactBedrooms.value)
  store.dispatch('properties/applyFilters')
}

const resetBedsAndBaths = (): void => {
  bedrooms.value = null
  bathrooms.value = null
  exactBedrooms.value = false
}

const applyValueAndDebt = (): void => {
  store.dispatch('filters/updateValueRange', { 
    min: minValue.value, 
    max: maxValue.value 
  })
  store.dispatch('filters/updateForeclosureRange', { 
    min: minForeclosure.value, 
    max: maxForeclosure.value 
  })
}

const resetValueAndDebt = (): void => {
  minValue.value = null
  maxValue.value = null
  minForeclosure.value = null
  maxForeclosure.value = null
}

const applyMoreFilters = (): void => {
  store.dispatch('filters/updateYearRange', { 
    min: minYearBuilt.value, 
    max: maxYearBuilt.value 
  })
  store.dispatch('filters/updateSqFtRange', { 
    min: minSqFt.value, 
    max: maxSqFt.value 
  })
  store.dispatch('filters/updateIncompleteData', includeIncompleteData.value)
}

const resetMoreFilters = (): void => {
  minYearBuilt.value = null
  maxYearBuilt.value = null
  minSqFt.value = null
  maxSqFt.value = null
  includeIncompleteData.value = true
}

onMounted(() => {
  store.dispatch('properties/loadProperties')
  
  const filters = store.state.filters
  bedrooms.value = filters.bedrooms
  bathrooms.value = filters.bathrooms
  exactBedrooms.value = filters.exactBedrooms
  minValue.value = filters.minValue
  maxValue.value = filters.maxValue
  minForeclosure.value = filters.minForeclosure
  maxForeclosure.value = filters.maxForeclosure
  minYearBuilt.value = filters.minYearBuilt
  maxYearBuilt.value = filters.maxYearBuilt
  minSqFt.value = filters.minSqFt
  maxSqFt.value = filters.maxSqFt
  includeIncompleteData.value = filters.includeIncompleteData
})
</script>

<style lang="scss" scoped>
.foreclosure-list-page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
}

.page-header {
  background: white;
  padding: 20px 24px;
  border-bottom: 1px solid #e8ecef;
}

.results-header {
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e8ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.results-info {
  flex-shrink: 0;
}

.results-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.view-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-left: 1px solid #e8ecef;
  border-right: 1px solid #e8ecef;
}

.view-label {
  font-size: 14px;
  font-weight: 500;
  color: #5a6c7d;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.ml-1 {
  margin-left: 4px;
}

.main-content {
  display: flex;
  gap: 0;
  flex: 1;
  background: #f5f5f5;
}

.map-section {
  width: 50%;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow: hidden;

  :deep(.map-view-container) {
    height: 100%;
    border-radius: 0;
  }
}

.properties-section {
  width: 50%;
  padding: 24px;
  overflow-y: auto;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.properties-list {
  margin-bottom: 32px;
}

.pagination-section {
  display: flex;
  justify-content: center;
  padding: 24px 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #5a6c7d;

  .el-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    margin: 0 0 16px;
  }
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  .map-section {
    width: 100%;
    position: relative;
    height: 500px;
    top: 0;
  }

  .properties-section {
    width: 100%;
  }

  .properties-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .results-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .view-controls {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .filter-buttons,
  .action-buttons {
    width: 100%;
    flex-wrap: wrap;

    .el-button {
      flex: 1;
    }
  }

  .view-toggle {
    border-left: none;
    border-right: none;
    border-top: 1px solid #e8ecef;
    border-bottom: 1px solid #e8ecef;
    padding: 12px 0;
    justify-content: space-between;
  }

  .properties-grid {
    grid-template-columns: 1fr;
  }
}

.filter-dropdown {
  padding: 16px;
  
  .filter-title {
    font-size: 15px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 12px 0;
  }
  
  .filter-description {
    font-size: 13px;
    color: #5a6c7d;
    margin: 0 0 8px 0;
  }
  
  .option-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .option-btn {
    padding: 10px;
    border: 1px solid #dcdfe6;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #606266;
    transition: all 0.2s;

    &:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    &.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }
  }
  
  .exact-match {
    margin: 0 0 20px 0;
  }
  
  .range-inputs {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;

    .el-select,
    .el-input {
      flex: 1;
    }
  }
  
  .range-separator {
    color: #909399;
    font-weight: 600;
  }
  
  .filter-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #e8ecef;

    .el-button {
      flex: 1;
    }
  }
}
</style>

