import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, auth } from '../../api/user';
import { toast } from 'react-toastify';

const initialState = {
  data: null,
  newUser: null,
  isNewUserModalOpen: true,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    closeNewUserModal: (state, action) => {
      state.isNewUserModalOpen = false;
    },
    openNewUserModal: (state, action) => {
      state.isNewUserModalOpen = true;
    },
  },
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
      state.newUser = action.payload.data;
      state.isNewUserModalOpen = true;
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

export const { openNewUserModal, closeNewUserModal } = userSlice.actions;
export default userSlice.reducer;
