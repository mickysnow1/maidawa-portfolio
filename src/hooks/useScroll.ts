import { useEffect, useRef } from 'react'

/**
 * useRevealOnScroll
 * Adds 'visible' class to `.reveal` elements as they enter the viewport.
 * Watches the DOM via MutationObserver so dynamically-added cards (e.g.
 * after filter changes) also get observed.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('.reveal:not(.visible)').forEach((el) => io.observe(el))
    }

    observe(document)

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.classList?.contains('reveal') && !node.classList.contains('visible')) {
            io.observe(node)
          }
          observe(node)
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

/**
 * useScrollProgress
 * Returns a ref that tracks how far through the element the viewport is.
 * Exposes the value via the CSS custom property `--scroll-progress`.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const progress = Math.min(
        Math.max((windowH - rect.top) / (windowH + rect.height), 0),
        1
      )
      el.style.setProperty('--scroll-progress', progress.toString())
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return ref
}
