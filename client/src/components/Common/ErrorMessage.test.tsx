import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render the error message', () => {
    render(<ErrorMessage message="Test Error" />);
    const errorElement = screen.getByText('Test Error');
    expect(errorElement).toBeInTheDocument(); 
  });
});