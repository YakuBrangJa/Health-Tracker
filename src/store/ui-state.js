import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  cardSelectState: false,
  isLoading: false,
  firstRun: true,
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
    updateLoadingDataState(state, action) {
      state.isLoading = action.payload;
    },
    updateFirstRunState(state, action) {
      state.firstRun = action.payload;
    },
  },
});

export const uiStateActions = uiStateSlice.actions;

export default uiStateSlice.reducer;
