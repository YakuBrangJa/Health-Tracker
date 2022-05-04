import { configureStore } from "@reduxjs/toolkit";

import bodyMeasurementsReducer from "./body-measurements";
import heartReducer from "./heart";
// import healthTrackerReducer from "./health-tracker";
import formStateReducer from "./form-state";

const store = configureStore({
  reducer: {
    // healthTracker: healthTrackerReducer,
    bodyMeasurements: bodyMeasurementsReducer,
    heart: heartReducer,
    formState: formStateReducer,
  },
});

export default store;
