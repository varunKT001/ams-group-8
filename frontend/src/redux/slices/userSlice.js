import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  register,
  auth,
  fetchAllUsers,
  deleteUser,
  fetchSingleUser,
  updateUser,
} from '../../api/user';
import { toast } from 'react-toastify';

const initialState = {
  data: null,
  newUser: null,
  allUsers: [],
  editing: false,
  editingUser: {},
  isNewUserModalOpen: false,
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
    ///////////////////
    //// All Users ////
    ///////////////////
    [fetchAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload.data;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    /////////////////////
    //// Delete User ////
    /////////////////////
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success(action.payload.message);
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    ///////////////////
    //// Edit User ////
    ///////////////////
    [fetchSingleUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSingleUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.editing = true;
      state.editingUser = action.payload.data;
    },
    [fetchSingleUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    /////////////////////
    //// Update User ////
    /////////////////////
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.editing = false;
      state.editingUser = {};
      toast.success('Profile updated successfully');
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
  },
});

export const { openNewUserModal, closeNewUserModal } = userSlice.actions;
export default userSlice.reducer;
