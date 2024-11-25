import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatDate } from '../../utils/formatDate';
import StarRating from './StarRating';

const DetailSection: React.FC = () => {
  const { product } = useSelector((state: RootState) => state.product);

  if (!product) {
    return <>Product not found.</>
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <p className="text-lg text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold text-gray-800 mb-2">
        Price: <span className="text-green-500">{product.price} {product.currency}</span>
      </p>
      <p className="text-lg text-gray-500 mb-2">Arrival Date: {formatDate(product.arrivalDate)}</p>
      <p className="text-gray-600 mb-2">
        Review Count: <span className="font-medium">{product.reviews?.length}</span>
      </p>
      <div className="flex items-center gap-2">
        <p className="text-gray-600">Average Rating:</p>
        <span className="text-yellow-500 text-lg font-semibold">
          {product.averageRating.toFixed(1)}
        </span>
        <StarRating rating={product.averageRating} />
      </div>
    </div>
  );
} 

export default DetailSection;
