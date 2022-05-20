import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  respiratory: {
    bloodOxygen: {
      id: "respi1",
      title: "Blood Oxygen",
      type: "respiratory",
      data: [],
      selectedUnit: "percentage",
      unit: {
        percentage: {
          name: "percentage",
          symbol: "%",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
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
      selectedUnit: "breathsPerMinute",
      unit: {
        breathsPerMinute: {
          name: "breathsPerMinute",
          symbol: "BrPM",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Breaths Per Minute",
          borderWidth: 2.5,
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
      selectedUnit: "liter",
      unit: {
        liter: {
          name: "liter",
          symbol: "L",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
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
      selectedUnit: "literPerMinute",
      unit: {
        literPerMinute: {
          name: "literPerMinute",
          symbol: "L/m",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
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

    forcedExpiratoryVolme: {
      id: "respi5",
      title: "Forced Expiratory Volume",
      type: "respiratory",
      data: [],
      selectedUnit: "liter",
      unit: {
        liter: {
          name: "liter",
          symbol: "L",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
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
      selectedUnit: "meter",
      unit: {
        meter: {
          name: "meter",
          symbol: "m",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Six-Minute Walk",
          borderWidth: 2.5,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
      },
    },
  },
  componentState: {
    firstRun: true,
    dataState: null,
    firstClick: false,
  },
};

const respiratorySlice = createSlice({
  name: "respiratory",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState } = action.payload;
      const key = Object.keys(state.respiratory).find(
        (key) => state.respiratory[key].id === state.componentState.dataState
      );

      const transformedValue = unitState.from(formData);
      state.respiratory[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
      });
    },

    changeUnit(state, action) {
      const { unit } = action.payload;
      const dataKey = Object.keys(state.respiratory).find(
        (key) => state.respiratory[key].id === state.componentState.dataState
      );

      state.respiratory[dataKey].selectedUnit = unit;
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        state.respiratory[key].data = !data[key].data ? [] : data[key].data;
        state.respiratory[key].selectedUnit = data[key].selectedUnit;
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
  },
});

export const respiratoryActions = respiratorySlice.actions;

export default respiratorySlice.reducer;
