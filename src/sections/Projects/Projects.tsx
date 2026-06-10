import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Projects.module.css'
import { PROJECTS, ALL_NICHES, type Project } from './projectsData'
import { useUrlParam } from '../../hooks/useUrlParam'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '../../components/Icon/Icons'

export default function Projects() {
  const [active, setActive] = useUrlParam('work', 'All', ALL_NICHES)
  const trackRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<{ type: 'video' | 'image'; url: string } | null>(null)
  const [comingSoon, setComingSoon] = useState(false)

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active)

  const scrollProjects = useCallback((direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    track.scrollBy({
      left: direction * track.clientWidth * 0.86,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }, [active])

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <p className="section-label reveal">Featured Projects</p>
          <h2 id="projects-heading" className={`reveal ${styles.title}`}>
            Featured Projects
          </h2>
          <p className={`reveal ${styles.sub}`}>
            A focused selection of client and personal projects showing design-to-code
            delivery, responsive layouts, and clean frontend implementation.
          </p>
        </div>

        <div className={`${styles.controls} reveal`}>
          {/* Flat filter pills */}
          <div className={styles.filters} role="group" aria-label="Filter by niche">
            {ALL_NICHES.map((n) => (
              <button
                type="button"
                key={n}
                className={`${styles.pill} ${active === n ? styles.pillActive : ''}`}
                onClick={() => setActive(n)}
                aria-pressed={active === n}
              >
                {n}
              </button>
            ))}
          </div>

          <div className={styles.carouselNav} aria-label="Project navigation">
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => scrollProjects(-1)}
              aria-label="Show previous projects"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => scrollProjects(1)}
              aria-label="Show next projects"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className={styles.carouselWrap}>
          <div className={styles.grid} ref={trackRef} role="list">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpenLightbox={setLightbox} onOpenComingSoon={() => setComingSoon(true)} />
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div className={styles.lightboxOverlay} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close demo">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            {lightbox.type === 'video' ? (
              <video src={lightbox.url} controls autoPlay className={styles.lightboxMedia} />
            ) : (
              <img src={lightbox.url} alt="Live Demo" className={styles.lightboxMedia} />
            )}
          </div>
        </div>
      )}

      {comingSoon && (
        <div className={styles.lightboxOverlay} onClick={() => setComingSoon(false)}>
          <button className={styles.lightboxClose} onClick={() => setComingSoon(false)} aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className={styles.comingSoonModal} onClick={e => e.stopPropagation()}>
            <div className={styles.comingSoonIcon}>🚧</div>
            <h3>Coming Soon</h3>
            <p>This project is currently being finalized and will be available shortly.</p>
            <button className={styles.comingSoonBtn} onClick={() => setComingSoon(false)}>Got it</button>
          </div>
        </div>
      )}
    </section>
  )
}

