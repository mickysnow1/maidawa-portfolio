'use client'

import { useEffect, useState } from 'react'
import Nav from '../components/Nav/Nav'
import Hero from '../sections/Hero/Hero'
import About from '../sections/About/About'
import Skills from '../sections/Skills/Skills'
import Projects from '../sections/Projects/Projects'
import WhyMe from '../sections/WhyMe/WhyMe'
import Testimonials from '../sections/Testimonials/Testimonials'
import Contact from '../sections/Contact/Contact'
import { useRevealOnScroll } from '../hooks/useScroll'
import { useSmoothScroll } from '../hooks/useBasicAnimations'
import { ArrowUp } from '../components/Icon/Icons'

export default function ClientApp() {
  useSmoothScroll()
  useRevealOnScroll()

  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const firstBatch = Array.from(els).slice(0, 4)
    const timer = setTimeout(() => {
      firstBatch.forEach((el) => el.classList.add('visible'))
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="fixed -top-24 left-4 z-[3000] rounded-full bg-portfolio-primary px-5 py-3 font-portfolio-sans text-sm uppercase tracking-[0.04em] text-portfolio-bg transition-[top] duration-200 focus:top-4 focus-visible:top-4"
      >
        Skip to main content
      </a>
      <Nav />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <WhyMe />
        <Testimonials />
        <Contact />
      </main>

      <button
        type="button"
        className={[
          'fixed bottom-8 right-8 z-[600] flex h-11 w-11 items-center justify-center border border-portfolio-primary bg-portfolio-primary text-lg text-portfolio-bg transition-[opacity,transform,background-color,color] duration-300 max-[40rem]:bottom-5 max-[40rem]:right-5',
          showTop
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0',
          'hover:bg-transparent hover:text-portfolio-primary',
        ].join(' ')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  )
}
