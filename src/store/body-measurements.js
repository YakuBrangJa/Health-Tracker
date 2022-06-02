import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bodyMeasurements: {
    height: {
      id: "body1",
      title: "Height",
      type: "body-measurements",
      data: [],
      favourite: false,
      selectedUnit: "foot",
      unit: {
        foot: {
          name: "foot",
          symbol: "ft",
          to: (value, chart) => {
            if (chart) return parseFloat((value / 30.48).toFixed(1));

            return Math.round((value % 30.48) / 2.54) === 0
              ? `${Math.floor(value / 30.48)}'`
              : `${Math.floor(value / 30.48)}'${Math.round(
                  (value % 30.48) / 2.54
                )}"`;
          },
          from: (value) => value.foot * 30.48 + value.inch * 2.54,
          formConfig: [
            {
              symbol: "ft",
              name: "foot",
              type: "number",
              min: 1,
              max: 9,
              step: "1",
            },
            {
              symbol: "in",
              name: "inch",
              type: "select",
              options: Array.from(Array(12).keys()),
            },
          ],
        },
        centimeter: {
          name: "centimeter",
          symbol: "cm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "cm",
              name: "value",
              type: "number",
              step: "0.01",
              min: 30,
              max: 305,
            },
          ],
        },
        meter: {
          name: "meter",
          symbol: "m",
          to: (value) => parseFloat((value / 100).toFixed(1)),
          from: (value) => value.value * 100,
          formConfig: [
            {
              symbol: "m",
              name: "value",
              type: "number",
              step: "0.01",
              min: 0.3,
              max: 3,
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Height",
          borderWidth: 0,
          // backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },
    weight: {
      id: "body2",
      title: "Weight",
      type: "body-measurements",
      data: [],
      favourite: false,
      selectedUnit: "pound",
      unit: {
        pound: {
          name: "pound",
          symbol: "lbs",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "lb",
              name: "value",
              type: "number",
              step: "0.01",
              min: 1,
              max: 1000,
            },
          ],
        },
        kilogram: {
          name: "kilogram",
          symbol: "kg",
          to: (value) => parseFloat((value / 2.205).toFixed(1)),
          from: (value) => value.value * 2.205,
          formConfig: [
            {
              symbol: "cm",
              name: "value",
              type: "number",
              step: "0.01",
              min: 0.5,
              max: 450,
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Weight",
          borderWidth: 0,
          // backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },

    bodyTemperature: {
      id: "body6",
      title: "Body Temperature",
      type: "body-measurements",
      data: [],
      favourite: false,
      selectedUnit: "fahrenheit",
      unit: {
        fahrenheit: {
          name: "fahrenheit",
          symbol: "°F",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "°F",
              name: "value",
              type: "number",
              step: "0.01",
              min: 75,
              max: 115,
            },
          ],
        },
        celcius: {
          name: "celcius",
          symbol: "°C",
          to: (value) => parseFloat(((value - 32) * (5 / 9)).toFixed(1)),
          from: (value) => value.value * (9 / 5) + 32,
          formConfig: [
            {
              symbol: "°C",
              name: "value",
              type: "number",
              step: "0.01",
              min: 24,
              max: 44,
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Body Temperature",
          // borderColor: "rgb(255, 99, 132)",
          // backgroundColor: "rgba(255, 99, 132)",
        },
        multiValue: false,
      },
    },

    bodyFatPercentage: {
      id: "body3",
      title: "Body Fat Percentage",
      type: "body-measurements",
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
              min: 0,
              max: 75,
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Body Fat Percentage",
          borderWidth: 0,
          // backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },

    bmi: {
      id: "body4",
      title: "Body Mass Index",
      type: "body-measurements",
      data: [],
      favourite: false,
      selectedUnit: "bmi",
      unit: {
        bmi: {
          name: "bmi",
          symbol: "bmi",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "bmi",
              name: "value",
              type: "number",
              step: "0.01",
              min: 7,
              max: 70,
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "BMI",
          // borderColor: "rgba(53, 162, 235, 0.8)",
          // backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        multiValue: false,
      },
    },

    waistCircumference: {
      id: "body5",
      title: "Waist Circumference",
      type: "body-measurements",
      data: [],
      favourite: false,
      selectedUnit: "inch",
      unit: {
        inch: {
          name: "inch",
          symbol: "in",
          to: (value) => parseFloat((value / 2.54).toFixed(1)),
          from: (value) => value.value * 2.54,
          formConfig: [
            {
              symbol: "in",
              name: "value",
              type: "number",
              step: "0.01",
              min: 3,
              max: 120,
            },
          ],
        },
        centimeter: {
          name: "centimeter",
          symbol: "cm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "cm",
              name: "value",
              type: "number",
              step: "0.01",
              min: 8,
              max: 305,
            },
          ],
        },
      },
      chartConfig: {
        type: "line",

        config: {
          label: "Body Temperature",
          // borderColor: "rgb(255, 99, 132)",
          // backgroundColor: "rgba(255, 99, 132)",
          // pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
      },
    },

    leanBodyMass: {
      id: "body7",
      title: "Lean Body Mass",
      type: "body-measurements",
      data: [],
      favourite: false,
      selectedUnit: "pound",
      unit: {
        pound: {
          name: "pound",
          symbol: "lbs",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "lbs",
              name: "value",
              type: "number",
              step: "0.01",
              min: 30,
              max: 300,
            },
          ],
        },
        kilogram: {
          name: "kilogram",
          symbol: "kg",
          to: (value) => parseFloat((value / 2.205).toFixed(1)),
          from: (value) => value.value * 2.205,
          formConfig: [
            {
              symbol: "kg",
              name: "value",
              type: "number",
              step: "0.01",
              min: 13,
              max: 135,
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Lean Body Mass",
          // backgroundColor: "rgba(53, 162, 235, 0.7)",
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

const bodyMeasurementsSlice = createSlice({
  name: "body measurement",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState, sidebarState } = action.payload;
      const key = Object.keys(state.bodyMeasurements).find(
        (key) =>
          state.bodyMeasurements[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      const transformedValue = unitState.from(formData);
      state.bodyMeasurements[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
        id: Math.floor(Math.random() * Date.now()),
      });
    },

    removeData(state, action) {
      const { id, sidebarState } = action.payload;
      const dataKey = Object.keys(state.bodyMeasurements).find(
        (key) =>
          state.bodyMeasurements[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.bodyMeasurements[dataKey].data = state.bodyMeasurements[
        dataKey
      ].data.filter((item) => item.id !== id);
    },

    changeUnit(state, action) {
      const { unit, sidebarState } = action.payload;
      const dataKey = Object.keys(state.bodyMeasurements).find(
        (key) =>
          state.bodyMeasurements[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.bodyMeasurements[dataKey].selectedUnit = unit;
    },

    toggleFavourite(state, action) {
      const { sidebarState } = action.payload;
      const dataKey = Object.keys(state.bodyMeasurements).find(
        (key) =>
          state.bodyMeasurements[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.bodyMeasurements[dataKey].favourite =
        !state.bodyMeasurements[dataKey].favourite;
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        state.bodyMeasurements[key].data = !data[key].data
          ? []
          : data[key].data;
        state.bodyMeasurements[key].selectedUnit = data[key].selectedUnit;
        state.bodyMeasurements[key].favourite = data[key].favourite;
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

export const bodyMeasurementsActions = bodyMeasurementsSlice.actions;

export default bodyMeasurementsSlice.reducer;
