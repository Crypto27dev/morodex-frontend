import { useAccount } from 'wagmi'
import { getAchievements } from 'state/achievements/helpers'
import { useTranslation } from '@pancakeswap/localization'
import { FetchStatus } from 'config/constants/types'
import useSWR, { KeyedMutator } from 'swr'
import { localStorageMiddleware } from 'hooks/useSWRContract'
import useSWRImmutable from 'swr/immutable'
import { getProfile, GetProfileResponse } from './helpers'
import { Profile } from '../types'

export const useProfileForAddress = (
  address: string,
  fetchConfiguration = {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  },
): {
  profile?: Profile
  isFetching: boolean
  isValidating: boolean
  refresh: KeyedMutator<GetProfileResponse>
} => {
  const { data, status, mutate, isValidating } = useSWR(
    address ? [address, 'profile'] : null,
    () => getProfile(address),
    fetchConfiguration,
  )

  const { profile } = data ?? { profile: null }

  return {
    profile,
    isFetching: status === FetchStatus.Fetching,
    isValidating,
    refresh: mutate,
  }
}

export const useAchievementsForAddress = (address: string) => {
  const { t } = useTranslation()

  const { data, status, mutate } = useSWRImmutable(address ? [address, 'achievements'] : null, () =>
    getAchievements(address, t),
  )

  return {
    achievements: data || [],
    isFetching: status === FetchStatus.Fetching,
    refresh: mutate,
  }
}

export const useProfile = (): {
  profile?: Profile
  hasProfile: boolean
  hasActiveProfile: boolean
  isInitialized: boolean
  isLoading: boolean
  refresh: KeyedMutator<GetProfileResponse>
} => {
  const { address: account } = useAccount()
  const { data, status, mutate } = useSWRImmutable(account ? [account, 'profile'] : null, () => getProfile(account), {
    use: [localStorageMiddleware],
  })

  const { profile, hasRegistered } = data ?? ({ profile: null, hasRegistered: false } as GetProfileResponse)

  const isLoading = status === FetchStatus.Fetching
  const isInitialized = status === FetchStatus.Fetched || status === FetchStatus.Failed
  const hasProfile = isInitialized && hasRegistered
  const hasActiveProfile = hasProfile && profile?.isActive

  return { profile, hasProfile, hasActiveProfile, isInitialized, isLoading, refresh: mutate }
}
