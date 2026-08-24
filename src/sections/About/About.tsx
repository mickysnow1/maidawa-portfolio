import Image from 'next/image'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.layout}>
          <div className={`reveal ${styles.photoColumn}`}>
            <div className={styles.photoFrame} aria-label="Michael Maidawa">
              <Image
                src="/images/professional.jpg"
                alt="Michael Maidawa"
                width={1080}
                height={1920}
                sizes="(max-width: 900px) 100vw, 320px"
                className={styles.photoImage}
              />
            </div>
          </div>

          <div className={styles.copyColumn}>
            <div className={`section-label reveal ${styles.eyebrow}`}>
              About Me
            </div>
            
            <h2 id="about-heading" className={`reveal ${styles.title}`}>
              Hi, I’m Michael — a Frontend Developer.
            </h2>

            <div className={styles.body}>
              <p className="reveal">
                I’m a frontend developer with four years of practice building clean,
                responsive, and useful web experiences.
              </p>
              <p className="reveal">
                I work across React, Next.js, TypeScript, Tailwind CSS, and Figma-to-code
                implementation. I turn product direction into responsive, accessible,
                and maintainable interfaces that are clear on every screen.
              </p>
              <p className="reveal">
                I’m available for full-time frontend roles and freelance builds. I enjoy
                working with designers, backend developers, and product teams to ship
                polished work without losing sight of the people using it.
              </p>
            </div>

            <div className={styles.facts} aria-label="Quick facts">
              {[
                ['Focus', 'React, Next.js, TypeScript'],
                ['Strength', 'Figma to responsive, accessible UI'],
                ['Availability', 'Full-time roles and freelance builds'],
              ].map(([label, value]) => (
                <div key={label} className={`reveal ${styles.fact}`}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`reveal ${styles.quoteSection}`}>
          <blockquote className={styles.quote}>
            <p className={styles.quoteText}>
              "I care about building interfaces that are clean, useful, and easy for real users to understand."
            </p>
            <cite className={styles.quoteAuthor}>— MICHAEL MAIDAWA</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
