import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Avatar, AvatarGroupCount } from '../../../components/ui/Avatar'

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="https://picsum.photos/200" alt="Jane Doe" />)
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument()
  })

  it('renders two-letter initials from a two-word alt when src is missing', () => {
    render(<Avatar alt="Jane Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders a single-letter initial from a single-word alt', () => {
    render(<Avatar alt="Amy" />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('falls back to initials when the image fails to load', () => {
    render(<Avatar src="https://broken.example/404.png" alt="Jane Doe" />)
    fireEvent.error(screen.getByRole('img'))
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it.each(['default', 'solid'] as const)('renders the %s variant', (variant) => {
    render(<Avatar variant={variant} alt="Jane Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it.each(['sm', 'md', 'lg'] as const)('renders the %s size', (size) => {
    render(<Avatar size={size} alt="Jane Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it.each(['default', 'solid'] as const)('has no accessibility violations — %s variant', async (variant) => {
    const { container } = render(<Avatar variant={variant} src="https://picsum.photos/200" alt="Jane Doe" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('AvatarGroupCount', () => {
  it('renders the count prefixed with a plus sign', () => {
    render(<AvatarGroupCount count={3} />)
    expect(screen.getByText('+3')).toBeInTheDocument()
  })

  it.each(['sm', 'md', 'lg'] as const)('renders the %s size', (size) => {
    render(<AvatarGroupCount count={5} size={size} />)
    expect(screen.getByText('+5')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<AvatarGroupCount count={3} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
