import { useState, useEffect, useRef } from 'react'
import styles from './Nav.module.css'
import { ArrowRight } from '../Icon/Icons'

const NAV_ITEMS = [
  { label: 'about',   href: '#about'   },
  { label: 'skills',  href: '#skills'  },
  { label: 'work',    href: '#projects' },
  { label: 'why me',  href: '#why-me'  },
  { label: 'contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [activeId, setActiveId] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const ratiosRef = useRef<Record<string, number>>({})

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const nextScrolled = y > 50
        const nextHidden   = y > lastY && y > 150
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled))
        setHidden((prev)   => (prev === nextHidden   ? prev : nextHidden))
        lastY = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = [
      document.querySelector('#hero'),
      ...NAV_ITEMS.map(({ href }) => document.querySelector(href)),
    ]
      .filter((el): el is Element => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current[entry.target.id] = entry.intersectionRatio
        })
        const top = Object.entries(ratiosRef.current).reduce<{ id: string; ratio: number }>(
          (acc, [id, ratio]) => (ratio > acc.ratio ? { id, ratio } : acc),
          { id: '', ratio: 0 }
        )
        if (top.id === 'hero') {
          setActiveId('')
          return
        }
        if (top.id && top.ratio > 0) setActiveId(top.id)
      },
      { threshold: [0.15, 0.35, 0.55, 0.75] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const navClass = [
    styles.nav,
    scrolled ? styles.scrolled : '',
    hidden   ? styles.hidden   : '',
  ].join(' ')

  return (
    <header className={navClass} role="banner">
      <div className={styles.inner}>
        <a href="#hero" className={styles.wordmark} aria-label="Michael — home">
          MICHAEL
        </a>

        <nav className={styles.links} aria-label="Main navigation">
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`${styles.link} ${activeId === href.slice(1) ? styles.active : ''}`}
              aria-current={activeId === href.slice(1) ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.ctaWrap}>
          <a href="#contact" className="btn-pill">
            <span>Let's talk</span>
            <span className="btn-icon-arrow"><ArrowRight size={15} /></span>
          </a>
        </div>

        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-drawer"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.drawerLinks}>
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={styles.drawerLink}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-pill"
            style={{ marginTop: '2rem' }}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>Let's talk</span>
            <span className="btn-icon-arrow"><ArrowRight size={15} /></span>
          </a>
        </div>
      </div>
    </header>
  )
}
