'use client'

import { useState, useRef } from 'react'
import styles from './Testimonials.module.css'
import { TESTIMONIALS } from './testimonialsData'
import { Building, Users, Leaf } from '../../components/Icon/Icons'

const iconMap = {
  building: Building,
  users: Users,
  leaf: Leaf,
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % TESTIMONIALS.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    }

    if (nextIndex !== index) {
      e.preventDefault()
      setActiveIndex(nextIndex)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  const activeTestimonial = TESTIMONIALS[activeIndex]

  if (!activeTestimonial) return null

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-heading">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label reveal">Client Feedback</p>
          <h2 id="testimonials-heading" className={`reveal ${styles.title}`}>
            Straight from the conversation.
          </h2>
        </div>

        <div className={`reveal ${styles.tabsContainer}`}>
          <div className={styles.tablist} role="tablist" aria-label="Client Feedback">
            {TESTIMONIALS.map((item, index) => {
              const Icon = iconMap[item.icon]
              const isActive = index === activeIndex
              return (
                <button
                  key={item.id}
                  ref={(el) => { tabRefs.current[index] = el }}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="testimonial-panel"
                  id={`tab-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  style={{ '--icon-hover-color': item.iconColor } as React.CSSProperties}
                  className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <Icon size={20} className={styles.tabIcon} aria-hidden="true" />
                  <span className={styles.tabClientName}>{item.clientName}</span>
                  <span className={styles.tabProjectLabel}>{item.projectLabel}</span>
                </button>
              )
            })}
          </div>

          <div
            id="testimonial-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTestimonial.id}`}
            aria-live="polite"
            className={styles.tabpanel}
          >
            <div key={activeTestimonial.id} className={styles.tabpanelInner}>
              <div className={styles.quoteBg} aria-hidden="true">&ldquo;</div>
              <p className={styles.quote}>"{activeTestimonial.quote}"</p>
              
              <div className={styles.panelFooter}>
                <div className={styles.authorGroup}>
                  <div className={styles.avatar} aria-hidden="true">
                    {activeTestimonial.author.charAt(0)}
                  </div>
                  <div className={styles.authorText}>
                    <span className={styles.author}>{activeTestimonial.author}</span>
                    <span className={styles.roleContext}>{activeTestimonial.roleContext}</span>
                  </div>
                </div>
                <div className={styles.badge}>
                  {activeTestimonial.badgeLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
