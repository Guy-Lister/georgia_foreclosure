import type { Property } from '@/types/property'
import { mockProperties } from '@/data/mockProperties'

export const fetchProperties = (): Promise<Property[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProperties)
    }, 500)
  })
}

export const formatCurrency = (value: number | null): string => {
  if (!value) return '$-'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

export const formatShortNumber = (value: number | null): string => {
  if (!value) return '-'
  if (value >= 1000) {
    return Math.round(value / 1000) + 'k'
  }
  return value.toString()
}

