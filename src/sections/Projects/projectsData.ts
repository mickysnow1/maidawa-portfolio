export interface Project {
  id: string
  title: string
  category: string
  niche: string
  description: string
  role: string
  tags: string[]
  highlights: string[]
  image?: string
  videoUrl?: string
  liveUrl?: string
  codeUrl?: string
  figmaUrl?: string
  demoLabel?: string
  accentColor: string
  preview: 'dashboard' | 'career' | 'commerce' | 'landing'
}

export const PROJECTS: Project[] = [
  {
    id: 'project-01',
    title: 'Accurvia Career Experience',
    category: 'Client Delivery',
    niche: 'Career Website',
    description:
      'A polished career and executive-profile experience built for Accurvia, translating a visual direction into responsive, production-ready frontend screens.',
    role: 'Frontend Developer',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Figma'],
    highlights: [
      'Translated Figma direction into responsive career and profile pages',
      'Built reusable sections, navigation, CTA patterns, and responsive layouts',
      'Collaborated through iterative UI refinement across multiple delivery commits',
    ],
    image: '/projects/accurvia-image.png',
    liveUrl: '/projects/accurvia-image.png',
    codeUrl: 'https://github.com/accurvia-labs/accurvia-project-1/tree/main/frontend',
    demoLabel: 'Preview screens',
    accentColor: '#FF9900',
    preview: 'career',
  },
  {
    id: 'project-02',
    title: 'VHS Alumni Dashboard',
    category: 'Client Delivery',
    niche: 'Admin Dashboard',
    description:
      'A focused alumni-management dashboard with clear admin navigation, member management, birthday workflows, and responsive data views.',
    role: 'Collaborating Frontend Developer',
    tags: ['React', 'Tailwind CSS', 'Dashboard UX'],
    highlights: [
      'Built the frontend for alumni, birthday, and admin workflows',
      'Created clear dashboard navigation and responsive management cards',
      'Designed the interface around fast scanning and everyday admin tasks',
    ],
    image: '/projects/vhc-alumni.png',
    liveUrl: '/projects/vhc-alumni.png',
    demoLabel: 'Preview dashboard',
    accentColor: '#1B4332',
    preview: 'dashboard',
  },
  {
    id: 'project-03',
    title: 'Pinnacle Hybrid Website',
    category: 'Freelance Delivery',
    niche: 'Business Website',
    description:
      'A mobile-first lead-generation website for an agricultural service in Benin City, with source-linked media, responsive storytelling, and direct enquiry paths.',
    role: 'Frontend Developer',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    highlights: [
      'Delivered a mobile-first marketing experience for an agricultural business',
      'Structured the site around trust, field media, services, and enquiries',
      'Optimized the media system with responsive WebP derivatives and source links',
    ],
    image: '/projects/pinnacle-hybrid-field.webp',
    liveUrl: '/projects/pinnacle-hybrid-field.webp',
    codeUrl: 'https://github.com/mickysnow1/pinnacle-hybrid-website',
    demoLabel: 'Preview website',
    accentColor: '#B45309',
    preview: 'landing',
  },
]

export const ALL_NICHES = [
  'All',
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
] as const
