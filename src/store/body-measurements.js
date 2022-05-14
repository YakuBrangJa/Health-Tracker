import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bodyMeasurements: {
    height: {
      id: "body1",
      title: "Height",
      type: "body-measurements",
      data: [
        {
          value: 150,
          date: "2022-05-10",
          time: "17:54:00",
        },
      ],
      selectedUnit: "foot",
      unit: {
        foot: {
          selected: true,
          name: "foot",
          symbol: "ft",
          to: (value) => {
            return {
              foot: parseFloat((value / 30.48).toFixed(0)),
              inch: Math.round((value % 30.48) / 2.54),
            };
          },
          from: (value) => value.foot * 30.48 + value.inch * 2.54,
        },
        centimeter: {
          selected: false,
          name: "centimeter",
          symbol: "cm",
          to: (value) => value,
          from: (value) => value,
        },
        meter: {
          selected: false,
          name: "meter",
          symbol: "m",
          to: (value) => parseFloat((value / 100).toFixed(1)),
          from: (value) => value * 100,
        },
      },
    },
    weight: {
      id: "body2",
      title: "Weight",
      type: "body-measurements",
      data: [
        {
          value: 110,
          date: "2022-08-18",
          time: "15:23:00",
        },
      ],
      selectedUnit: "pound",
      unit: {
        pound: {
          name: "pound",
          selected: true,
          symbol: "lbs",
          to: (value) => value,
          from: (value) => value,
        },
        kilogram: {
          name: "kilogram",
          selected: false,
          symbol: "kg",
          to: (value) => parseFloat((value / 2.205).toFixed(1)),
          from: (value) => value * 2.205,
        },
      },
    },
    bodyTemperature: {
      id: "body6",
      title: "Body Temperature",
      type: "body-measurements",
      data: [],
      selectedUnit: "fahrenheit",
      unit: {
        fahrenheit: {
          name: "fahrenheit",
          selected: true,
          symbol: "°F",
          to: (value) => value,
          from: (value) => value,
        },
        celcius: {
          name: "celcius",
          selected: false,
          symbol: "°C",
          to: (value) => parseFloat(((value - 32) * (5 / 9)).toFixed(1)),
          from: (value) => value * (9 / 5) + 32,
        },
      },
    },
    bodyFatPercentage: {
      id: "body3",
      title: "Body Fat Percentage",
      type: "body-measurements",
      data: [],
      selectedUnit: "percentage",
      unit: {
        percentage: {
          name: "percentage",
          selected: true,
          symbol: "%",
          to: (value) => value,
          from: (value) => value,
        },
      },
    },
    bmi: {
      id: "body4",
      title: "Body Mass Index",
      type: "body-measurements",
      data: [],
      selectedUnit: "bmi",
      unit: {
        bmi: {
          name: "body mass Index",
          selected: true,
          symbol: "bmi",
          to: (value) => value,
          from: (value) => value,
        },
      },
    },
    waistCircumference: {
      id: "body5",
      title: "Waist Circumference",
      type: "body-measurements",
      data: [],
      selectedUnit: "inch",
      unit: {
        inch: {
          name: "inch",
          selected: true,
          symbol: "in",
          to: (value) => parseFloat((value / 2.54).toFixed(1)),
          from: (value) => value * 2.54,
        },
        centimeter: {
          name: "centimeter",
          selected: false,
          symbol: "cm",
          to: (value) => value,
          from: (value) => value,
        },
      },
    },

    leanBodyMass: {
      id: "body7",
      title: "Lean Body Mass",
      type: "body-measurements",
      data: [],
      selectedUnit: "pound",
      unit: {
        pound: {
          selected: true,
          name: "pound",
          symbol: "lbs",
          to: (value) => value,
          from: (value) => value,
        },
        kilogram: {
          selected: false,
          name: "kilogram",
          symbol: "kg",
          to: (value) => parseFloat((value / 2.205).toFixed(1)),
          from: (value) => value * 2.205,
        },
      },
    },
  },
  componentState: {
    firstRun: true,
    dataState: "",
    firstClick: false,
  },
};

const bodyMeasurementsSlice = createSlice({
  name: "body measurement",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState } = action.payload;
      const key = Object.keys(state.bodyMeasurements).find(
        (key) =>
          state.bodyMeasurements[key].id === state.componentState.dataState
      );

      let transformedValue;
      if (unitState.state === "kilogram") {
        transformedValue = formData.value * 2.205;
      } else if (unitState.state === "meter") {
        transformedValue = formData.value * 100;
      } else if (unitState.state === "inch") {
        transformedValue = formData.value * 2.54;
      } else if (unitState.state === "celcius") {
        transformedValue = formData.value * (9 / 5) + 32;
      } else if (unitState.state === "foot") {
        transformedValue = formData.foot * 30.48 + formData.inch * 2.54;
      } else {
        transformedValue = parseFloat(formData.value);
      }

      state.bodyMeasurements[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
      });
    },

    changeUnit(state, action) {
      const unitData = action.payload;
      const dataKey = Object.keys(state.bodyMeasurements).find(
        (key) =>
          state.bodyMeasurements[key].id === state.componentState.dataState
      );

      const unit = state.bodyMeasurements[dataKey].unit;

      for (let key in unit) {
        if (unit[key].name === unitData.unit) {
          unit[key].selected = true;
        } else {
          unit[key].selected = false;
        }
      }
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        if (!data[key].data) {
          data[key].data = [];
        }
      }

      state.bodyMeasurements = data;
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

export const bodyMeasurementsActions = bodyMeasurementsSlice.actions;

export default bodyMeasurementsSlice.reducer;