function ProjectCard({ project, index, onOpenLightbox, onOpenComingSoon }: { project: Project; index: number; onOpenLightbox: (data: { type: 'video'|'image'; url: string }) => void; onOpenComingSoon: () => void }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const showVideo = Boolean(project.videoUrl && hovered)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (showVideo) {
      void video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [showVideo])

  const handleLiveDemo = (e: React.MouseEvent) => {
    if (project.liveUrl?.startsWith('/projects/')) {
      e.preventDefault()
      const isVideo = project.liveUrl.endsWith('.mp4')
      onOpenLightbox({ type: isVideo ? 'video' : 'image', url: project.liveUrl })
    }
  }

  return (
    <article
      className={`${styles.card} reveal`}
      style={{ transitionDelay: `${index * 90}ms` }}
      aria-label={`${project.title} — ${project.niche}`}
      role="listitem"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={styles.accentBar}
        style={{ backgroundColor: project.accentColor }}
        aria-hidden="true"
      />

      <div className={styles.imageWrap}>
        <ProjectMedia
          project={project}
          index={index}
          showVideo={showVideo}
          videoRef={videoRef}
          hovered={hovered}
        />
      </div>

      <div className={styles.meta}>
        <div className={styles.metaTop}>
          <span className={styles.category}>
            <span
              className={styles.categoryDot}
              style={{ backgroundColor: project.accentColor }}
              aria-hidden="true"
            />
            {project.category}
          </span>
          <span className={styles.niche}>{project.niche}</span>
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.role}>{project.role}</p>

        <div className={styles.detailsWrap}>
          <div className={styles.detailsInner}>
            <p className={styles.desc}>{project.description}</p>

            <ul className={styles.highlights}>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.tags} aria-label="Technologies used">
              {project.tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>

            <div className={styles.actionWrap}>
              <ProjectAction
                label="Live Demo"
                href={project.liveUrl}
                onDemoClick={
                  project.liveUrl?.startsWith('/projects/')
                    ? handleLiveDemo
                    : project.liveUrl === '#coming-soon'
                    ? (e) => { e.preventDefault(); onOpenComingSoon(); }
                    : undefined
                }
              />
              {project.figmaUrl && (
                <ProjectAction 
                  href={project.figmaUrl} 
                  label="Figma" 
                  onDemoClick={project.figmaUrl === '#coming-soon' ? (e) => { e.preventDefault(); onOpenComingSoon(); } : undefined} 
                />
              )}
              <ProjectAction 
                href={project.codeUrl} 
                label="GitHub" 
                onDemoClick={project.codeUrl === '#coming-soon' ? (e) => { e.preventDefault(); onOpenComingSoon(); } : undefined} 
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function ProjectMedia({
  project,
  index,
  showVideo,
  videoRef,
  hovered,
}: {
  project: Project
  index: number
  showVideo: boolean
  videoRef: React.RefObject<HTMLVideoElement | null>
  hovered: boolean
}) {
  // If video exists, use the poster image + video logic
  if (project.videoUrl) {
    return (
      <>
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className={`${styles.media} ${showVideo ? styles.mediaHidden : styles.mediaVisible}`}
            loading="lazy"
          />
        )}
        <video
          ref={videoRef}
          src={project.videoUrl}
          className={`${styles.media} ${showVideo ? styles.mediaVisible : styles.mediaHidden}`}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${project.title} video demo`}
        />
      </>
    )
  }

  // If image exists AND preview exists, cross-fade from preview to image on hover
  if (project.image && project.preview) {
    return (
      <>
        <div className={`${styles.media} ${hovered ? styles.mediaHidden : styles.mediaVisible}`}>
          <ProjectPreview project={project} index={index} />
        </div>
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className={`${styles.media} ${hovered ? styles.mediaVisible : styles.mediaHidden}`}
          loading="lazy"
        />
      </>
    )
  }

  if (project.image) {
    return <img src={project.image} alt={`${project.title} screenshot`} className={styles.media} loading="lazy" />
  }

  return <ProjectPreview project={project} index={index} />
}

function ProjectAction({
  href,
  label,
  onDemoClick,
}: {
  href?: string | undefined
  label: string
  onDemoClick?: ((e: React.MouseEvent) => void) | undefined
}) {
  if (onDemoClick) {
    return (
      <button type="button" className={styles.viewLink} onClick={onDemoClick}>
        <span>{label}</span>
        <span className={styles.arrow}><ArrowUpRight size={13} /></span>
      </button>
    )
  }

  return (
    <a href={href ?? '#contact'} className={styles.viewLink} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      <span>{label}</span>
      <span className={styles.arrow}><ArrowUpRight size={13} /></span>
    </a>
  )
}

function ProjectPreview({ project, index }: { project: Project; index: number }) {
  if (project.preview === 'dashboard') return <DashboardPreview />
  if (project.preview === 'career') return <CareerPreview />
  if (project.preview === 'commerce') return <CommercePreview />
  if (project.preview === 'landing') return <LandingPreview />
  return <WireframePreview index={index} />
}

function DashboardPreview() {
  return (
    <div className={styles.dashboardPreview} aria-hidden="true">
      <div className={styles.previewTopbar}>
        <span>VHS Admin</span>
        <span>Birthdays</span>
      </div>
      <div className={styles.vhsNavStrip}>
        <span>Dashboard</span>
        <span>Alumni</span>
        <strong>Birthdays</strong>
        <span>Payments</span>
      </div>
      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardHeroCard}>
          <span className={styles.previewLabel}>Today's Birthdays</span>
          <strong>03</strong>
          <small>people celebrating today</small>
        </div>
        <div className={styles.dashboardMiniCard}>
          <span>Upcoming Week</span>
          <strong>11</strong>
        </div>
        <div className={styles.dashboardMiniCard}>
          <span>Records</span>
          <strong>248</strong>
        </div>
      </div>
      <div className={styles.vhsFilterBar}>
        <span>All</span>
        <span>Next Birthday</span>
        <span>Asc</span>
        <strong>Search name or ID</strong>
      </div>
      <div className={styles.dashboardList}>
        {([
          ['Today', 'Aisha Bello', 'VHS-1024'],
          ['Upcoming', 'Daniel Hart', 'VHS-1842'],
          ['Later', 'Musa Ibrahim', 'VHS-2088'],
        ] as const).map(([status, name, id]) => (
          <div key={id} className={styles.dashboardRow}>
            <span className={styles.avatar}>{name.slice(0, 1)}</span>
            <span>{name}</span>
            <small>{id}</small>
            <strong>{status}</strong>
          </div>
        ))}
      </div>
      <div className={styles.vhsPagination}>
        <span style={{ display: 'inline-flex' }}><ArrowLeft size={12} /></span>
        <strong>1</strong>
        <span>2</span>
        <span style={{ display: 'inline-flex' }}><ArrowRight size={12} /></span>
      </div>
    </div>
  )
}

function CareerPreview() {
  return (
    <div className={styles.careerPreview} aria-hidden="true">
      <div className={styles.careerCollage}>
        <div className={styles.careerImageMain} />
        <div className={styles.careerImageInset} />
        <div className={styles.yearsBadge}>
          <strong>15+</strong>
          <span>Years</span>
        </div>
      </div>
      <div className={styles.careerCopy}>
        <span className={styles.previewLabel}>Career Journey</span>
        <strong>Global Impact Across Continents</strong>
        <div className={styles.careerStats}>
          <span>120 countries</span>
          <span>13M+ users</span>
        </div>
      </div>
    </div>
  )
}

function CommercePreview() {
  return (
    <div className={styles.commercePreview} aria-hidden="true">
      <div className={styles.phoneFrame}>
        <div className={styles.phoneHeader}>
          <span>Marketplace</span>
          <strong>Pure Heritage</strong>
        </div>
        <div className={styles.productImage} />
        <div className={styles.featureStack}>
          {['Farm-to-table freshness', 'Bulk ordering', 'Direct processing'].map((feature) => (
            <div key={feature} className={styles.featureItem}>
              <span />
              <strong>{feature}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.portalPane}>
        <span className={styles.previewLabel}>B2B Portal</span>
        <strong>Global Logistics</strong>
        <small>Export • Contract Farming • Volume Requests</small>
      </div>
    </div>
  )
}

function LandingPreview() {
  return (
    <div className={styles.landingPreview} aria-hidden="true">
      <div className={styles.landingHeroBlob} />
      <div className={styles.landingContent}>
        <span className={styles.landingEyebrow}>Premium Palm Oil</span>
        <strong className={styles.landingTitle}>Sustainably Grown</strong>
        <div className={styles.landingLines}>
          <span />
          <span />
          <span style={{ width: '70%' }} />
        </div>
        <div className={styles.landingProof}>
          <div className={styles.landingBadge} />
          <div className={styles.landingBadge} />
          <div className={styles.landingBadge} />
        </div>
      </div>
      <div className={styles.landingImageWrap}>
        <div className={styles.landingImage} />
      </div>
    </div>
  )
}

function WireframePreview({ index }: { index: number }) {
  return (
    <div className={styles.placeholder} aria-hidden="true">
      <svg viewBox="0 0 200 120" className={styles.placeholderSvg}>
        <line x1="0" y1="0" x2="200" y2="120" stroke="#111" strokeWidth="0.25" opacity="0.15" />
        <line x1="200" y1="0" x2="0" y2="120" stroke="#111" strokeWidth="0.25" opacity="0.15" />
        <rect x="20" y="15" width="160" height="90" stroke="#111" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.2" fill="none" />
        <circle cx="100" cy="60" r="25" stroke="#111" strokeWidth="0.5" opacity="0.3" fill="none" />
        <text x="10" y="15" fontFamily="var(--font-mono)" fontSize="5" fill="#111" opacity="0.4">W_GRID // 0{index+1}</text>
        <text x="145" y="105" fontFamily="var(--font-mono)" fontSize="5" fill="#111" opacity="0.4">100%_FIDELITY</text>
      </svg>
    </div>
  )
}
