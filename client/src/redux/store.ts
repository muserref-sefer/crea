import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

const authPersistConfig = {
  key: 'auth',
  storage, 
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, 
    product: productReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;