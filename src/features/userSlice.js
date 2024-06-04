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
      const response = await userApi.getAllUsersCtrl();
      return response.data; // Adjusting to match the provided data structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      await userApi.deleteUserProfileCtrl(userId);
      return userId; // Return the deleted user's ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await userApi.registerUserCtrl(userData);
      return response.data; // Adjusting to match the provided data structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const me = createAsyncThunk(
  'user/me',
  async (_, thunkAPI) => {
    try {
      const user = await userApi.getUserProfile();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changePhoto = createAsyncThunk(
  "user/changePhoto",
  async (formData, thunkAPI) => {
    try {
      const updatedUser = await userApi.profilePhotoUploaderCtrl(formData);
      return updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
  name: 'user',
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
        // Directly add the new user to the users array
        state.users.push(action.payload);
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
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUserId = action.payload; // Assuming the payload is the deleted user's ID
        if (Array.isArray(state.users)) {
          state.users = state.users.filter(user => user._id !== deletedUserId);
        } else {
          state.users = [];
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(me.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePhoto.fulfilled, (state, action) => {
        state.loading = false;
        // Update only the profile photo URL, not the entire user object
        state.user.profilePhoto = action.payload.profilePhoto;
      })
      .addCase(changePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type === 'user/setAuthenticated',
        (state, action) => {
          state.isAuthenticated = action.payload;
        }
      );
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
