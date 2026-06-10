/* ============================================================
   Shared inline SVG icons — thin-line, inherit `currentColor`.
   Decorative by default (aria-hidden); pass a label for meaning.
   ============================================================ */

interface IconProps {
  size?: number | undefined
  strokeWidth?: number | undefined
  className?: string | undefined
  label?: string | undefined
}

function svgProps({ size = 16, label }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
    role: label ? ('img' as const) : undefined,
    'aria-label': label,
    'aria-hidden': label ? undefined : true,
    focusable: 'false' as const,
  }
}

export function ArrowRight({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  )
}

export function ArrowLeft({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <line x1="20" y1="12" x2="4" y2="12" />
      <polyline points="11 5 4 12 11 19" />
    </svg>
  )
}

export function ArrowUpRight({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export function ArrowUp({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <line x1="12" y1="20" x2="12" y2="4" />
      <polyline points="5 11 12 4 19 11" />
    </svg>
  )
}

export function ArrowLeftRight({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <polyline points="7 8 3 12 7 16" />
      <polyline points="17 8 21 12 17 16" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  )
}

export function Check({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function Diamond({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <polygon points="12 3 21 12 12 21 3 12" />
    </svg>
  )
}

export function Dot({ size = 10, ...rest }: IconProps) {
  return (
    <svg {...svgProps({ size, ...rest })} fill="currentColor" className={rest.className}>
      <circle cx="12" cy="12" r="6" />
    </svg>
  )
}

export function Replay({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  )
}

export function Building({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="22" />
      <line x1="15" y1="22" x2="15" y2="22" />
      <line x1="9" y1="6" x2="9.01" y2="6" />
      <line x1="15" y1="6" x2="15.01" y2="6" />
      <line x1="9" y1="10" x2="9.01" y2="10" />
      <line x1="15" y1="10" x2="15.01" y2="10" />
      <line x1="9" y1="14" x2="9.01" y2="14" />
      <line x1="15" y1="14" x2="15.01" y2="14" />
      <line x1="9" y1="18" x2="9.01" y2="18" />
      <line x1="15" y1="18" x2="15.01" y2="18" />
    </svg>
  )
}

export function Users({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function Leaf({ strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg {...svgProps(rest)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={rest.className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <line x1="2" y1="22" x2="11" y2="20" />
    </svg>
  )
}
