import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchMonthlyAttendance,
  fetchSingleUserMonthlyAttendance,
  fetchTodayAttendance,
} from '../../api/attendance';
import { set } from '../../utils';

const initialState = {
  todayAttendance: [],
  monthlyAttendance: [],
  singleUserMonthlyAttendance: [],
  monthNumber: new Date().getMonth(),
  monthName: new Date().toLocaleString('default', { month: 'long' }),
  isLoading: false,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    change: (state, action) => {
      set(state, payload.name.split('.'), payload.value);
    },
  },
  extraReducers: {
    ///////////////
    //// TODAY ////
    ///////////////
    [fetchTodayAttendance.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTodayAttendance.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todayAttendance = action.payload.data;
    },
    [fetchTodayAttendance.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    /////////////////
    //// MONTYLY ////
    /////////////////
    [fetchMonthlyAttendance.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMonthlyAttendance.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.monthlyAttendance = action.payload.data;
    },
    [fetchMonthlyAttendance.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    /////////////////////////////
    //// SINGLE USER MONTYLY ////
    /////////////////////////////
    [fetchSingleUserMonthlyAttendance.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSingleUserMonthlyAttendance.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singleUserMonthlyAttendance = action.payload.data;
    },
    [fetchSingleUserMonthlyAttendance.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
  },
});

export default attendanceSlice.reducer;
