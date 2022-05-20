import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  cardSelectState: false,
};

const uiStateSlice = createSlice({
  name: "form state",
  initialState,
  reducers: {
    setSideBarOpenState(state, action) {
      state.sidebarOpen = action.payload;
    },
    setCardSelectState(state, action) {
      state.cardSelectState = action.payload;
    },
  },
});

export const uiStateActions = uiStateSlice.actions;

export default uiStateSlice.reducer;
