import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice'; // импортируйте ваш слайс или слайсы
import productSlice from './slices/productSlice'

export const store = configureStore({
  reducer: {
    user: userSlice, // подключите все необходимые слайсы
    product:productSlice,
  },
});
export default store;