// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId:null,
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
    setUserId: (state, action) => {
      userId=state.id
      state.id = action.payload;
      console.log(' output from UserSlice state= ',state.id)

    },
    
  },
});

export const { setUserId,setAuth, incrementClickCount, decrementClickCount, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
