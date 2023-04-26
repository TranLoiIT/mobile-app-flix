import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './authen/authSlice';

export const store = configureStore({
  reducer: {
    auth: loginSlice,
  },
});
