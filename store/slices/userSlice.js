// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userPassID:null,
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
      console.log('Сработал  SETUSER ID')
      console.log()
      // state.id = action.payload;
      state.userId=action.payload;
      state.userPassID=state.userId.user.id
      console.log(' output from UserSlice state= ',state.userId,typeof(state.userId),state.userId.user.id,'state.userPassID== ',state.userPassID)
      

    },
    
  },
});

export const { setUserId,setAuth, incrementClickCount, decrementClickCount, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
