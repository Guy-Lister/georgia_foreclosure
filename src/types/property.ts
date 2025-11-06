export interface Property {
  id: number
  address: string
  city: string
  state: string
  zipCode: string
  county: string
  month: string
  listType: string
  afterRepairValue: number
  foreclosureAmount: number | null
  beds: number
  baths: number
  sqFt: number
  yearBuilt: number
  lat: number
  lng: number
  imageUrl: string
  hasCompleteData: boolean
}

export interface PropertyFilters {
  county: string
  month: string
  listType: string
  bedrooms: number | null
  bathrooms: number | null
  exactBedrooms: boolean
  minValue: number | null
  maxValue: number | null
  minForeclosure: number | null
  maxForeclosure: number | null
  minLoanScore: number | null
  maxLoanScore: number | null
  minYearBuilt: number | null
  maxYearBuilt: number | null
  minSqFt: number | null
  maxSqFt: number | null
  includeIncompleteData: boolean
}

export interface ListTypeOption {
  value: string
  label: string
}

export type ViewMode = 'tile' | 'list' | 'map'

export type MapType = 'map' | 'satellite'

