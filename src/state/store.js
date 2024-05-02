import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import orderReducer from '../features/orderSlice'; // Import the orderReducer
import globalReducer from '../state/index';
import customerReducer from '../features/customerSlice';
import dishReducer from '../features/dishSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer, // Add the orderReducer to the store
    global: globalReducer,
    customer: customerReducer,
    dish: dishReducer,  // Use the imported globalReducer here
  },
});

export default store;