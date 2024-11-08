import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const host = 'http://localhost:8000/';

const initialState = {
  orderDetails: null,
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
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
    // updateOrder: (state, action) => {
    //   const { orderId, updatedOrder } = action.payload;

    //   const index = state.orders.findIndex(order => order.id === orderId);
    //   if (index !== -1) {
    //     // Using spread operator to create a new array to avoid mutating the state
    //     state.orders = [
    //       ...state.orders.slice(0, index),
    //       { ...state.orders[index], ...updatedOrder },
    //       ...state.orders.slice(index + 1),
    //     ];
        
    //   }
    //   console.log('state.orders= ',state.orders)
    // },

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// export const fetchOrdersAction = () => async (dispatch, getState) => {
//   const state = getState();
//   let userPassID = state.user?.userPassID;

//   if (!userPassID) {
//     console.warn('UserId is null, using static UserId');
//     userPassID = 11111; // Replace with your fallback UserId if needed
//   }

//   try {
//     dispatch(setLoading(true));

//     const response = await axios.get(`${host}api/store/orders`, {
//       params: { UserId: userPassID },
//     });

//     dispatch(setOrders(response.data)); // Populate orders from response
//     dispatch(setLoading(false));
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     dispatch(setError(error.message));
//     dispatch(setLoading(false));
//   }
// };

export const updateOrderAction = (orderId, updatedOrder) => async (dispatch) => {
  console.log('UpdateOrderAction from order slice started', orderId, updatedOrder);
  try {
    const response = await axios.put(`${host}api/store/order/${orderId}/editorder`, updatedOrder); // Replace with your API endpoint
    // Dispatch the updated order to the Redux store
    // dispatch(updateOrder({ orderId, updatedOrder: response.data }));
    console.log('Update response data:', response.data);
    dispatch({ type: 'order/updateOrder', payload: { orderId, updatedOrder: response.data } });
    
  } catch (error) {
    console.error('Error updating order:', error);
    dispatch(setError('Error updating order.'));
  }

  // try {
  //   const response = await axios.put(`${host}api/store/order/${orderId}/editorder`, updatedOrder);
  //   console.log('Update successful:', response.data);
  //   dispatch(updateOrder({ orderId, updatedOrder: response.data }));
  // } catch (error) {
  //   console.error('Error updating order:', error);
  //   dispatch(setError('Error updating order.'));
  //   Alert.alert('Error', 'Failed to update the order.');
  // }
  console.log('UpdateOrderAction completed');
};



export const fetchOrdersAction = () => async (dispatch) => {
  console.log('fetchOrdersAction started')
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

export const deleteOrderAction = (orderId) => async (dispatch) => {
  try {
    await axios.delete(`${host}api/store/order/${orderId}`); // Replace with your API endpoint
    dispatch(deleteOrder(orderId));
  } catch (error) {
    console.error('Error deleting order:', error);
    dispatch(setError('Error deleting order.'));
  }
};

export const createOrderAction = ({ orderData }) => async (dispatch, getState) => {
  const state = getState();
  let userPassID = state.user?.userPassID;

  if (!userPassID) {
    console.warn('UserId is null, using static UserId');
    userPassID = 0; // Replace with your fallback UserId if needed
  }

  try {
    console.log('ORDER DATA FROM CREATE ORDER= ',orderData.time)
    const { cartItems,  totalAmount,additionalNotes,address,time} = orderData;

    const product_ids = cartItems.map(item => [item.id, item.quantity]);

    const response = await axios.post(`${host}api/store/createorder`, {
      UserId: userPassID, // Pass the UserId here
      product_ids:product_ids,
      // address:address,
      status: 'Pending',
      totalPrice: totalAmount,
      additionalNotes:additionalNotes,
      time:time
      // streetOrHomeNumber:s
    });

    console.log('Order created successfully:', response.data);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};


export const { saveOrderDetails, setOrders, updateOrder, deleteOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
