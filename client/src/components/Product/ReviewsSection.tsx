import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import { addReview } from '../../services/ProductService';
import StarRating from './StarRating';

export interface Review {
  text: string;
  rating: number;
}

const ReviewsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state: RootState) => state.product);
  
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [reviewError, setReviewError] = useState<string | null>(null);
  
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product?._id) {
      console.error('Product ID is not available.');
      return;
    }

    if (!review || rating < 1 || rating > 5) {
      setReviewError('Please provide a valid review and rating between 1 and 5.');
      return;
    }

    try {
      const newReview = {
        user: 'Anonymous User',
        review,
        rating,
      };    

      const updatedProduct = await addReview(product._id, newReview);
      dispatch(setProduct(updatedProduct)); 
      setReview(''); 
      setRating(0);
      setReviewError(null);
    } catch (err) {
      setReviewError('Failed to add review.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>
      {product?.reviews.length === 0 ? (
        <p className="text-gray-600">There is no review.</p>
      ) : (
        product?.reviews.map((reviewItem, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center mb-2">
              <strong className="text-gray-700">Rating:</strong>
              <StarRating rating={reviewItem.rating} className="ml-2" />
            </div>
            <p className="text-gray-600">{reviewItem.review}</p>
          </div>
        ))
      )}

      <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Add Review.</h3>
      <textarea
        placeholder="Type a review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows={4}
      />
      <div className="mb-4">
        <label className="flex items-center">
          <span className="mr-2 text-gray-600">Rating:</span>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Choose Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="text-red-500 text-sm mb-4">{reviewError}</p>
      <button
        onClick={handleAddReview}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Review
      </button>
    </div>
  );
};

export default ReviewsSection;
