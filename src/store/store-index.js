import { configureStore } from "@reduxjs/toolkit";

import bodyMeasurementsReducer from "./body-measurements";
import heartReducer from "./heart";
import formStateReducer from "./form-state";

const store = configureStore({
  reducer: {
    bodyMeasurements: bodyMeasurementsReducer,
    heart: heartReducer,
    formState: formStateReducer,
  },
});

export default store;
