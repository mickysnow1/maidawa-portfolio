import { useCallback, useRef } from 'react'
import { Check, ArrowLeft, ArrowRight } from '../../components/Icon/Icons'
import styles from './WhyMe.module.css'
import { VALUE_POINTS } from './whyMeData'

export default function WhyMe() {
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
    <section id="why-me" className={styles.section} aria-labelledby="why-me-heading">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label reveal">Why Work With Me</p>
          <h2 id="why-me-heading" className={`reveal ${styles.title}`}>
            Why Hire Me
          </h2>
          <p className={`reveal ${styles.sub}`}>
            I focus on writing clean, clear, and scalable code, thriving as a collaborative team member to produce high-value products that go beyond first impressions.       
          </p>
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

        <div className={styles.carouselWrap}>
          <div className={styles.grid} ref={trackRef} role="list">
            {VALUE_POINTS.map((point, index) => (
              <article
                key={point.id}
                className={`reveal ${styles.card}`}
                style={{ transitionDelay: `${index * 90}ms` }}
                role="listitem"
              >
                <div className={styles.icon} aria-hidden="true">
                  <Check size={18} />
                </div>
                <div className={styles.copy}>
                  <h3 className={styles.cardTitle}>{point.title}</h3>
                  <p className={styles.cardDesc}>{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

