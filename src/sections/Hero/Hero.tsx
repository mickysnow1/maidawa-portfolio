import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'
import { ArrowRight } from '../../components/Icon/Icons'

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef   = useRef<HTMLButtonElement>(null)
  const modalRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!modalOpen) return

    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false)
        return
      }
      if (e.key !== 'Tab') return

      const container = modalRef.current
      if (!container) return
      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (!first || !last) return
      const active = document.activeElement as HTMLElement | null

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      trigger?.focus()
    }
  }, [modalOpen])

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={`section-label reveal ${styles.eyebrow}`}>
              Frontend Portfolio
            </div>

            <h1 id="hero-heading" className={`reveal ${styles.title}`}>
              Michael<br />Maidawa
            </h1>

            <p className={`reveal ${styles.role}`}>
              Web Developer
            </p>

            <p className={`reveal ${styles.subtext}`}>
              I craft clean, responsive, and user-centered digital experiences
              using React, Next.js, and Tailwind CSS.
            </p>

            <p className={`reveal ${styles.shortBio}`}>
              Turning Figma designs into pixel-perfect, high-quality code.
              Passionate about building intuitive interfaces that users love.
            </p>

            <div className={`reveal ${styles.actionWrap}`}>
              <a href="#projects" className="btn-pill">
                <span>View My Projects</span>
                <span className="btn-icon-arrow"><ArrowRight size={15} /></span>
              </a>
              <a href="/Michael_Maidawa_Resume.docx" download="Michael_Maidawa_Resume.docx" className="btn-pill-outline">
                <span>Download CV</span>
              </a>
            </div>
          </div>

          <div className={`reveal ${styles.right}`}>
            <div className={styles.visualContainer}>
              <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.engravingSvg}
                role="img"
                aria-label="Architectural drafting compass illustration"
              >
                <circle cx="200" cy="200" r="180" stroke="#111" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
                <circle cx="200" cy="200" r="140" stroke="#111" strokeWidth="0.5" opacity="0.4" />
                <circle cx="200" cy="200" r="80"  stroke="#111" strokeWidth="0.75" />

                <line x1="20"  y1="200" x2="380" y2="200" stroke="#111" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
                <line x1="200" y1="20"  x2="200" y2="380" stroke="#111" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />

                <line x1="72" y1="72"  x2="328" y2="328" stroke="#111" strokeWidth="0.25" opacity="0.3" />
                <line x1="72" y1="328" x2="328" y2="72"  stroke="#111" strokeWidth="0.25" opacity="0.3" />

                <path d="M 120 200 L 200 120 L 280 200 L 200 280 Z" stroke="#111" strokeWidth="0.75" />
                <path d="M 150 200 L 200 150 L 250 200 L 200 250 Z" stroke="#111" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.6" />

                <g transform="translate(200, 200)">
                  <line x1="0" y1="0" x2="-60" y2="120" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="-60" y1="120" x2="-65" y2="140" stroke="#111" strokeWidth="1" strokeLinecap="round" />

                  <line x1="0" y1="0" x2="60" y2="120" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="60" y1="120" x2="65" y2="140" stroke="#111" strokeWidth="1" strokeLinecap="round" />

                  <circle cx="0" cy="0" r="10" fill="#E1E4D7" stroke="#111" strokeWidth="2" />
                  <circle cx="0" cy="0" r="4" fill="#111" />

                  <path d="M -45 90 Q 0 100 45 90" stroke="#111" strokeWidth="1" fill="none" />
                  <circle cx="-15" cy="94" r="3" fill="#111" />
                  <circle cx="15"  cy="94" r="3" fill="#111" />

                  <line x1="-30" y1="130" x2="-10" y2="130" stroke="#111" strokeWidth="0.5" opacity="0.4" />
                  <line x1="-25" y1="135" x2="-15" y2="135" stroke="#111" strokeWidth="0.5" opacity="0.4" />
                  <line x1="10"  y1="130" x2="30"  y2="130" stroke="#111" strokeWidth="0.5" opacity="0.4" />
                  <line x1="15"  y1="135" x2="25"  y2="135" stroke="#111" strokeWidth="0.5" opacity="0.4" />
                </g>

                <text x="210" y="45"  fontFamily="var(--font-mono)" fontSize="8" fill="#111" opacity="0.6">ALIGN: 1:1</text>
                <text x="35"  y="215" fontFamily="var(--font-mono)" fontSize="8" fill="#111" opacity="0.6">REACT_FIDELITY</text>
                <text x="270" y="365" fontFamily="var(--font-mono)" fontSize="8" fill="#111" opacity="0.6">A11Y_SEMANTIC</text>
              </svg>
            </div>
          </div>
        </div>

        <div className={`reveal ${styles.statsSection}`}>
          <div className={styles.statsContainer}>
            <Stat label="Years of Experience" target={5}  suffix="+" />
            <Stat label="Projects Shipped"    target={12} suffix="+" />
            <Stat label="Design Tokens Mapped" target={240} suffix="+" />
          </div>

          <div className={styles.disclosureWrap}>
            <button
              ref={triggerRef}
              type="button"
              className={styles.disclosureBtn}
              onClick={() => setModalOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={modalOpen}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.infoIcon} aria-hidden="true">
                <path d="M7.42045 12.5V5.95455H8.42614V12.5H7.42045ZM7.93182 4.86364C7.7358 4.86364 7.56676 4.79688 7.42472 4.66335C7.28551 4.52983 7.21591 4.36932 7.21591 4.18182C7.21591 3.99432 7.28551 3.83381 7.42472 3.70028C7.56676 3.56676 7.7358 3.5 7.93182 3.5C8.12784 3.5 8.29545 3.56676 8.43466 3.70028C8.5767 3.83381 8.64773 3.99432 8.64773 4.18182C8.64773 4.36932 8.5767 4.52983 8.43466 4.66335C8.29545 4.79688 8.12784 4.86364 7.93182 4.86364Z" fill="currentColor"/>
                <circle cx="8" cy="8" r="7.5" stroke="currentColor"/>
              </svg>
              <span>See credentials</span>
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div
            ref={modalRef}
            className={styles.modalInner}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className={styles.modalHeader}>
              <h2 id="modal-title" className={styles.modalTitle}>Credentials</h2>
              <button
                ref={closeRef}
                type="button"
                className={styles.modalClose}
                onClick={() => setModalOpen(false)}
                aria-label="Close credentials"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="8" y1="8"  x2="24" y2="24" />
                  <line x1="24" y1="8" x2="8"  y2="24" />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <p><strong>Years of Experience:</strong> Verified active industry service since 2021, specialising in scalable frontend architectures and responsive systems.</p>
              <br />
              <p><strong>Projects Completed:</strong> Multi-niche production deliveries spanning high-complexity SaaS dashboards, modular marketing engines, and custom e-commerce interfaces.</p>
              <br />
              <p><strong>Design Tokens Mapped:</strong> Every shipped interface is wired to a typed token system — colour, spacing, type — never hard-coded values.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

interface StatProps {
  label: string
  target: number
  suffix?: string
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Stat({ label, target, suffix = '' }: StatProps) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const node = ref.current
    if (!node) return

    let raf = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const duration = 1200
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.floor(eased * target))
        if (t < 1) raf = requestAnimationFrame(tick)
        else setValue(target)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.3 })

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])

  return (
    <div ref={ref} className={styles.statBox}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statNumber}>
        {value.toLocaleString()}
        {suffix}
      </span>
    </div>
  )
}
