import { configureStore } from "@reduxjs/toolkit";

import formStateReducer from "./form-state";
import dateNavReducer from "./date-nav";
import bodyMeasurementsReducer from "./body-measurements";
import heartReducer from "./heart";

const store = configureStore({
  reducer: {
    formState: formStateReducer,
    dateNav: dateNavReducer,
    bodyMeasurements: bodyMeasurementsReducer,
    heart: heartReducer,
  },
});

export default store;
