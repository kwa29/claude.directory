import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct styles for variants', () => {
    const { getByText, rerender } = render(<Button variant="primary">Primary</Button>)
    expect(getByText('Primary')).toHaveClass('primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(getByText('Secondary')).toHaveClass('secondary')

    rerender(<Button variant="outline">Outline</Button>)
    expect(getByText('Outline')).toHaveClass('outline')
  })

  it('applies correct styles for sizes', () => {
    const { getByText, rerender } = render(<Button size="small">Small</Button>)
    expect(getByText('Small')).toHaveClass('small')

    rerender(<Button size="medium">Medium</Button>)
    expect(getByText('Medium')).toHaveClass('medium')

    rerender(<Button size="large">Large</Button>)
    expect(getByText('Large')).toHaveClass('large')
  })

  it('disables the button when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Disabled</Button>)
    expect(getByText('Disabled')).toBeDisabled()
    expect(getByText('Disabled')).toHaveClass('disabled')
  })
})