import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../pages/ProductDetail';
import StarRating from './StarRating';

const DEFAULT_IMAGE = 'https://fakeimg.pl/400x300?text=No+Image+Available';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={product.images[0] ?? DEFAULT_IMAGE}
        alt={product.name}
        className="w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2">
          Fiyat: <span className="font-bold">${product.price}</span>
        </p>
        <div className="mt-3">
          <StarRating rating={product.averageRating} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;