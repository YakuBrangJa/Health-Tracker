import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import formStateReducer from "./form-state";
import dateNavReducer from "./date-nav";
import activeDataReducer from "./activeData";
import respiratoryReducer from "./respiratory";
import bodyMeasurementsReducer from "./body-measurements";
import heartReducer from "./heart";
import otherDataReducer from "./other-data";
import uiStateReducer from "./ui-state";
import sidebarReducer from "./sidebar-list";
import vitalsReducer from "./vitals";

const store = configureStore({
  reducer: {
    formState: formStateReducer,
    dateNav: dateNavReducer,
    activeData: activeDataReducer,
    bodyMeasurements: bodyMeasurementsReducer,
    heart: heartReducer,
    respiratory: respiratoryReducer,
    otherData: otherDataReducer,
    uiState: uiStateReducer,
    sideBar: sidebarReducer,
    vitals: vitalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
