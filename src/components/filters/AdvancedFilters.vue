<template>
  <el-drawer
    v-model="showDrawer"
    :title="drawerTitle"
    :size="400"
    direction="rtl"
  >
    <div class="advanced-filters">
      <!-- Beds & Baths Section -->
      <div class="filter-section" v-if="filterType === 'beds'">
        <h4 class="section-title">Number of Bedrooms</h4>
        <div class="option-buttons">
          <button 
            v-for="num in [null, 1, 2, 3, 4, 5]" 
            :key="num"
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

        <h4 class="section-title">Number of Bathrooms</h4>
        <div class="option-buttons">
          <button 
            v-for="num in [null, 1, 1.5, 2, 3, 4]" 
            :key="num"
            class="option-btn"
            :class="{ active: bathrooms === num }"
            @click="bathrooms = num"
          >
            {{ num === null ? 'Any' : num + '+' }}
          </button>
        </div>

        <div class="drawer-actions">
          <el-button @click="resetBedsAndBaths">Reset</el-button>
          <el-button type="primary" @click="applyBedsAndBaths">Apply</el-button>
        </div>
      </div>

      <!-- Value & Debt Section -->
      <div class="filter-section" v-if="filterType === 'value'">
        <h4 class="section-title">Estimated After Repair Value</h4>
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

        <h4 class="section-title">Foreclosure Amount</h4>
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

        <div class="drawer-actions">
          <el-button @click="resetValueAndDebt">Reset</el-button>
          <el-button type="primary" @click="applyValueAndDebt">Apply</el-button>
        </div>
      </div>

      <!-- More Filters Section -->
      <div class="filter-section" v-if="filterType === 'more'">
        <h4 class="section-title">Year Built</h4>
        <div class="range-inputs">
          <el-input v-model.number="minYearBuilt" placeholder="No Min" clearable />
          <span class="range-separator">-</span>
          <el-input v-model.number="maxYearBuilt" placeholder="No Max" clearable />
        </div>

        <h4 class="section-title">Finished Square Footage</h4>
        <div class="range-inputs">
          <el-input v-model.number="minSqFt" placeholder="No Min" clearable />
          <span class="range-separator">-</span>
          <el-input v-model.number="maxSqFt" placeholder="No Max" clearable />
        </div>

        <h4 class="section-title">Incomplete Data</h4>
        <p class="section-description">
          Include Properties with incomplete data in results?
        </p>
        <el-radio-group v-model="includeIncompleteData">
          <el-radio :label="true">Yes</el-radio>
          <el-radio :label="false">No</el-radio>
        </el-radio-group>

        <div class="drawer-actions">
          <el-button @click="resetMoreFilters">Reset</el-button>
          <el-button type="primary" @click="applyMoreFilters">Apply</el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

interface Props {
  modelValue: boolean
  filterType: 'beds' | 'value' | 'more'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  filterType: 'beds'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const store = useStore()

const showDrawer = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const drawerTitle = computed(() => {
  switch (props.filterType) {
    case 'beds':
      return 'Beds & Baths'
    case 'value':
      return 'Value & Debt'
    case 'more':
      return 'More Filters'
    default:
      return 'Filters'
  }
})

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

watch(() => props.modelValue, (newVal: boolean) => {
  if (newVal) {
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
  }
})

const applyBedsAndBaths = (): void => {
  store.dispatch('filters/updateBedrooms', bedrooms.value)
  store.dispatch('filters/updateBathrooms', bathrooms.value)
  store.commit('filters/SET_EXACT_BEDROOMS', exactBedrooms.value)
  store.dispatch('properties/applyFilters')
  showDrawer.value = false
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
  showDrawer.value = false
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
  showDrawer.value = false
}

const resetMoreFilters = (): void => {
  minYearBuilt.value = null
  maxYearBuilt.value = null
  minSqFt.value = null
  maxSqFt.value = null
  includeIncompleteData.value = true
}
</script>

<style lang="scss" scoped>
.advanced-filters {
  padding: 16px 0;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.section-description {
  font-size: 13px;
  color: #5a6c7d;
  margin: 0;
}

.option-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
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
  margin: 0;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 12px;

  .el-select,
  .el-input {
    flex: 1;
  }
}

.range-separator {
  color: #909399;
  font-weight: 600;
}

.drawer-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #e8ecef;

  .el-button {
    flex: 1;
  }
}
</style>

