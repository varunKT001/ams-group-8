import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, auth } from '../../api/user';
import { toast } from 'react-toastify';

const initialState = {
  data: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    ///////////////
    //// Login ////
    ///////////////
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      toast.success(`Logged in as ${action.payload.data.name}`);
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    //////////////////
    //// Register ////
    //////////////////
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      toast.success(`Registration successfull`);
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    ////////////////
    //// Logout ////
    ////////////////
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = null;
      toast.success(`Logged out`);
    },
    [logout.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    //////////////
    //// Auth ////
    //////////////
    [auth.pending]: (state) => {
      state.isLoading = true;
    },
    [auth.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [auth.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
