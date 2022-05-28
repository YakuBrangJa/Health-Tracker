import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  respiratory: {
    bloodOxygen: {
      id: "respi1",
      title: "Blood Oxygen",
      type: "respiratory",
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
              step: "0.01",
              min: 50,
              max: 100,
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Blood Oxygen",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },

    respiratoryRate: {
      id: "respi2",
      title: "Respiratory Rate",
      type: "respiratory",
      data: [],
      favourite: false,
      selectedUnit: "breathsPerMinute",
      unit: {
        breathsPerMinute: {
          name: "breathsPerMinute",
          symbol: "BrPM",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "BrPM",
              name: "value",
              type: "number",
              step: "0.1",
              min: 1,
              max: 60,
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Breaths Per Minute",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
      },
    },

    forceVitalCapicity: {
      id: "respi3",
      title: "Force Vital Capicity",
      type: "respiratory",
      data: [],
      favourite: false,
      selectedUnit: "liter",
      unit: {
        liter: {
          name: "liter",
          symbol: "L",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "L",
              name: "value",
              type: "number",
              step: "0.01",
              min: 0,
              max: 8,
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Force Vital Capicity",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },

    peakExpiratoryFlowRate: {
      id: "respi4",
      title: "Peak Expiratory Flow Rate",
      type: "respiratory",
      data: [],
      favourite: false,
      selectedUnit: "literPerMinute",
      unit: {
        literPerMinute: {
          name: "literPerMinute",
          symbol: "L/m",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "L/m",
              name: "value",
              type: "number",
              step: "0.01",
              min: 50,
              max: 1000,
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Peak Expiratory Flow Rate",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },

    forcedExpiratoryVolume: {
      id: "respi5",
      title: "Forced Expiratory Volume",
      type: "respiratory",
      data: [],
      favourite: false,
      selectedUnit: "liter",
      unit: {
        liter: {
          name: "liter",
          symbol: "L",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "L",
              name: "value",
              type: "number",
              step: "0.01",
              min: 0,
              max: 10,
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Forced Expiratory Volume, 1sec",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },

    sixMinuteWalk: {
      id: "respi6",
      title: "Six-Minute Walk",
      type: "respiratory",
      data: [],
      favourite: false,
      selectedUnit: "meter",
      unit: {
        meter: {
          name: "meter",
          symbol: "m",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "m",
              name: "value",
              type: "number",
              step: "0.01",
              min: 0,
              max: 3000,
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Six-Minute Walk",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
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

const respiratorySlice = createSlice({
  name: "respiratory",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState, sidebarState } = action.payload;

      const key = Object.keys(state.respiratory).find(
        (key) =>
          state.respiratory[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      const transformedValue = unitState.from(formData);
      state.respiratory[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
        id: Math.floor(Math.random() * Date.now()),
      });
    },

    removeData(state, action) {
      const { id, sidebarState } = action.payload;
      const dataKey = Object.keys(state.respiratory).find(
        (key) =>
          state.respiratory[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.respiratory[dataKey].data = state.respiratory[dataKey].data.filter(
        (item) => item.id !== id
      );
    },

    changeUnit(state, action) {
      const { unit, sidebarState } = action.payload;

      const dataKey = Object.keys(state.respiratory).find(
        (key) =>
          state.respiratory[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.respiratory[dataKey].selectedUnit = unit;
    },

    toggleFavourite(state, action) {
      const { sidebarState } = action.payload;
      const dataKey = Object.keys(state.respiratory).find(
        (key) =>
          state.respiratory[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.respiratory[dataKey].favourite =
        !state.respiratory[dataKey].favourite;
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        state.respiratory[key].data = !data[key].data ? [] : data[key].data;
        state.respiratory[key].selectedUnit = data[key].selectedUnit;
        state.respiratory[key].favourite = data[key].favourite;
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

export const respiratoryActions = respiratorySlice.actions;

export default respiratorySlice.reducer;
