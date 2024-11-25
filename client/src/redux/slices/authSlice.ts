import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      localStorage.setItem('authToken', action.payload);  
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
  },
});

export const { auth, logout } = authSlice.actions;

export default authSlice.reducer;
