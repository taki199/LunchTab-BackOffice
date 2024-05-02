import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import orderReducer from '../features/orderSlice'; // Import the orderReducer
import globalReducer from '../state/index';

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer, // Add the orderReducer to the store
    global: globalReducer,
  },
});

export default store;