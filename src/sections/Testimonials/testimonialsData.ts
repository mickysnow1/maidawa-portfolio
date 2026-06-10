
export interface Testimonial {
  id: string
  clientName: string
  projectLabel: string
  icon: 'building' | 'users' | 'leaf'
  iconColor: string
  quote: string
  author: string
  roleContext: string
  badgeLabel: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'accurvia',
    clientName: 'Accurvia',
    projectLabel: 'Career page',
    icon: 'building',
    iconColor: '#3b82f6', // blue
    quote: "Impressive work guys — weldone. Really blown away by the execution. Thank you ma'am, the career page looks brilliant.",
    author: 'Esteejay',
    roleContext: 'Accurvia · Career page & executive profiles',
    badgeLabel: 'Career page',
  },
  {
    id: 'vhc-alumni',
    clientName: 'VHC Alumni',
    projectLabel: 'Dashboard',
    icon: 'users',
    iconColor: '#eab308', // yellow
    quote: "Hey bro — nice work, really nice work. Got it done in a day. Exactly what we needed for the dashboard.",
    author: 'VHC Alumni team',
    roleContext: 'Dashboard & alumni workflow',
    badgeLabel: 'Dashboard',
  },
  {
    id: 'maidawa-farms',
    clientName: 'Maidawa Farms',
    projectLabel: 'Marketplace',
    icon: 'leaf',
    iconColor: '#22c55e', // green
    quote: "Great execution on the marketplace and landing page — exactly what we envisioned for Maidawa Farms.",
    author: 'Maidawa Farms',
    roleContext: 'Marketplace & landing page',
    badgeLabel: 'Marketplace',
  },
]
