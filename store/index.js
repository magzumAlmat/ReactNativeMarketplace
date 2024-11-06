import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice'; // импортируйте ваш слайс или слайсы
import productSlice from './slices/productSlice'
import cartSlice from './slices/cartSlice'
import orderSlice from './slices/orderSlice'
// import guestUserSlice from './slices/guestUserSlice'
import guestUserReducer from './slices/guestUserSlice'
export const store = configureStore({
  reducer: {
    user: userSlice, // подключите все необходимые слайсы
    product:productSlice,
    cart:cartSlice,
    order: orderSlice,
    guestUser: guestUserReducer,

  },
});
export default store;