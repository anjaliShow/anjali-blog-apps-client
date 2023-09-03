import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  profiledata: {},
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      // console.log('state', state);
      // console.log('action', action);
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    profile: (state, action) => {
      state.profiledata = action.payload;
    },
  },
});

export const { login, logout, profile } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
