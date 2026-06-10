import { useEffect, type RefObject } from 'react'

/**
 * useSmoothScroll
 * Ensures CSS scroll-behavior is smooth at the document level.
 * Kept intentionally lightweight — a heavier library (Lenis) can be
 * swapped in here without touching call sites.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = previous
    }
  }, [])
}

/**
 * useClipReveal
 * Clips an element from 0 height → full height on scroll enter.
 */
export function useClipReveal(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.clipPath = 'inset(0 0 0% 0)'
            el.style.opacity = '1'
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.05 }
    )

    elements.forEach((el) => {
      el.style.clipPath = 'inset(0 0 100% 0)'
      el.style.opacity = '0'
      el.style.transition =
        'clip-path 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [selector])
}

/**
 * useParallax
 * Translates `ref` at a slower rate than scroll. Offset is measured once
 * on mount so subsequent transforms stay in document space.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, speed = 0.3) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const documentOffset = el.getBoundingClientRect().top + window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const delta = (window.scrollY - documentOffset) * speed
        el.style.transform = `translate3d(0, ${delta}px, 0)`
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref, speed])
}

/**
 * useDragCarousel
 * Drag-to-scroll horizontal carousel with momentum and progress bar.
 */
export function useDragCarousel(
  trackRef: RefObject<HTMLElement | null>,
  progressRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0
    let velX = 0
    let lastX = 0
    let rafId = 0

    const updateProgress = () => {
      const progress = progressRef.current
      if (!progress) return
      const max = track.scrollWidth - track.clientWidth
      const pct = max > 0 ? track.scrollLeft / max : 0
      progress.style.transform = `scaleX(${Math.min(Math.max(pct, 0), 1)})`
    }

    const applyMomentum = () => {
      if (Math.abs(velX) < 0.5) return
      velX *= 0.92
      track.scrollLeft -= velX
      updateProgress()
      rafId = requestAnimationFrame(applyMomentum)
    }

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX - track.offsetLeft
      scrollLeft = track.scrollLeft
      lastX = e.pageX
      track.style.cursor = 'grabbing'
      track.classList.add('dragging')
      cancelAnimationFrame(rafId)
    }

    const stop = () => {
      if (!isDown) return
      isDown = false
      track.style.cursor = 'grab'
      track.classList.remove('dragging')
      applyMomentum()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      velX = e.pageX - lastX
      lastX = e.pageX
      const x = e.pageX - track.offsetLeft
      const walk = (x - startX) * 1.5
      track.scrollLeft = scrollLeft - walk
      updateProgress()
    }

    track.style.cursor = 'grab'
    track.addEventListener('mousedown', onMouseDown)
    track.addEventListener('mouseleave', stop)
    track.addEventListener('mouseup', stop)
    track.addEventListener('mousemove', onMouseMove)

    return () => {
      track.removeEventListener('mousedown', onMouseDown)
      track.removeEventListener('mouseleave', stop)
      track.removeEventListener('mouseup', stop)
      track.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [trackRef, progressRef])
}

/**
 * useSplitTextReveal
 * Splits a heading into words/characters and reveals with stagger on enter.
 * Caches the original text so cleanup restores it intact.
 */
export function useSplitTextReveal(
  ref: RefObject<HTMLElement | null>,
  options: { type?: 'words' | 'chars'; delay?: number } = {}
) {
  const { type = 'words', delay = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const originalHTML = el.innerHTML
    const originalText = el.textContent ?? ''
    const units =
      type === 'chars' ? originalText.split('') : originalText.split(' ')

    el.innerHTML = units
      .map((unit, i) => {
        const display = unit === ' ' ? '&nbsp;' : unit
        const sep = type === 'words' && i < units.length - 1 ? '&nbsp;' : ''
        return `<span class="split-unit" style="display:inline-block;opacity:0;transform:translateY(60%) skewY(4deg);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay + i * 50}ms,transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay + i * 50}ms;">${display}${sep}</span>`
      })
      .join('')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (!entry.isIntersecting) return
        el.querySelectorAll<HTMLSpanElement>('.split-unit').forEach((span) => {
          span.style.opacity = '1'
          span.style.transform = 'translateY(0) skewY(0deg)'
        })
        observer.disconnect()
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      el.innerHTML = originalHTML
    }
  }, [ref, type, delay])
}

/**
 * useMetaBarCounter
 * Returns zero-padded current/total strings for a section counter.
 */
export function useMetaBarCounter(total: number, activeIndex: number) {
  const formatted = (n: number) => String(n).padStart(2, '0')
  return {
    current: formatted(activeIndex + 1),
    total: formatted(total),
  }
}
