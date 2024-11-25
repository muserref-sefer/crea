import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../pages/ProductDetail';

export const initialState: { product: Product | null } = {
  product: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    resetProduct: () => initialState,
  },
});

export const { setProduct,resetProduct } = productSlice.actions;

export default productSlice.reducer;
