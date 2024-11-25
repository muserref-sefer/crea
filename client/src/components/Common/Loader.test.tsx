import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('should render a loading spinner', () => {
    render(<Loader />);
    const loader = screen.getByRole('status'); 
    expect(loader).toBeInTheDocument();
  });
});