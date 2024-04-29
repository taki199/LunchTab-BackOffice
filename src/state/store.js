import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'; // Update the path to correctly import userSlice
import globalReducer from './index'; // Import globalReducer from its correct location

const store = configureStore({
  reducer: {
    // Add your other slices here if you have them
    user: userReducer,
    global: globalReducer, // Use the imported globalReducer here
  },
});

export default store;
