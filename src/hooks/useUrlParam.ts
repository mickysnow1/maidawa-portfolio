import { useCallback, useSyncExternalStore } from 'react'

export function useUrlParam<T extends string>(
  key: string,
  fallback: T,
  allowedValues: readonly T[]
) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return fallback

    const value = new URLSearchParams(window.location.search).get(key)
    return allowedValues.includes(value as T) ? (value as T) : fallback
  }, [allowedValues, fallback, key])

  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('popstate', onStoreChange)
    return () => window.removeEventListener('popstate', onStoreChange)
  }, [])

  const value = useSyncExternalStore(subscribe, readValue, () => fallback)

  const updateValue = useCallback((nextValue: T) => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    if (nextValue === fallback) {
      params.delete(key)
    } else {
      params.set(key, nextValue)
    }

    const nextSearch = params.toString()
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`
    window.history.replaceState(null, '', nextUrl)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [fallback, key])

  return [value, updateValue] as const
}
