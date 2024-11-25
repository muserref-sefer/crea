import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { formatDate } from '../../utils/formatDate';
import DetailSection from './DetailsSection';

jest.mock('./StarRating', () => {
  return ({ rating }: { rating: number }) => <div>StarRating: {rating}</div>;
});

jest.mock('../../utils/formatDate', () => ({
  formatDate: jest.fn((date: string) => `Formatted Date: ${date}`),
}));

const mockStore = configureStore([]);

describe('DetailSection Component', () => {
  const productMock = {
    _id: '123',
    description: 'This is a sample product.',
    price: 250,
    currency: 'USD',
    arrivalDate: '2024-01-01',
    reviews: [
      { user: 'John Doe', review: 'Great product!', rating: 5 },
      { user: 'Jane Doe', review: 'Good quality!', rating: 4 },
    ],
    averageRating: 4.5,
  };

  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      product: { product: productMock },
    });
  });

  it('renders product details correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DetailSection />
      </Provider>
    );

    expect(getByText(productMock.description)).toBeInTheDocument();

    expect(getByText(`Price:`)).toBeInTheDocument();
    expect(getByText(`${productMock.price} ${productMock.currency}`)).toBeInTheDocument();

    expect(formatDate).toHaveBeenCalledWith(productMock.arrivalDate);
    expect(getByText(/Arrival Date:\s*Formatted Date: 2024-01-01/)).toBeInTheDocument();

    expect(getByText(`Review Count:`)).toBeInTheDocument();
    expect(getByText(productMock.reviews.length.toString())).toBeInTheDocument();

    expect(getByText(`Average Rating:`)).toBeInTheDocument();
    expect(getByText(productMock.averageRating.toFixed(1))).toBeInTheDocument();

    expect(getByText(`StarRating: ${productMock.averageRating}`)).toBeInTheDocument();
  });

  it('renders "Product not found" when no product is available', () => {
    store = mockStore({
      product: { product: null },
    });

    const { getByText } = render(
      <Provider store={store}>
        <DetailSection />
      </Provider>
    );

    expect(getByText('Product not found.')).toBeInTheDocument();
  });
});