import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowWidth: 0,
  isLoading: false,
  sidebarOpen: false,
  firstRun: true,
  cardSelectState: false,
  showTableState: false,
  fromHomeCard: false,
  backToHome: false,
  darkTheme: null,
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
    setShowTableState(state, action) {
      state.showTableState = action.payload;
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
    setDarkTheme(state, action) {
      state.darkTheme = action.payload;
    },
  },
});

export const uiStateActions = uiStateSlice.actions;

export default uiStateSlice.reducer;
