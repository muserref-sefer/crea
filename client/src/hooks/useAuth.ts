import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const loginUser = (token: string) => dispatch(auth(token));

  const logoutUser = () => {
    dispatch(logout()); 
    navigate('/'); 
  };

  return {
    isAuthenticated,
    auth: loginUser,
    logout: logoutUser,
  };
};