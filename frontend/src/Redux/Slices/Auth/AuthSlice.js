import { createSlice } from "@reduxjs/toolkit";
import { LoadUser, LogOut, login, register } from "./actions";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --------------------register--------------------

    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      }),
      builder.addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // --------------------login--------------------

    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // --------------------load user--------------------

    builder.addCase(LoadUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(LoadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      }),
      builder.addCase(LoadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // --------------------Log Out--------------------

    builder.addCase(LogOut.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(LogOut.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      }),
      builder.addCase(LogOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
