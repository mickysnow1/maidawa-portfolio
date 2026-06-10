import { useCallback, useRef } from 'react'
import styles from './Skills.module.css'
import { SKILLS } from './skillsData'
import { ArrowLeft, ArrowRight } from '../../components/Icon/Icons'

export default function Skills() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollTrack = useCallback((direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({
      left: direction * track.clientWidth * 0.86,
      behavior: 'smooth',
    })
  }, [])
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label reveal">Skills / Tech Stack</p>
          <h2 id="skills-heading" className={`reveal ${styles.title}`}>
            Skills
          </h2>
          <p className={`reveal ${styles.sub}`}>
            The core tools and practices I use to turn designs and ideas into clean,
            responsive, client-ready interfaces.
          </p>
        </div>

        <div className={styles.carouselWrap}>
          <div className={styles.grid} ref={trackRef} role="list">
            {SKILLS.map((skill, index) => (
              <div
                key={skill.id}
                className={`reveal ${styles.skillCell}`}
                style={{ transitionDelay: `${index * 90}ms` }}
                role="listitem"
              >
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <SkillIcon id={skill.id} />
                <span className={styles.skillName}>{skill.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controlsMobileOnly}>
          <div className={styles.carouselNav} aria-label="Card navigation">
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => scrollTrack(-1)}
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => scrollTrack(1)}
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillIcon({ id }: { id: string }) {
  const commonProps = {
    className: styles.skillIcon,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (id === 'react-next') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="2.1" />
        <ellipse cx="12" cy="12" rx="8" ry="3.2" />
        <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(120 12 12)" />
      </svg>
    )
  }

  if (id === 'tailwind') {
    return (
      <svg {...commonProps}>
        <path d="M4 10c1.8-3 4.4-4.1 7.6-3.1 1.8.6 3 1.8 4.4 1.8 1.2 0 2.2-.6 3-1.7" />
        <path d="M4 16c1.8-3 4.4-4.1 7.6-3.1 1.8.6 3 1.8 4.4 1.8 1.2 0 2.2-.6 3-1.7" />
      </svg>
    )
  }

  if (id === 'figma') {
    return (
      <svg {...commonProps}>
        <rect x="7" y="3" width="5" height="6" rx="2.2" />
        <rect x="12" y="3" width="5" height="6" rx="2.2" />
        <rect x="7" y="9" width="5" height="6" rx="2.2" />
        <circle cx="14.5" cy="12" r="2.5" />
        <path d="M12 15H9.5A2.5 2.5 0 1 0 12 17.5V15Z" />
      </svg>
    )
  }

  if (id === 'javascript') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9v5.2c0 1.2-.6 1.8-1.7 1.8" />
        <path d="M13 15.2c.5.5 1.2.8 2 .8 1.1 0 1.8-.5 1.8-1.4 0-.8-.5-1.2-1.8-1.6-1.2-.4-1.8-.9-1.8-1.8 0-1 .8-1.6 1.9-1.6.8 0 1.3.2 1.8.6" />
      </svg>
    )
  }

  if (id === 'responsive') {
    return (
      <svg {...commonProps}>
        <rect x="3" y="5" width="13" height="10" rx="2" />
        <path d="M8 19h5" />
        <path d="M10.5 15v4" />
        <rect x="16" y="10" width="5" height="9" rx="1.5" />
      </svg>
    )
  }

  if (id === 'git') {
    return (
      <svg {...commonProps}>
        <circle cx="7" cy="6" r="2" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
        <path d="M7 8v8" />
        <path d="M9 6h2.5a3 3 0 0 1 3 3v7" />
      </svg>
    )
  }

  if (id === 'uiux') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="M4 10h16" />
        <path d="M9 14h6" />
        <path d="M9 16.5h4" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M4.2 7.5l2.6 1.5" />
      <path d="M17.2 15l2.6 1.5" />
      <path d="M19.8 7.5 17.2 9" />
      <path d="M6.8 15l-2.6 1.5" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  )
}
