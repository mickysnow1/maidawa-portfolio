import { useState } from 'react'
import styles from './Contact.module.css'
import { contactSchema, type ContactFormErrors, type ContactFormValues } from './contactSchema'
import { ArrowRight, ArrowUpRight, Check } from '../../components/Icon/Icons'

type SubmitStatus =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'sent' }

const initialForm: ContactFormValues = {
  name: '',
  email: '',
  project: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState<ContactFormValues>(initialForm)
  const [submitState, setSubmitState] = useState<SubmitStatus>({ status: 'idle' })
  const [errors, setErrors] = useState<ContactFormErrors>({})

  const validate = () => {
    const parsed = contactSchema.safeParse(form)
    if (parsed.success) return {}

    return parsed.error.issues.reduce<ContactFormErrors>((acc, issue) => {
      const field = issue.path[0] as keyof ContactFormValues | undefined
      if (field) acc[field] = issue.message
      return acc
    }, {})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitState({ status: 'sending' })
    setTimeout(() => setSubmitState({ status: 'sent' }), 1500)
  }

  const update = (field: keyof ContactFormValues, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className="container">
        <div className={styles.layout}>
          {/* Left Column: Direct contact pitch */}
          <div className={styles.left}>
            <p className="section-label reveal">Contact / CTA</p>
            <h2 id="contact-heading" className={`reveal ${styles.title}`}>
              Let’s work together!
            </h2>
            <p className={`reveal ${styles.sub}`}>
              Open to full-time roles, freelance projects, and interesting collaborations.
              If you have a project or opportunity in mind, I’d love to hear about it.
            </p>

            <div className={`reveal ${styles.availability}`}>
              <span className={styles.availDot} aria-hidden="true" />
              <span>Open to full-time roles, freelance projects, and collaborations</span>
            </div>

            <a
              href="mailto:mickymaidawa@gmail.com"
              className={`reveal ${styles.emailLink}`}
              aria-label="Email Michael directly"
            >
              mickymaidawa@gmail.com
            </a>

            <nav className={`${styles.socials} reveal`} aria-label="Social links">
              {[
                { label: 'X (@yourafroguy)', href: 'https://x.com/yourafroguy' },
                { label: 'GitHub',   href: 'https://github.com/mickymaidawa' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social}
                  aria-label={`Visit Michael on ${s.label}`}
                >
                  <span>{s.label}</span>
                  <ArrowUpRight size={13} className={styles.socialArrow} />
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column: Flat minimalist form */}
          <div className={`reveal ${styles.right}`}>
            {submitState.status === 'sent' ? (
              <div className={styles.sentState} role="status" aria-live="polite">
                <div className={styles.sentIcon} aria-hidden="true"><Check size={22} /></div>
                <h3 className={styles.sentTitle}>Message Transmitted.</h3>
                <p className={styles.sentSub}>I will review details and follow up within 24 hours.</p>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className={styles.row}>
                  <Field
                    id="contact-name"
                    label="Name"
                    type="text"
                    value={form.name}
                    error={errors.name}
                    onChange={(v) => update('name', v)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  <Field
                    id="contact-email"
                    label="Email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onChange={(v) => update('email', v)}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
                <Field
                  id="contact-project"
                    label="Project Type"
                  type="text"
                  value={form.project}
                  onChange={(v) => update('project', v)}
                  placeholder="e.g. full-time role, dashboard, landing page..."
                />
                <Field
                  id="contact-message"
                  label="Message Specification"
                  type="textarea"
                  value={form.message}
                  error={errors.message}
                  onChange={(v) => update('message', v)}
                  placeholder="Tell me about the goal, timeline, and design direction..."
                />
                
                <div className={styles.submitWrap}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={submitState.status === 'sending'}
                    aria-busy={submitState.status === 'sending'}
                  >
                    <span>{submitState.status === 'sending' ? 'Transmitting…' : 'Send message'}</span>
                    <span className="btn-icon-arrow"><ArrowRight size={15} /></span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Flat Minimalist Footer - No glow effects strictly */}
        <footer className={styles.footer}>
          <div className={styles.footerWordmark}>MICHAEL</div>
          <nav className={styles.footerNav} aria-label="Footer navigation">
            {[
              ['About', '#about'],
              ['Skills', '#skills'],
              ['Work', '#projects'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className={styles.footerCopy}>
            © {new Date().getFullYear()} — Built with Next.js, TypeScript, and complete visual discipline.
          </div>
        </footer>
      </div>
    </section>
  )
}

/* ---- Minimalist Field Component ---- */
interface FieldProps {
  id: string
  label: string
  type: 'text' | 'email' | 'textarea'
  value: string
  error?: string | undefined
  onChange: (value: string) => void
  placeholder?: string | undefined
  autoComplete?: string | undefined
}

function Field({ id, label, type, value, error, onChange, placeholder, autoComplete }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      )}
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">{error}</span>
      )}
    </div>
  )
}
