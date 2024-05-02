// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { dishApi } from '../api/dishApi';

// // Define async thunk for fetching dishes
// export const fetchDishes = createAsyncThunk(
//   "dish/fetchDishes",
//   async (_, thunkAPI) => {
//     try {
//       const dishes = await dishApi.getAllDishesCtrl();
//       return dishes;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Create dish slice
// const dishSlice = createSlice({
//   name: "dish",
//   initialState: {
//     dishes: [], // Initialize dishes array
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // Add any additional reducers specific to dish management if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDishes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDishes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.dishes = action.payload;
//       })
//       .addCase(fetchDishes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default dishSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dishApi } from '../api/dishApi';

// Define async thunk for fetching dishes
export const fetchDishes = createAsyncThunk(
  "dish/fetchDishes",
  async (_, thunkAPI) => {
    try {
      const dishes = await dishApi.getAllDishesCtrl();
      return dishes;
    } catch (error) {
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
      return createdDish;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create dish slice
const dishSlice = createSlice({
  name: "dish",
  initialState: {
    dishes: [], // Initialize dishes array
    loading: false,
    error: null,
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
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes.push(action.payload); // Add the newly created dish to the state
      })
      .addCase(createNewDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dishSlice.reducer;
