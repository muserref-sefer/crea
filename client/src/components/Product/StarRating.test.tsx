import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating Component', () => {
  test('renders the correct number of full stars', () => {
    render(<StarRating rating={3} />);
    const fullStars = screen.getAllByTestId('full-star');
    expect(fullStars).toHaveLength(3);
  });

  test('renders a half star when the rating includes a decimal', () => {
    render(<StarRating rating={3.5} />);
    const fullStars = screen.getAllByTestId('full-star');
    const halfStar = screen.getByTestId('half-star');
    expect(fullStars).toHaveLength(3);
    expect(halfStar).toBeInTheDocument();
  });

  test('renders the correct number of empty stars', () => {
    render(<StarRating rating={3.5} />);
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars).toHaveLength(1);
  });

  test('applies the custom className if provided', () => {
    render(<StarRating rating={4} className="custom-class" />);
    const container = screen.getByRole('group');
    expect(container).toHaveClass('custom-class');
  });

  test('renders 5 empty stars when the rating is 0', () => {
    render(<StarRating rating={0} />);
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars).toHaveLength(5);
  });

  test('renders 5 full stars when the rating is 5', () => {
    render(<StarRating rating={5} />);
    const fullStars = screen.getAllByTestId('full-star');
    expect(fullStars).toHaveLength(5);
  });
});