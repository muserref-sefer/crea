import Product from '../models/Product';

export const getAllProducts = async () => {
  return await Product.find();
};

export const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');
  return product;
};

export const addReview = async (productId: string, review: { user: string; review: string; rating: number }) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  const newReview = {
    ...review,
    createdAt: new Date(), 
  };

  product.reviews.push(newReview);

  const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  product.averageRating = totalRating / product.reviews.length;

  await product.save();
  return product;
};