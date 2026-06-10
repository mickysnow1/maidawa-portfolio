import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Nav from './Nav'

describe('Nav', () => {
  it('renders the wordmark and main navigation links', () => {
    render(<Nav />)
    expect(screen.getByLabelText('Michael — home')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
    expect(screen.getAllByText('about').length).toBeGreaterThan(0)
    expect(screen.getAllByText('skills').length).toBeGreaterThan(0)
    expect(screen.getAllByText('work').length).toBeGreaterThan(0)
    expect(screen.getAllByText('contact').length).toBeGreaterThan(0)
  })

  it('toggles the mobile drawer when the hamburger is clicked', () => {
    render(<Nav />)
    const hamburger = screen.getByLabelText(/open menu/i)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    expect(hamburger).toHaveAttribute('aria-label', 'Close menu')
  })
})
