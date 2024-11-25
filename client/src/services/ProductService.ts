import axiosInstance from './axiosInstance';

export const getProducts = async () => {
  const response = await axiosInstance.get('/products/list');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const addReview = async (id: string, review: { user: string; review: string; rating: number }) => {
  const response = await axiosInstance.post(`/products/${id}/review`, review);
  return response.data;
};