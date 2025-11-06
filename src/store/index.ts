import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import type { RootState } from '@/types/store'
import properties from './modules/properties'
import filters from './modules/filters'
import ui from './modules/ui'

export const key: InjectionKey<Store<RootState>> = Symbol()

export default createStore<RootState>({
  modules: {
    properties,
    filters,
    ui
  },
  strict: process.env.NODE_ENV !== 'production'
})

