import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice'; // импортируйте ваш слайс или слайсы
import productSlice from './slices/productSlice'
import cartSlice from './slices/cartSlice'
export const store = configureStore({
  reducer: {
    user: userSlice, // подключите все необходимые слайсы
    product:productSlice,
    cart:cartSlice,
  },
});
export default store;