import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  componentState: {
    firstRun: true,
    dataState: null,
    firstClick: false,
  },
};

const vitalsSlice = createSlice({
  name: "vitals",
  initialState,
  reducers: {
    updateFirstRunState(state, action) {
      state.componentState.firstRun = action.payload;
    },
    updateDataState(state, action) {
      state.componentState.dataState = action.payload;
    },
    updateFirstClick(state, action) {
      state.componentState.firstClick = action.payload;
    },
  },
});

export const vitalsActions = vitalsSlice.actions;

export default vitalsSlice.reducer;
