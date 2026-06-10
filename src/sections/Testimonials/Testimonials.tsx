'use client'

import { useCallback, useRef } from 'react'
import styles from './Testimonials.module.css'
import { TESTIMONIALS } from './testimonialsData'
import { Building, Users, Leaf, ArrowLeft, ArrowRight } from '../../components/Icon/Icons'

const iconMap = {
  building: Building,
  users: Users,
  leaf: Leaf,
}

export default function Testimonials() {
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
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-heading">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label reveal">Client Feedback</p>
          <h2 id="testimonials-heading" className={`reveal ${styles.title}`}>
            Straight from the conversation.
          </h2>
        </div>

        <div className={`${styles.controls} reveal`}>
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
            {TESTIMONIALS.map((item, index) => {
              const Icon = iconMap[item.icon]
              return (
                <div
                  key={item.id}
                  className={`reveal ${styles.card}`}
                  style={{ transitionDelay: `${index * 90}ms`, '--icon-hover-color': item.iconColor } as React.CSSProperties}
                  role="listitem"
                >
                  <div className={styles.cardHeader}>
                    <Icon size={24} className={styles.cardIcon} aria-hidden="true" />
                    <div className={styles.cardMeta}>
                      <span className={styles.clientName}>{item.clientName}</span>
                      <span className={styles.projectLabel}>{item.projectLabel}</span>
                    </div>
                  </div>

                  <div className={styles.quoteBg} aria-hidden="true">&ldquo;</div>
                  <p className={styles.quote}>"{item.quote}"</p>

                  <div className={styles.panelFooter}>
                    <div className={styles.authorGroup}>
                      <div className={styles.avatar} aria-hidden="true">
                        {item.author.charAt(0)}
                      </div>
                      <div className={styles.authorText}>
                        <span className={styles.author}>{item.author}</span>
                        <span className={styles.roleContext}>{item.roleContext}</span>
                      </div>
                    </div>
                    <div className={styles.badge}>
                      {item.badgeLabel}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
