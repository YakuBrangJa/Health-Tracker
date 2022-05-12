import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateTabs: [
    {
      long: "Day",
      short: "D",
    },
    {
      long: "Week",
      short: "W",
    },
    {
      long: "14 Days",
      short: "14D",
    },
    {
      long: "Month",
      short: "M",
    },
    {
      long: "Year",
      short: "Y",
    },
  ],
  activeTabState: "W",
};

const dateNavSlice = createSlice({
  name: "Date Navigation",
  initialState,
  reducers: {
    setActiveTabState(state, action) {
      state.activeTabState = action.payload;
    },
  },
});

export const dateNavActions = dateNavSlice.actions;

export default dateNavSlice.reducer;
