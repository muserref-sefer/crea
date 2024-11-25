import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/Common/ErrorMessage';
import Loader from '../components/Common/Loader';
import DetailsSection from '../components/Product/DetailsSection';
import ImageSlider from '../components/Product/ImageSlider';
import ProductTabs from '../components/Product/ProductTabs';
import ReviewsSection from '../components/Product/ReviewsSection';
import StarRating from '../components/Product/StarRating';
import { setProduct } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';
import { getProductById } from '../services/ProductService';

const DEFAULT_IMAGE = 'https://fakeimg.pl/400x300?text=No+Image+Available';

interface Review {
  user: string;
  review: string;
  rating: number;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  reviews: Review[];
  averageRating: number;
  images: string[];
  arrivalDate: string
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product.product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id as string);
        dispatch(setProduct(data || {}));
      } catch (err) {
        setError('Ürün bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <div className="text-center text-xl text-gray-600 mt-10">Ürün Bulunamadı.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ImageSlider images={(product?.images?.length ?? 0) > 0 ? product.images : [DEFAULT_IMAGE]} />
      <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">
            Price: <span className="font-semibold">{product.price} {product.currency}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-yellow-500 text-2xl font-semibold">
              <StarRating rating={product.averageRating} />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ProductTabs
          tabs={[
            {
              label: 'Details',
              content: <DetailsSection />,
            },
            {
              label: 'Reviews and Ratings',
              content: <ReviewsSection />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductDetail;