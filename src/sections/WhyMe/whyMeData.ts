export interface ValuePoint {
  id: string
  title: string
  description: string
}

export const VALUE_POINTS: ValuePoint[] = [
  {
    id: 'design-to-code',
    title: 'Figma direction becomes production UI',
    description:
      'I turn visual systems into responsive components that stay faithful to the design and practical in the browser.',
  },
  {
    id: 'responsive-builds',
    title: 'Responsive from the first screen',
    description:
      'Layouts are planned for real phones, tablets, and desktops instead of being patched after the desktop version.',
  },
  {
    id: 'clear-interfaces',
    title: 'Interfaces built for fast understanding',
    description:
      'I use hierarchy, spacing, and purposeful interaction to help users find the next action without friction.',
  },
  {
    id: 'team-delivery',
    title: 'Comfortable inside product teams',
    description:
      'I collaborate with designers, backend developers, and stakeholders to keep handoffs clear and delivery moving.',
  },
  {
    id: 'real-product-value',
    title: 'Polish that supports the goal',
    description:
      'The work is judged by useful outcomes — clearer enquiries, easier admin tasks, and a product people can trust.',
  },
]
