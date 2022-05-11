import { configureStore } from "@reduxjs/toolkit";

import formStateReducer from "./form-state";
import dateNavReducer from "./date-nav";
import activeDataReducer from "./activeData";

import bodyMeasurementsReducer from "./body-measurements";
import heartReducer from "./heart";

const store = configureStore({
  reducer: {
    formState: formStateReducer,
    dateNav: dateNavReducer,
    activeData: activeDataReducer,
    bodyMeasurements: bodyMeasurementsReducer,
    heart: heartReducer,
  },
});

export default store;
