import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { customerApi } from '../api/customerApi';

export const fetchAllCustomers = createAsyncThunk(
  "customer/fetchAllCustomers",
  async (_, thunkAPI) => {
    try {
      const customers = await customerApi.getAllCustomers();
      console.log('Fetched customers:', customers); // Debugging
      return customers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (newCustomerData, thunkAPI) => {
    try {
      const response = await customerApi.createCustomer(newCustomerData);
      console.log('Created customer:', response); // Debugging
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (customerId, thunkAPI) => {
    try {
      await customerApi.deleteCustomerById(customerId);
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
      const updatedCustomer = await customerApi.updateCustomerById(customerData._id, customerData);
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
        console.log('State after fetchAllCustomers.fulfilled:', current(state)); // Debugging
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
        console.log('State after createCustomer.fulfilled:', current(state)); // Debugging
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const deletedCustomerId = action.payload; // Assuming the payload is the deleted user's ID
        if (Array.isArray(state.customers)) {
          state.customers = state.customers.filter(customer => customer._id !== deletedCustomerId);
        } else {
          state.customers = [];
        }
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.customers.findIndex(customer => customer._id === action.payload._id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
        console.log('State after updateCustomer.fulfilled:', current(state)); // Debugging
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
