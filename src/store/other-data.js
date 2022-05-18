import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otherData: {
    bloodGlucose: {
      id: "other1",
      title: "Blood Glucose",
      type: "otherData",
      data: [],
      selectedUnit: "milligramsPerDeciliter",
      unit: {
        milligramsPerDeciliter: {
          name: "milligramsPerDeciliter",
          symbol: "mg/dL",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
        millimolesPerLitre: {
          name: "millimolesPerLitre",
          symbol: "mmol/L",
          to: (value) => parseFloat((value / 18).toFixed(1)),
          from: (value) => value.value * 18,
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Blood Glocose",
          borderWidth: 2.5,
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
      type: "otherData",
      data: [],
      selectedUnit: "times",
      unit: {
        times: {
          name: "times",
          symbol: "times",
          to: (value) => parseFloat(value.toFixed(0)),
          from: (value) => parseFloat(value.value),
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
      type: "otherData",
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
          label: "Blood Alchohol Content",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },
  },
  componentState: {
    firstRun: true,
    dataState: "",
    firstClick: false,
  },
};

const otherDataSlice = createSlice({
  name: "other data",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState } = action.payload;
      const key = Object.keys(state.otherData).find(
        (key) => state.otherData[key].id === state.componentState.dataState
      );

      const transformedValue = unitState.from(formData);
      state.otherData[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
      });
    },

    changeUnit(state, action) {
      const { unit } = action.payload;
      const dataKey = Object.keys(state.otherData).find(
        (key) => state.otherData[key].id === state.componentState.dataState
      );

      state.otherData[dataKey].selectedUnit = unit;
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        state.otherData[key].data = !data[key].data ? [] : data[key].data;
        state.otherData[key].selectedUnit = data[key].selectedUnit;
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

export const otherDataActions = otherDataSlice.actions;

export default otherDataSlice.reducer;
