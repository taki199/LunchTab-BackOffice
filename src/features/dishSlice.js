import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dishApi } from '../api/dishApi';

// Define async thunk for fetching dishes
export const fetchDishes = createAsyncThunk(
  "dish/fetchDishes",
  async (_, thunkAPI) => {
    try {
      const response = await dishApi.getAllDishesCtrl();
      console.log('Fetched dishes:', response); // Add this line for debugging
      if (!Array.isArray(response.data)) {
        throw new Error("Expected response to be an array");
      }
      return response.data; // Return the data property which is the array of dishes
    } catch (error) {
      console.error('Error fetching dishes:', error.message); // Add this line for debugging
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define async thunk for creating a new dish
export const createNewDish = createAsyncThunk(
  "dish/createNewDish",
  async (newDishData, thunkAPI) => {
    try {
      const createdDish = await dishApi.createDishCtrl(newDishData);
      console.log('Created dish:', createdDish); // Add this line for debugging
      if (!createdDish || typeof createdDish !== 'object') {
        throw new Error("Expected response to be an object");
      }
      return createdDish;
    } catch (error) {
      console.error('Error creating dish:', error.message); // Add this line for debugging
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteDish = createAsyncThunk(
  "dish/deleteDish",
  async (dishId, thunkAPI) => {
    try {
      await dishApi.deleteDishCtrl(dishId);
      return dishId;
    } catch (error) {
      console.error('Error deleting dish:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateDish = createAsyncThunk(
  "dish/updateDish",
  async ({ id, credentials }, thunkAPI) => {
    try {
      const updatedDish = await dishApi.updateDishCtrl(id, credentials);
      console.log('Updated dish:', updatedDish); // Add this line for debugging
      if (!updatedDish || typeof updatedDish !== 'object') {
        throw new Error("Expected response to be an object");
      }
      return updatedDish;
    } catch (error) {
      console.error('Error updating dish:', error.message); // Add this line for debugging
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create dish slice
const dishSlice = createSlice({
  name: "dish",
  initialState: {
    dishes: [], // Initialize dishes as an array
    loading: false,
    error: null,
    creating: false,
    createError: null,
    updating: false,
    updateError: null,
  },
  reducers: {
    // Add any additional reducers specific to dish management if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Action payload (fulfilled):', action.payload); // Add this line for debugging
        state.dishes = Array.isArray(action.payload) ? action.payload : []; // Ensure action.payload is an array
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewDish.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createNewDish.fulfilled, (state, action) => {
        state.creating = false;
        console.log('Action payload (create fulfilled):', action.payload); // Add this line for debugging
        state.dishes = [...state.dishes, action.payload]; // Append new dish to dishes array
      })
      .addCase(createNewDish.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })
      .addCase(deleteDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = state.dishes.filter(dish => dish._id !== action.payload);
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDish.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.updating = false;
        console.log('Action payload (update fulfilled):', action.payload); // Add this line for debugging
        state.dishes = state.dishes.map(dish => 
          dish._id === action.payload._id ? action.payload : dish
        ); // Update the dish in the dishes array
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      });
      
  },
});

export default dishSlice.reducer;
