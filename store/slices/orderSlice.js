import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const host = "http://localhost:8000/";

const initialState = {
  orderDetails: null,
};

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     saveOrderDetails: (state, action) => {
//       state.orderDetails = action.payload; 
//       console.log('Детали заказа- ', state.orderDetails);
//     },
//   },
// });

// Action to create an order


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
      console.log('Order details:', state.orderDetails);
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateOrder: (state, action) => {
      const { orderId, updatedOrder } = action.payload;
      const index = state.orders.findIndex((order) => order.id === orderId);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updatedOrder };
      }
    },
    deleteOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderId);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

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


// Action to create an order
// export const createOrderAction = ({ orderData }) => async (dispatch) => {
//   dispatch(saveOrderDetails(orderData)); // Save order details first

//   const { cartItems, address, totalAmount, additionalNotes } = orderData;
//   const product_ids = cartItems.map((item) => [item.id, item.quantity]); // Transform cartItems to the required format

//   try {
//     const response = await axios.post(`${host}api/store/createorder`, {
//       username: 'Test User', // Replace with actual user data
//       phone: '+7 7777777777', // Replace with actual phone number
//       address: address,
//       status: 'some status', // Replace with appropriate status
//       product_ids: product_ids,
//       totalPrice: totalAmount,
//       additionalNotes: additionalNotes,
//     });

//     console.log('Order created successfully:', response.data);
//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw error;
//   }
// };

// Action to fetch orders
export const fetchOrdersAction = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${host}api/store/allorders`); // Replace with your API endpoint
    dispatch(setOrders(response.data));
  } catch (error) {
    console.error('Error fetching orders:', error);
    dispatch(setError('Error fetching orders.'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Action to update an order
export const updateOrderAction = (orderId, updatedOrder) => async (dispatch) => {
  try {
    const response = await axios.post(`${host}api/store/order/${orderId}/editorder`, updatedOrder); // Replace with your API endpoint
    dispatch(updateOrder({ orderId, updatedOrder: response.data }));
  } catch (error) {
    console.error('Error updating order:', error);
    dispatch(setError('Error updating order.'));
  }
};

// Action to delete an order
export const deleteOrderAction = (orderId) => async (dispatch) => {
  try {
    await axios.delete(`${host}api/store/orders/${orderId}`); // Replace with your API endpoint
    dispatch(deleteOrder(orderId));
  } catch (error) {
    console.error('Error deleting order:', error);
    dispatch(setError('Error deleting order.'));
  }
};

export const { saveOrderDetails, setOrders, updateOrder, deleteOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;





// export const { saveOrderDetails } = orderSlice.actions;
// export default orderSlice.reducer;
