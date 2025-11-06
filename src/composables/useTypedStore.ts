import { useStore as baseUseStore } from 'vuex'
import type { Store } from 'vuex'
import type { RootState } from '@/types/store'
import { key } from '@/store'

export function useTypedStore(): Store<RootState> {
  return baseUseStore(key)
}

