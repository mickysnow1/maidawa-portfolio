import type { Metadata, Viewport } from 'next'
import { Archivo_Black, Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import type { ReactNode } from 'react'
import '../index.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Michael Maidawa — Web Developer',
  description: 'Michael Maidawa — Web Developer crafting clean, responsive, user-centered digital experiences with React, Next.js, and Tailwind CSS.',
  authors: [{ name: 'Michael Maidawa' }],
  metadataBase: new URL('https://maidawa.studio'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://maidawa.studio/',
    title: 'Michael Maidawa — Web Developer',
    description: 'Clean, responsive, user-centered digital experiences built with React, Next.js, and Tailwind CSS.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Michael Maidawa portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Maidawa — Web Developer',
    description: 'Clean, responsive, user-centered digital experiences built with React, Next.js, and Tailwind CSS.',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D8DBCF',
  colorScheme: 'light',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Michael Maidawa',
  url: 'https://maidawa.studio/',
  jobTitle: 'Web Developer',
  description: 'Web Developer specialising in React, Next.js, Tailwind CSS, and Figma-to-code implementation.',
  sameAs: [
    'https://github.com/yourusername',
    'https://linkedin.com/in/yourprofile',
  ],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${playfair.variable} ${archivoBlack.variable}`}>
      <body>
        {children}
        <script id="person-schema" type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </body>
    </html>
  )
}
