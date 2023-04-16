import { FLAG_FARM } from 'config/flag'
import { Atom, useAtomValue } from 'jotai'
import { createJSONStorage } from 'jotai/utils'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'

const storage = { ...createJSONStorage(() => sessionStorage), delayInit: true }
export const featureFarmApiAtom = atomWithStorageWithErrorCatch<typeof FLAG_FARM>(
  'feature-farm-api',
  FLAG_FARM,
  // @ts-ignore
  storage,
)

featureFarmApiAtom.onMount = (set) => {
  const params = new URL(window.location.href).searchParams
  const flag = params.get('use')
  if (flag === 'farmApi') {
    set('api')
  }
}

export function useFeatureFlag<T>(featureAtom: Atom<T>) {
  return useAtomValue(featureAtom)
}
