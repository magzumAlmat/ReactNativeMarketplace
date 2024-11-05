// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrderDetails: (state, action) => {
      state.orderDetails = action.payload; 
      console.log('Детали заказа- ',state.orderDetails)
    },
  },
});

export const { saveOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;