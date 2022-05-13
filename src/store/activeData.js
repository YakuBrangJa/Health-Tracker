import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDate: {
    day: null,
    month: null,
    year: null,
    day14: null,
    week: null,
  },
};

const activeDataSlice = createSlice({
  name: "Active Data",
  initialState,
  reducers: {
    setActiveDay(state, action) {
      state.activeDate.day = action.payload;
    },
    setActiveMonth(state, action) {
      state.activeDate.month = action.payload;
    },
    setActiveYear(state, action) {
      state.activeDate.year = action.payload;
    },
    setActiveDay14(state, action) {
      state.activeDate.day14 = action.payload;
    },
    setActiveWeek(state, action) {
      state.activeDate.week = action.payload;
    },
  },
});

export const activeDataActions = activeDataSlice.actions;

export default activeDataSlice.reducer;
