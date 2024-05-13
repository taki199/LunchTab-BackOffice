import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import orderReducer from '../features/orderSlice';
import globalReducer from '../state/index';
import customerReducer from '../features/customerSlice';
import dishReducer from '../features/dishSlice';
import categoryReducer from '../features/categorySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    global: globalReducer,
    customer: customerReducer,
    dish: dishReducer,
    category: categoryReducer,
  },
});

export default store;
