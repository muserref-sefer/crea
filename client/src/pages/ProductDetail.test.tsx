import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import productReducer, { initialState, resetProduct } from '../redux/slices/productSlice';
import { getProductById } from '../services/ProductService';
import ProductDetail, { Product } from './ProductDetail';

jest.mock('../services/ProductService', () => ({
  getProductById: jest.fn(),
}));

jest.mock('../components/Common/Loader', () => () => <div>Loading...</div>);
jest.mock('../components/Common/ErrorMessage', () => ({ message }: { message: string }) => (
  <div>Error: {message}</div>
));
jest.mock('../components/Product/DetailsSection', () => () => (
  <div data-testid="details-section">Details Section Mock</div>
));
jest.mock('../components/Product/ImageSlider', () => ({ images }: { images: string[] }) => (
  <div data-testid="image-slider">{images.join(', ')}</div>
));
jest.mock('../components/Product/StarRating', () => ({ rating }: { rating: number }) => (
  <div data-testid="star-rating">{`Rating: ${rating}`}</div>
));

type RootState = {
  product: {
    product: Product | null;
  };
};

describe('ProductDetail Tests', () => {
  let store: EnhancedStore<RootState>;

  const setupStore = (preloadedState = { product: initialState }) => {
    return configureStore({
      reducer: { product: productReducer },
      preloadedState,
    });
  };

  const renderComponent = (initialRoute: string) => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    store = setupStore();
    store.dispatch(resetProduct());
    jest.clearAllMocks();
  });

  const mockProduct: Product = {
    _id: '1',
    name: 'Test Product',
    price: 100,
    currency: 'USD',
    description: 'Test Description',
    images: ['image1.jpg', 'image2.jpg'],
    averageRating: 4.5,
    reviews: [],
    arrivalDate: ''
  };

  it('shows loader while fetching product data', () => {
    (getProductById as jest.Mock).mockImplementation(() => new Promise(() => {}));
    renderComponent('/product/1');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    (getProductById as jest.Mock).mockRejectedValueOnce(new Error('Ürün bilgileri yüklenirken bir hata oluştu.'));
    renderComponent('/product/1');

    await waitFor(() => {
      expect(screen.getByText('Error: Ürün bilgileri yüklenirken bir hata oluştu.')).toBeInTheDocument();
    });
  });

  it('dispatches setProduct with fetched product data', async () => {
    (getProductById as jest.Mock).mockResolvedValueOnce(mockProduct);
    renderComponent('/product/1');

    await waitFor(() => {
      const state = store.getState();
      expect(state.product.product).toEqual(mockProduct);
    });

    await waitFor(() => {
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

      const priceElement = screen.getByText(/Price:/i).closest('p');
      expect(within(priceElement!).getByText(/100 USD/i)).toBeInTheDocument();

      expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 4.5');
      expect(screen.getByTestId('image-slider')).toHaveTextContent('image1.jpg, image2.jpg');
    });
  });

  it('resetProduct reducer clears state', () => {
    store.dispatch(resetProduct());
    const state = store.getState().product;
    expect(state.product).toBeNull();
  });
});