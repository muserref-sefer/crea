import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../../pages/ProductDetail';
import ProductCard from './ProductCard';

jest.mock('./StarRating', () => {
  return ({ rating }: { rating: number }) => <div>Rating: {rating}</div>;
});

const DEFAULT_IMAGE = 'https://fakeimg.pl/400x300?text=No+Image+Available';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockProduct: Product = {
  _id: '12345',
  name: 'Sample Product',
  price: 250,
  currency: '$',
  description: 'A high-quality product for testing.',
  reviews: [
    { user: 'Alice', review: 'Great product!', rating: 5, createdAt: '2024-11-20T10:00:00.000Z' },
    { user: 'Bob', review: 'Not bad.', rating: 4, createdAt: '2024-11-18T14:30:00.000Z' },
  ],
  averageRating: 4.5,
  images: ['https://fakeimg.pl/150'],
  arrivalDate: '2024-12-01T00:00:00.000Z',
};

describe('ProductCard Component', () => {
  const renderComponent = (product: Product) =>
    render(
      <BrowserRouter>
        <ProductCard product={product} />
      </BrowserRouter>
    );

    it('renders product details correctly', () => {
      renderComponent(mockProduct);
    
      expect(screen.getByText('Sample Product')).toBeInTheDocument();
    
      expect(screen.getByText((_, node) => {
        const hasText = (node: Element) =>
          node.textContent === 'Fiyat: $250';
        const nodeHasText = hasText(node!);
        const childrenDontHaveText = Array.from(node!.children).every(
          child => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      })).toBeInTheDocument();
    
      expect(screen.getByText('Rating: 4.5')).toBeInTheDocument();
      expect(screen.getByAltText('Sample Product')).toHaveAttribute(
        'src',
        mockProduct.images[0]
      );
    });

  it('navigates to the correct product detail page on click', () => {
    renderComponent(mockProduct);

    const card = screen.getByText('Sample Product').closest('div');
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith('/product/12345');
  });

  it('uses the default image when no images are provided', () => {
    const productWithoutImages = { ...mockProduct, images: [] };
    renderComponent(productWithoutImages);

    expect(screen.getByAltText('Sample Product')).toHaveAttribute('src', DEFAULT_IMAGE);
  });
});