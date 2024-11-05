import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const host = "http://localhost:8000/";

const initialState = {
  orderDetails: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrderDetails: (state, action) => {
      state.orderDetails = action.payload; 
      console.log('Детали заказа- ', state.orderDetails);
    },
  },
});

// Action to create an order
export const createOrderAction = ({orderData}) => async (dispatch) => {
  dispatch(saveOrderDetails(orderData)); // Save order details first

  const { cartItems, address, totalAmount, additionalNotes } = orderData;

  // Transform cartItems to the required format: [[productId1, quantity1], [productId2, quantity2], ...]
  const product_ids = cartItems.map(item => [item.id, item.quantity]);

  try {
    const response = await axios.post(`${host}api/store/createorder`, {
      username: 'Test User', // Replace with actual user data as needed
      phone: '+7 7777777777', // Replace with actual phone number as needed
      address: address,
      status: 'some status', // Replace with appropriate status
      product_ids: product_ids, // Now it's an array of arrays
      totalPrice: totalAmount,
      additionalNotes: additionalNotes,
    });
    
    // Handle successful response here (e.g., navigate, show message)
    console.log('Order created successfully:', response.data);
  } catch (error) {
    // Handle errors
    console.error('Error creating order:', error);
    throw error;
  }
};

export const { saveOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
