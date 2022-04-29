import { createSlice } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
// import { COOKIES_ADDRESS } from '../constants/index';

const initialState = {
  account: '',
  web3Provider: null,
  kycStatus: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
      // Cookies.set(COOKIES_ADDRESS, action.payload);
    },
  },
  extraReducers: {},
});

export const { setAccount } = userSlice.actions;
const { reducer: userReducer } = userSlice;
export default userReducer;
