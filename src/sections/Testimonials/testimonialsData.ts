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
    iconColor: '#3b82f6',
    quote: 'Impressive work guys — really blown away by the execution. The career page looks brilliant.',
    author: 'Esteejay',
    roleContext: 'Accurvia · Career page & executive profiles',
    badgeLabel: 'Career page',
  },
  {
    id: 'vhc-alumni',
    clientName: 'VHC Alumni',
    projectLabel: 'Dashboard',
    icon: 'users',
    iconColor: '#eab308',
    quote: 'Nice work — the dashboard was delivered quickly and gave the team a clearer way to manage alumni workflows.',
    author: 'VHC Alumni team',
    roleContext: 'Dashboard & alumni workflow',
    badgeLabel: 'Dashboard',
  },
  {
    id: 'maidawa-farms',
    clientName: 'Maidawa Farms',
    projectLabel: 'Marketplace',
    icon: 'leaf',
    iconColor: '#22c55e',
    quote: 'The marketplace and landing page gave the business a clearer digital presence and a stronger starting point for enquiries.',
    author: 'Maidawa Farms',
    roleContext: 'Marketplace & landing page',
    badgeLabel: 'Marketplace',
  },
]
