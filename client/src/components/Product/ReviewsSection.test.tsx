import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ReviewsSection from './ReviewsSection';

const mockStore = configureStore([]);
const mockAddReview = jest.fn();

jest.mock('../../services/ProductService', () => ({
  addReview: jest.fn((id: string, review: { user: string; review: string; rating: number }) => {
    return Promise.resolve({
      reviews: [{ review: 'Existing review', rating: 4 }, review],
    });
  }),
}));

describe('ReviewsSection Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      product:{
        product: {
          _id: '6742f6ad38ea98ec8456055b',
          reviews: [
            { review: 'Great product!', rating: 5 },
            { review: 'Average quality.', rating: 3 },
          ],
        },
      }
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewsSection />
        </BrowserRouter>
      </Provider>
    );

  it('renders reviews correctly', () => {
    renderComponent();

    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
    expect(screen.getByText('Average quality.')).toBeInTheDocument();
  });

  it('renders the "Add Review" section', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Type a review...')).toBeInTheDocument();
    expect(screen.getByText('Add Review.')).toBeInTheDocument();
  });

  it('displays error when review or rating is invalid', async () => {
    renderComponent();

    const addButton = screen.getByText('Add Review');
    fireEvent.click(addButton);

    const errorMessage = await screen.findByText(
      'Please provide a valid review and rating between 1 and 5.'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('allows a user to add a review to a specific product', async () => {
    renderComponent();
    const reviewTextarea = screen.getByPlaceholderText('Type a review...');
    const ratingSelect = screen.getByLabelText(/Rating:/);
    const addButton = screen.getByText('Add Review');
   
    fireEvent.change(reviewTextarea, { target: { value: 'Test review for product 1' } });
    fireEvent.change(ratingSelect, { target: { value: '5' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(require('../../services/ProductService').addReview).toHaveBeenCalledWith(
        '6742f6ad38ea98ec8456055b',
        {
          user: 'Anonymous User',
          review: 'Test review for product 1',
          rating: 5,
        }
      );
    });
  });

  it('clears the input fields after adding a review', async () => {
    renderComponent();

    const reviewTextarea = screen.getByPlaceholderText('Type a review...');
    const ratingSelect = screen.getByLabelText(/Rating:/);
    const addButton = screen.getByText('Add Review');

    fireEvent.change(reviewTextarea, { target: { value: 'Clear test review' } });
    fireEvent.change(ratingSelect, { target: { value: '5' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(reviewTextarea).toHaveValue('');
      expect(ratingSelect).toHaveValue('0');
    });
  });

  it('displays "There is no review" when there are no reviews', () => {
    store = mockStore({
      product: {
        product: {
          reviews: [],
        },
      },
    });

    renderComponent();

    expect(screen.getByText('There is no review.')).toBeInTheDocument();
  });
});