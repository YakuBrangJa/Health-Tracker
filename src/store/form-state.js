import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarState: null,
  unitState: {},
  dataSubmitted: false,
};

const formStateSlice = createSlice({
  name: "form state",
  initialState,
  reducers: {
    setSidebarState(state, action) {
      state.sidebarState = action.payload;
    },
    setUnitState(state, action) {
      state.unitState = action.payload;
    },
    setDataSubmitted(state, action) {
      state.dataSubmitted = action.payload;
    },
  },
});

export const formStateActions = formStateSlice.actions;

export default formStateSlice.reducer;
