import type { Property, PropertyFilters, ViewMode, MapType } from './property'

export interface PropertiesState {
  allProperties: Property[]
  filteredProperties: Property[]
  favoriteIds: number[]
  loading: boolean
  error: string | null
  currentPage: number
  pageSize: number
}

export interface FiltersState extends PropertyFilters {}

export interface UIState {
  viewMode: ViewMode
  mapType: MapType
  showFilters: boolean
  selectedProperty: Property | null
}

export interface RootState {
  properties: PropertiesState
  filters: FiltersState
  ui: UIState
}

