import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowWidth: 0,
  sidebarOpen: false,
  cardSelectState: false,
  isLoading: false,
  firstRun: true,
  fromHomeCard: false,
  backToHome: false,
};

const uiStateSlice = createSlice({
  name: "form state",
  initialState,
  reducers: {
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
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
    updateFromHomeCardState(state, action) {
      state.fromHomeCard = action.payload;
    },
    updateBackToHomeState(state, action) {
      state.backToHome = action.payload;
    },
  },
});

export const uiStateActions = uiStateSlice.actions;

export default uiStateSlice.reducer;
