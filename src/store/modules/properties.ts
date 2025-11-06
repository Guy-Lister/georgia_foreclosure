import type { Module } from 'vuex'
import type { Property } from '@/types/property'
import type { PropertiesState, RootState } from '@/types/store'
import { fetchProperties } from '@/services/propertyService'

const state = (): PropertiesState => ({
  allProperties: [],
  filteredProperties: [],
  favoriteIds: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 12
})

const getters = {
  properties: (state: PropertiesState): Property[] => state.filteredProperties,
  
  paginatedProperties: (state: PropertiesState): Property[] => {
    const start = (state.currentPage - 1) * state.pageSize
    const end = start + state.pageSize
    return state.filteredProperties.slice(start, end)
  },
  
  totalProperties: (state: PropertiesState): number => state.filteredProperties.length,
  
  totalPages: (state: PropertiesState): number => 
    Math.ceil(state.filteredProperties.length / state.pageSize),
  
  isFavorite: (state: PropertiesState) => (id: number): boolean => 
    state.favoriteIds.includes(id),
  
  isLoading: (state: PropertiesState): boolean => state.loading
}

const mutations = {
  SET_PROPERTIES(state: PropertiesState, properties: Property[]): void {
    state.allProperties = properties
    state.filteredProperties = properties
  },
  
  SET_FILTERED_PROPERTIES(state: PropertiesState, properties: Property[]): void {
    state.filteredProperties = properties
    state.currentPage = 1
  },
  
  SET_LOADING(state: PropertiesState, loading: boolean): void {
    state.loading = loading
  },
  
  SET_ERROR(state: PropertiesState, error: string | null): void {
    state.error = error
  },
  
  TOGGLE_FAVORITE(state: PropertiesState, propertyId: number): void {
    const index = state.favoriteIds.indexOf(propertyId)
    if (index > -1) {
      state.favoriteIds.splice(index, 1)
    } else {
      state.favoriteIds.push(propertyId)
    }
  },
  
  SET_CURRENT_PAGE(state: PropertiesState, page: number): void {
    state.currentPage = page
  },
  
  SET_PAGE_SIZE(state: PropertiesState, size: number): void {
    state.pageSize = size
    state.currentPage = 1
  }
}

const actions = {
  async loadProperties({ commit }: { commit: Function }): Promise<void> {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const properties = await fetchProperties()
      commit('SET_PROPERTIES', properties)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      commit('SET_ERROR', errorMessage)
      console.error('Error loading properties:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  applyFilters({ commit, state, rootState }: { commit: Function; state: PropertiesState; rootState: RootState }): void {
    const filters = rootState.filters
    
    let filtered = [...state.allProperties]
    
    if (filters.county && filters.county !== 'all') {
      filtered = filtered.filter(p => p.county === filters.county)
    }
    
    if (filters.month && filters.month !== 'all') {
      filtered = filtered.filter(p => p.month === filters.month)
    }
    
    if (filters.listType && filters.listType !== 'all') {
      filtered = filtered.filter(p => p.listType === filters.listType)
    }
    
    if (filters.bedrooms) {
      if (filters.exactBedrooms) {
        filtered = filtered.filter(p => p.beds === filters.bedrooms)
      } else {
        filtered = filtered.filter(p => p.beds >= filters.bedrooms!)
      }
    }
    
    if (filters.bathrooms) {
      filtered = filtered.filter(p => p.baths >= filters.bathrooms!)
    }
    
    if (filters.minValue) {
      filtered = filtered.filter(p => p.afterRepairValue >= filters.minValue!)
    }
    if (filters.maxValue) {
      filtered = filtered.filter(p => p.afterRepairValue <= filters.maxValue!)
    }
    
    if (filters.minForeclosure && filters.minForeclosure > 0) {
      filtered = filtered.filter(p => p.foreclosureAmount && p.foreclosureAmount >= filters.minForeclosure!)
    }
    if (filters.maxForeclosure && filters.maxForeclosure > 0) {
      filtered = filtered.filter(p => p.foreclosureAmount && p.foreclosureAmount <= filters.maxForeclosure!)
    }
    
    if (filters.minYearBuilt) {
      filtered = filtered.filter(p => p.yearBuilt >= filters.minYearBuilt!)
    }
    if (filters.maxYearBuilt) {
      filtered = filtered.filter(p => p.yearBuilt <= filters.maxYearBuilt!)
    }
    
    if (filters.minSqFt) {
      filtered = filtered.filter(p => p.sqFt >= filters.minSqFt!)
    }
    if (filters.maxSqFt) {
      filtered = filtered.filter(p => p.sqFt <= filters.maxSqFt!)
    }
    
    if (!filters.includeIncompleteData) {
      filtered = filtered.filter(p => p.hasCompleteData)
    }
    
    commit('SET_FILTERED_PROPERTIES', filtered)
  },
  
  toggleFavorite({ commit }: { commit: Function }, propertyId: number): void {
    commit('TOGGLE_FAVORITE', propertyId)
  },
  
  setPage({ commit }: { commit: Function }, page: number): void {
    commit('SET_CURRENT_PAGE', page)
  }
}

const propertiesModule: Module<PropertiesState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default propertiesModule

