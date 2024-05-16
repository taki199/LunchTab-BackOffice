// customerSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customerApi } from '../api/customerApi';

export const fetchAllCustomers = createAsyncThunk(
  "customer/fetchAllCustomers",
  async (_, thunkAPI) => {
    try {
      const customers = await customerApi.getAllCustomers();
      return customers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (customerId, thunkAPI) => {
    try {
      await customerApi.deleteCustomer(customerId);
      return customerId; // Return the deleted customerId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (customerData, thunkAPI) => {
    try {
      const updatedCustomer = await customerApi.updateCustomer(customerData);
      return updatedCustomer;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted customer from the state
        state.customers = state.customers.filter(customer => customer.id !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        // Update the customer in the state
        const updatedIndex = state.customers.findIndex(customer => customer.id === action.payload.id);
        state.customers[updatedIndex] = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
