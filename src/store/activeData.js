import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDate: {
    day: null,
    month: null,
    year: null,
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
  },
});

export const activeDataActions = activeDataSlice.actions;

export default activeDataSlice.reducer;
