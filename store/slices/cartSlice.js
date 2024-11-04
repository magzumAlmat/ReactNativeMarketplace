// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Update quantity if exists
      } else {
        state.items.push(action.payload); // Add new item
      }
    },
    updateCartItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity; // Update the quantity
      }
    },
    incrementQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
      }
    },
    decrementQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrement quantity if greater than 1
        } else {
          state.items = state.items.filter(item => item.id !== action.payload.id); // Remove item if quantity is 0
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); // Remove item by id
    },
  },
});

export const { addToCart, updateCartItem, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
