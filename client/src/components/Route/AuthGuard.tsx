import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { auth, logout } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';

const AuthGuard: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(auth(token));
    } else {
      dispatch(logout()); 
    }
  }, [dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;