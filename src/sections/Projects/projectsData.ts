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
  accentColor: string
  preview: 'dashboard' | 'career' | 'commerce' | 'landing'
}

export const PROJECTS: Project[] = [
  {
    id: 'project-01',
    title: 'Accurvia',
    category: 'Accelerator Program',
    niche: 'Frontend Development',
    description:
      'Designed and developed two complete pages for Accurvia as part of their accelerator program. Focused on creating a modern, professional, and highly usable interface.',
    role: 'Frontend Developer',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Figma'],
    highlights: [
      'Converted Figma designs into clean, responsive code',
      'Ensured smooth user interactions and excellent performance',
      'Delivered fully responsive layouts across devices',
    ],
    image: '/projects/accurvia-image.png',
    videoUrl: '/projects/accurvia-project.mp4',
    liveUrl: '/projects/accurvia-project.mp4',
    codeUrl: '#contact',
    figmaUrl: '#coming-soon',
    accentColor: '#FF9900',
    preview: 'career',
  },
  {
    id: 'project-02',
    title: 'VHC Alumni Birthday Management Page',
    category: 'Dashboard',
    niche: 'Alumni System',
    description:
      'Contributed to the development of the VHC Alumni Birthday Management system by building the complete frontend.',
    role: 'Collaborating Developer',
    tags: ['React', 'Tailwind CSS'],
    highlights: [
      'Birthday registration form',
      'Calendar integration',
      'Searchable alumni birthday list with filters',
      'Fully responsive design',
    ],
    image: '/projects/vhc-alumni.png',
    liveUrl: '/projects/vhc-alumni.png',
    codeUrl: '#contact',
    accentColor: '#1B4332',
    preview: 'dashboard',
  },
  {
    id: 'project-03',
    title: 'Farm Plantation Website',
    category: 'Personal Project',
    niche: 'Design + Development',
    description:
      'Built a complete website for a farm plantation from scratch. Focused on modern design, good user experience, and effectively showcasing the business.',
    role: 'Sole Developer (Design + Development)',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Figma'],
    highlights: [
      'Designed the full website in Figma',
      'Developed a visually appealing and responsive site',
      'Implemented smooth navigation and intuitive UX',
    ],
    liveUrl: '#coming-soon',
    codeUrl: '#coming-soon',
    figmaUrl: '#coming-soon',
    accentColor: '#D97706',
    preview: 'landing',
  },
]

export const ALL_NICHES = [
  'All',
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
] as const
