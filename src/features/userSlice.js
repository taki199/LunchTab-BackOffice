import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from '../api/userApi';

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (credentials, thunkAPI) => {
    try {
      const user = await userApi.loginUser(credentials);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const users = await userApi.getAllUsersCtrl();
      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const newUser = await userApi.registerUserCtrl(userData);
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setAuthenticated = (isAuthenticated) => {
  return {
    type: 'user/setAuthenticated',
    payload: isAuthenticated,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('userData');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle user creation success without affecting current user state
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
