// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  userInfo: {},
  clickCount: 0,
   message: "Initial message"
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    incrementClickCount: (state) => {
      state.clickCount += 1;
    },
    decrementClickCount: (state) => {
      state.clickCount -= 1;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setAuth, incrementClickCount, decrementClickCount, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
