import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { getProducts } from '../services/ProductService';
import ProductList from './ProductList';

jest.mock('../services/ProductService', () => ({
  getProducts: jest.fn(),
}));

jest.mock('../components/Common/Loader', () => () => <div>Loading...</div>);
jest.mock('../components/Common/ErrorMessage', () => ({ message }: { message: string }) => (
  <div>Error: {message}</div>
));
jest.mock('../components/Product/ProductCard', () => ({ product }: { product: any }) => (
  <div data-testid="product-card">{product.name}</div>
));

describe('ProductList', () => {
  it('renders the loader while fetching products', async () => {
    (getProducts as jest.Mock).mockImplementation(() => new Promise(() => {})); 

    render(<ProductList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders an error message when fetching products fails', async () => {
    (getProducts as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to load products')).toBeInTheDocument();
    });
  });

  it('renders a list of products when fetching succeeds', async () => {
    const mockProducts = [
      { _id: '1', name: 'Product 1' },
      { _id: '2', name: 'Product 2' },
      { _id: '3', name: 'Product 3' },
    ];
    (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getAllByTestId('product-card')).toHaveLength(mockProducts.length);
    });

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});