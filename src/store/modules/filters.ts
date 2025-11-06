import type { Module } from 'vuex'
import type { FiltersState, RootState } from '@/types/store'

const state = (): FiltersState => ({
  county: 'all',
  month: 'January',
  listType: 'all',
  bedrooms: null,
  bathrooms: null,
  exactBedrooms: false,
  minValue: null,
  maxValue: null,
  minForeclosure: null,
  maxForeclosure: null,
  minLoanScore: null,
  maxLoanScore: null,
  minYearBuilt: null,
  maxYearBuilt: null,
  minSqFt: null,
  maxSqFt: null,
  includeIncompleteData: true
})

const getters = {
  activeFilters: (state: FiltersState): Record<string, any> => {
    const filters: Record<string, any> = {}
    Object.keys(state).forEach(key => {
      const k = key as keyof FiltersState
      const value = state[k]
      if (value !== null && value !== 'all' && value !== false) {
        if (k === 'includeIncompleteData' && value === true) {
          return
        }
        filters[k] = value
      }
    })
    return filters
  },
  
  hasActiveFilters: (_state: FiltersState, getters: any): boolean => {
    return Object.keys(getters.activeFilters).length > 0
  }
}

const mutations = {
  SET_COUNTY(state: FiltersState, county: string): void {
    state.county = county
  },
  
  SET_MONTH(state: FiltersState, month: string): void {
    state.month = month
  },
  
  SET_LIST_TYPE(state: FiltersState, listType: string): void {
    state.listType = listType
  },
  
  SET_BEDROOMS(state: FiltersState, bedrooms: number | null): void {
    state.bedrooms = bedrooms
  },
  
  SET_BATHROOMS(state: FiltersState, bathrooms: number | null): void {
    state.bathrooms = bathrooms
  },
  
  SET_EXACT_BEDROOMS(state: FiltersState, exact: boolean): void {
    state.exactBedrooms = exact
  },
  
  SET_VALUE_RANGE(state: FiltersState, { min, max }: { min: number | null; max: number | null }): void {
    state.minValue = min
    state.maxValue = max
  },
  
  SET_FORECLOSURE_RANGE(state: FiltersState, { min, max }: { min: number | null; max: number | null }): void {
    state.minForeclosure = min
    state.maxForeclosure = max
  },
  
  SET_LOAN_SCORE_RANGE(state: FiltersState, { min, max }: { min: number | null; max: number | null }): void {
    state.minLoanScore = min
    state.maxLoanScore = max
  },
  
  SET_YEAR_RANGE(state: FiltersState, { min, max }: { min: number | null; max: number | null }): void {
    state.minYearBuilt = min
    state.maxYearBuilt = max
  },
  
  SET_SQFT_RANGE(state: FiltersState, { min, max }: { min: number | null; max: number | null }): void {
    state.minSqFt = min
    state.maxSqFt = max
  },
  
  SET_INCLUDE_INCOMPLETE(state: FiltersState, include: boolean): void {
    state.includeIncompleteData = include
  },
  
  RESET_FILTERS(state: FiltersState): void {
    state.county = 'all'
    state.month = 'January'
    state.listType = 'all'
    state.bedrooms = null
    state.bathrooms = null
    state.exactBedrooms = false
    state.minValue = null
    state.maxValue = null
    state.minForeclosure = null
    state.maxForeclosure = null
    state.minLoanScore = null
    state.maxLoanScore = null
    state.minYearBuilt = null
    state.maxYearBuilt = null
    state.minSqFt = null
    state.maxSqFt = null
    state.includeIncompleteData = true
  }
}

const actions = {
  updateCounty({ commit, dispatch }: { commit: Function; dispatch: Function }, county: string): void {
    commit('SET_COUNTY', county)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateMonth({ commit, dispatch }: { commit: Function; dispatch: Function }, month: string): void {
    commit('SET_MONTH', month)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateListType({ commit, dispatch }: { commit: Function; dispatch: Function }, listType: string): void {
    commit('SET_LIST_TYPE', listType)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateBedrooms({ commit, dispatch }: { commit: Function; dispatch: Function }, bedrooms: number | null): void {
    commit('SET_BEDROOMS', bedrooms)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateBathrooms({ commit, dispatch }: { commit: Function; dispatch: Function }, bathrooms: number | null): void {
    commit('SET_BATHROOMS', bathrooms)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateValueRange({ commit, dispatch }: { commit: Function; dispatch: Function }, range: { min: number | null; max: number | null }): void {
    commit('SET_VALUE_RANGE', range)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateForeclosureRange({ commit, dispatch }: { commit: Function; dispatch: Function }, range: { min: number | null; max: number | null }): void {
    commit('SET_FORECLOSURE_RANGE', range)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateYearRange({ commit, dispatch }: { commit: Function; dispatch: Function }, range: { min: number | null; max: number | null }): void {
    commit('SET_YEAR_RANGE', range)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateSqFtRange({ commit, dispatch }: { commit: Function; dispatch: Function }, range: { min: number | null; max: number | null }): void {
    commit('SET_SQFT_RANGE', range)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  updateIncompleteData({ commit, dispatch }: { commit: Function; dispatch: Function }, include: boolean): void {
    commit('SET_INCLUDE_INCOMPLETE', include)
    dispatch('properties/applyFilters', null, { root: true })
  },
  
  resetFilters({ commit, dispatch }: { commit: Function; dispatch: Function }): void {
    commit('RESET_FILTERS')
    dispatch('properties/applyFilters', null, { root: true })
  }
}

const filtersModule: Module<FiltersState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default filtersModule

