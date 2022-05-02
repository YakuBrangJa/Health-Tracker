import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataState: "",
  sidebarState: "",
  unitState: {},
};

const formStateSlice = createSlice({
  name: "form state",
  initialState,
  reducers: {
    setDataState(state, action) {
      state.dataState = action.payload;
    },
    setSidebarState(state, action) {
      state.sidebarState = action.payload;
    },
    setUnitState(state, action) {
      state.unitState = action.payload;
    },
  },
});

export const formStateActions = formStateSlice.actions;

export default formStateSlice.reducer;
