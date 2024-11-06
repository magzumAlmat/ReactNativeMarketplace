// slices/guestUserSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUserId } from './userSlice';
const initialState = {
  phone: '',
  streetOrHomeNumber: '',
  apartmentOrOffice: '',
  entrance: '',
  floor: '',
};

const guestUserSlice = createSlice({
  name: 'guestUser',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setStreetOrHomeNumber: (state, action) => {
      state.streetOrHomeNumber = action.payload;
    },
    setApartmentOrOffice: (state, action) => {
      state.apartmentOrOffice = action.payload;
    },
    setEntrance: (state, action) => {
      state.entrance = action.payload;
    },
    setFloor: (state, action) => {
      state.floor = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    clearGuestUserInfo: (state) => {
      // Reset all user information to initial state
      state.phone = '';
      state.streetOrHomeNumber = '';
      state.apartmentOrOffice = '';
      state.entrance = '';
      state.floor = '';
    },
  },
});

const host = "http://localhost:8000/";
// Replace with actual host URL

export const createProfileAction = ({ profileData }) => async (dispatch) => {
  console.log('this is orderID= ',profileData)
  console.log()
  console.log('this is orderID= ',profileData.OrderId)
  // Dispatch initial state to Redux store if needed
  // dispatch(setId(profileData.id));
  // dispatch(setPhone(profileData.phone));
  // dispatch(setStreetOrHomeNumber(profileData.streetOrHomeNumber));
  // dispatch(setApartmentOrOffice(profileData.apartmentOrOffice));
  // dispatch(setEntrance(profileData.entrance));
  // dispatch(setFloor(profileData.floor));

  const { phone, streetOrHomeNumber, apartmentOrOffice, entrance, floor,OrderId } = profileData;
  // const order_ids = OrderId.map(item => [item.id, item.quantity]);
  // console.log()
  try {
    const response = await axios.post(`${host}api/auth/createuser`, {
      OrderIds:OrderId,
      phone:phone,
      StreetOrHomeNumber:streetOrHomeNumber,
      ApartmentOrOffice:apartmentOrOffice,
      Entrance:entrance,
      Floor:floor,

      // phone:'1232' ,
      // streetOrHomeNumber:'3445',
      // apartmentOrOffice:'a34',
      // entrance:'3434',
      // floor:'111',
     
    });
    
    // Handle successful response here
    console.log('Profile created successfully:', response.data);
    dispatch(setUserId(response.data))
    
    // You can add further steps like navigating to another screen or updating additional data
    Alert('Профиль успешно обновлен!', 'Ваши данные были успешно сохранены.');

  } catch (error) {
    // Handle errors
    console.error('Error creating profile:', error);
    Alert.alert('Ошибка!', 'Не удалось сохранить данные. Попробуйте еще раз.');
    throw error;
  }
};

export const {
  setPhone,
  setStreetOrHomeNumber,
  setApartmentOrOffice,
  setEntrance,
  setFloor,
  clearGuestUserInfo,
} = guestUserSlice.actions;

export default guestUserSlice.reducer;
