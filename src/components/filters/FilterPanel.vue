<template>
  <div class="filter-panel">
    <div class="filter-group">
      <label class="filter-label">County</label>
      <el-select 
        v-model="localFilters.county" 
        placeholder="Select County"
        @change="handleCountyChange"
        class="filter-select"
      >
        <el-option 
          v-for="county in counties" 
          :key="county" 
          :label="county === 'all' ? 'All Counties' : county" 
          :value="county"
        />
      </el-select>
    </div>

    <div class="filter-group">
      <label class="filter-label">Month</label>
      <el-select 
        v-model="localFilters.month" 
        placeholder="Select Month"
        @change="handleMonthChange"
        class="filter-select"
      >
        <el-option 
          v-for="month in months" 
          :key="month" 
          :label="month === 'all' ? 'All Months' : month" 
          :value="month"
        />
      </el-select>
    </div>

    <div class="filter-group">
      <label class="filter-label">List</label>
      <el-select 
        v-model="localFilters.listType" 
        placeholder="Select List Type"
        @change="handleListTypeChange"
        class="filter-select"
      >
        <el-option 
          v-for="type in listTypes" 
          :key="type.value" 
          :label="type.label" 
          :value="type.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { counties, months, listTypes } from '@/data/mockProperties'

const store = useStore()

const localFilters = reactive({
  county: 'all',
  month: 'January',
  listType: 'all'
})

onMounted(() => {
  localFilters.county = store.state.filters.county
  localFilters.month = store.state.filters.month
  localFilters.listType = store.state.filters.listType
})

const handleCountyChange = (value: string): void => {
  store.dispatch('filters/updateCounty', value)
}

const handleMonthChange = (value: string): void => {
  store.dispatch('filters/updateMonth', value)
}

const handleListTypeChange = (value: string): void => {
  store.dispatch('filters/updateListType', value)
}
</script>

<style lang="scss" scoped>
.filter-panel {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
}

.filter-select {
  width: 100%;
}
</style>

