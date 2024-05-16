import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApi } from '../api/categoryApi'; // Assuming api.js is in the same directory

// Initial state
const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// Thunk to fetch all categories
export const fetchAllCategories = createAsyncThunk(
  'category/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await categoryApi.getAllCategoriesCtrl();
      return categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Category slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
