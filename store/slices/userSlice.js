// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  userPassID:null,
  userId:null,
  isAuth: false,
  userInfo: {},
  userPhone:null,
  userStreetOrHomeNumber:null,
  userApartmentOrOffice:null,
  userEntrance:null,
  userFloor:null,
  userOrderIds:[],
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

      console.log('Сработал  SETUSER ID',action.payload)
      console.log()
      // state.id = action.payload;
      state.userId=action.payload;
      state.userPassID=state.userId.user.id
      state.isAuth=true
      state.userPhone=action.payload.user.phone,
      state.userStreetOrHomeNumber=action.payload.user.userStreetOrHomeNumber,
      state.userApartmentOrOffice=action.payload.user.userApartmentOrOffice,
      state.userEntrance=action.payload.user.userEntrance,
      state.userFloor=action.payload.user.userFloor,
      console.log(' output from UserSlice state= ',state.userPhone,state.userStreetOrHomeNumber,      state.userApartmentOrOffice,      state.userEntrance)
      

    },
    
  },
});

export const { setUserId,setAuth, incrementClickCount, decrementClickCount, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
