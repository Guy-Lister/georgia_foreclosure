import type { Module } from 'vuex'
import type { Property } from '@/types/property'
import type { UIState, RootState } from '@/types/store'
import type { ViewMode, MapType } from '@/types/property'

const state = (): UIState => ({
  viewMode: 'tile',
  mapType: 'map',
  showFilters: false,
  selectedProperty: null
})

const getters = {
  viewMode: (state: UIState): ViewMode => state.viewMode,
  mapType: (state: UIState): MapType => state.mapType,
  showFilters: (state: UIState): boolean => state.showFilters,
  selectedProperty: (state: UIState): Property | null => state.selectedProperty
}

const mutations = {
  SET_VIEW_MODE(state: UIState, mode: ViewMode): void {
    state.viewMode = mode
  },
  
  SET_MAP_TYPE(state: UIState, type: MapType): void {
    state.mapType = type
  },
  
  TOGGLE_FILTERS(state: UIState): void {
    state.showFilters = !state.showFilters
  },
  
  SET_SHOW_FILTERS(state: UIState, show: boolean): void {
    state.showFilters = show
  },
  
  SET_SELECTED_PROPERTY(state: UIState, property: Property | null): void {
    state.selectedProperty = property
  }
}

const actions = {
  setViewMode({ commit }: { commit: Function }, mode: ViewMode): void {
    commit('SET_VIEW_MODE', mode)
  },
  
  setMapType({ commit }: { commit: Function }, type: MapType): void {
    commit('SET_MAP_TYPE', type)
  },
  
  toggleFilters({ commit }: { commit: Function }): void {
    commit('TOGGLE_FILTERS')
  },
  
  selectProperty({ commit }: { commit: Function }, property: Property | null): void {
    commit('SET_SELECTED_PROPERTY', property)
  }
}

const uiModule: Module<UIState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default uiModule

