import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.layout}>
          <div className={`reveal ${styles.photoColumn}`}>
            <div className={styles.photoFrame} aria-label="Michael Maidawa">
              <img 
                src="/images/professional.jpg" 
                alt="Michael Maidawa" 
                className={styles.photoImage} 
                loading="lazy" 
              />
            </div>
          </div>

          <div className={styles.copyColumn}>
            <div className={`section-label reveal ${styles.eyebrow}`}>
              About Me
            </div>
            
            <h2 id="about-heading" className={`reveal ${styles.title}`}>
              Hi, I’m Michael — a Web Developer.
            </h2>

            <div className={styles.body}>
              <p className="reveal">
                I’m a Web Developer with a strong drive for building clean, scalable,
                and functional web applications.
              </p>
              <p className="reveal">
                I build these websites using React, Next.js, and Tailwind CSS. I am
                proficient in turning designs from Figma into responsive, accessible,
                and performant code. Whether working on client projects or personal
                initiatives, I prioritize user experience and clean code architecture.
              </p>
              <p className="reveal">
                I’m a strong team player who enjoys collaborating with designers,
                backend developers, and AI tools to deliver high-quality products
                efficiently. I’m a fast learner and always focused on writing
                maintainable code.
              </p>
            </div>

            <div className={styles.facts} aria-label="Quick facts">
              {[
                ['Focus', 'React, Next.js, Tailwind CSS'],
                ['Strength', 'Figma to responsive, accessible code'],
                ['Collaboration', 'Designers, backend developers, and AI tools'],
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
