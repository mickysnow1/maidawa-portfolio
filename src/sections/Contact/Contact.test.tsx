import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Contact from './Contact'

describe('Contact form validation', () => {
  it('surfaces validation errors when fields are empty on submit', () => {
    render(<Contact />)
    const form = screen.getByLabelText(/contact form/i)
    fireEvent.submit(form)
    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument()
    expect(screen.getByText(/tell me about your project/i)).toBeInTheDocument()
  })

  it('exposes the direct email link', () => {
    render(<Contact />)
    const link = screen.getByLabelText(/email michael directly/i)
    expect(link).toHaveAttribute('href', 'mailto:your@email.com')
  })
})
