import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otherData: {
    bloodGlucose: {
      id: "other1",
      title: "Blood Glucose",
      type: "other-data",
      data: [],
      favourite: false,
      selectedUnit: "milligramsPerDeciliter",
      unit: {
        milligramsPerDeciliter: {
          name: "milligramsPerDeciliter",
          symbol: "mg/dL",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "mg/dL",
              name: "value",
              type: "number",
              min: 30,
              max: 1000,
              step: "1",
            },
          ],
        },
        millimolesPerLitre: {
          name: "millimolesPerLitre",
          symbol: "mmol/L",
          to: (value) => parseFloat((value / 18).toFixed(1)),
          from: (value) => value.value * 18,
          formConfig: [
            {
              symbol: "mmol/L",
              name: "value",
              type: "number",
              min: 2,
              max: 56,
              step: "0.01",
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Blood Glocose",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
      },
    },

    sexualActivity: {
      id: "other2",
      title: "Sexual Activity",
      type: "other-data",
      data: [],
      favourite: false,
      selectedUnit: "times",
      unit: {
        times: {
          name: "times",
          symbol: "times",
          to: (value) => parseFloat(value.toFixed(0)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "times",
              name: "value",
              type: "number",
              min: 1,
              max: 10,
              step: "1",
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Sexual Activity",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },

    bloodAlcoholContent: {
      id: "other3",
      title: "Blood Alchohol Content",
      type: "other-data",
      data: [],
      favourite: false,
      selectedUnit: "percentage",
      unit: {
        percentage: {
          name: "percentage",
          symbol: "%",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "%",
              name: "value",
              type: "number",
              min: 0,
              max: 1,
              step: "0.01",
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Blood Alchohol Content",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },
  },
  componentState: {
    dataState: null,
    vitalsDataState: null,
    firstRun: true,
    firstClick: false,
  },
};

const otherDataSlice = createSlice({
  name: "other data",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState, sidebarState } = action.payload;
      const key = Object.keys(state.otherData).find(
        (key) =>
          state.otherData[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      const transformedValue = unitState.from(formData);
      state.otherData[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
        id: Math.floor(Math.random() * Date.now()),
      });
    },

    changeUnit(state, action) {
      const { unit, sidebarState } = action.payload;
      const dataKey = Object.keys(state.otherData).find(
        (key) =>
          state.otherData[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.otherData[dataKey].selectedUnit = unit;
    },

    toggleFavourite(state, action) {
      const { sidebarState } = action.payload;
      const dataKey = Object.keys(state.otherData).find(
        (key) =>
          state.otherData[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.otherData[dataKey].favourite = !state.otherData[dataKey].favourite;
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        state.otherData[key].data = !data[key].data ? [] : data[key].data;
        state.otherData[key].selectedUnit = data[key].selectedUnit;
        state.otherData[key].favourite = data[key].favourite;
      }
    },

    updateFirstRunState(state, action) {
      state.componentState.firstRun = action.payload;
    },
    updateDataState(state, action) {
      state.componentState.dataState = action.payload;
    },
    updateFirstClick(state, action) {
      state.componentState.firstClick = action.payload;
    },
    updateVitalsDataState(state, action) {
      state.componentState.vitalsDataState = action.payload;
    },
  },
});

export const otherDataActions = otherDataSlice.actions;

export default otherDataSlice.reducer;
