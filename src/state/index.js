import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: "dark",
  status: 'idle',
  error: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUser.pending, (state) => { // Use fetchUser.pending instead of loginUser.pending
  //       state.status = 'loading';
  //       state.error = null;
  //     })
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       state.error = null;
  //       state.user = action.payload;
  //       localStorage.setItem('userData', JSON.stringify(action.payload));
  //     })
  //     .addCase(fetchUser.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.payload;
  //     });
  // },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
