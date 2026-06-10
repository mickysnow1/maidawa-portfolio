import { Check } from '../../components/Icon/Icons'
import styles from './WhyMe.module.css'
import { VALUE_POINTS } from './whyMeData'

export default function WhyMe() {
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

        <div className={styles.grid} role="list">
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
    </section>
  )
}

