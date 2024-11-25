import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../redux/slices/authSlice';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(auth(token));
    }
  }, [dispatch]);

  return <>{children}</>;
};
