import { useCallback, useEffect, useState } from 'react'

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

  // Start with fallback so SSR and the first client paint match (avoids hydration errors).
  const [value, setValue] = useState<T>(fallback)

  useEffect(() => {
    setValue(readValue())

    const onPopState = () => setValue(readValue())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [readValue])

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
    setValue(nextValue)
  }, [fallback, key])

  return [value, updateValue] as const
}
