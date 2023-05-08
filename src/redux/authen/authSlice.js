import {createSlice} from '@reduxjs/toolkit';

export const AUTH = 'auth';

export const initialAuth = {
  userEmail: '',
  userName: '',
  token: '',
  imageUser: '',
  history: [],
  _id: '',
};

const loginSlice = createSlice({
  name: AUTH,
  initialState: initialAuth,
  reducers: {
    loginApp(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    loginError(_state, action) {
      return {
        userEmail: '',
        userName: '',
        token: '',
        imageUser: '',
        history: [],
        _id: '',
      };
    },
    logoutSuccess(_state, action) {
      return {
        userEmail: '',
        userName: '',
        token: '',
        imageUser: '',
        history: [],
        _id: '',
      };
    },
  },
});

export const {loginApp, loginError, logoutSuccess} = loginSlice.actions;

export default loginSlice.reducer;
