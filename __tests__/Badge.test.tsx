import { render, screen } from '@testing-library/react'
import { Badge } from '../components/Badge'

describe('Badge Component Test', () => {
  it('should render Badge with correct text', () => {
    render(<Badge text='test' />)

    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
