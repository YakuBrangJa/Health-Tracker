import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bodyMeasurements: {
    height: {
      id: "body1",
      title: "Height",
      type: "body-measurements",
      data: [],
      unit: {
        foot: {
          selected: true,
          name: "foot",
          symbol: "ft",
        },
        centimeter: {
          selected: false,
          name: "centimeter",
          symbol: "cm",
        },
        meter: {
          selected: false,
          name: "meter",
          symbol: "m",
        },
      },
    },
    weight: {
      id: "body2",
      title: "Weight",
      type: "body-measurements",
      data: [],
      unit: {
        pound: {
          name: "pound",
          selected: true,
          symbol: "lbs",
        },
        kilogram: {
          name: "kilogram",
          selected: false,
          symbol: "kg",
        },
      },
    },
    bodyTemperature: {
      id: "body6",
      title: "Body Temperature",
      type: "body-measurements",
      data: [],
      unit: {
        fahrenheit: {
          name: "fahrenheit",
          selected: true,
          symbol: "°F",
        },
        celcius: {
          name: "celcius",
          selected: false,
          symbol: "°C",
        },
      },
    },
    bodyFatPercentage: {
      id: "body3",
      title: "Body Fat Percentage",
      type: "body-measurements",
      data: [],
      unit: {
        percentage: {
          name: "percentage",
          selected: true,
          symbol: "%",
        },
      },
    },
    bmi: {
      id: "body4",
      title: "Body Mass Index",
      type: "body-measurements",
      data: [],
      unit: {
        bmi: {
          name: "bmi",
          selected: true,
          symbol: "BMI",
        },
      },
    },
    waistCircumference: {
      id: "body5",
      title: "Waist Circumference",
      type: "body-measurements",
      data: [],
      unit: {
        inch: {
          name: "inch",
          selected: true,
          symbol: "in",
        },
        centimeter: {
          name: "centimeter",
          selected: false,
          symbol: "cm",
        },
      },
    },

    leanBodyMass: {
      id: "body7",
      title: "Lean Body Mass",
      type: "body-measurements",
      data: [],
      unit: {
        pound: {
          selected: true,
          name: "pound",
          symbol: "lbs",
        },
        kilogram: {
          selected: false,
          name: "kilogram",
          symbol: "kg",
        },
      },
    },
  },
  componentState: {
    firstRun: true,
  },
};

const bodyMeasurementsSlice = createSlice({
  name: "body measurement",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, dataState, unitState } = action.payload;
      const key = Object.keys(state.bodyMeasurements).find(
        (key) => state.bodyMeasurements[key].id === dataState
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
        (key) => state.bodyMeasurements[key].id === unitData.dataState
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

    updateComponentState(state, action) {
      state.componentState.firstRun = action.payload;
    },
  },
});

export const bodyMeasurementsActions = bodyMeasurementsSlice.actions;

export default bodyMeasurementsSlice.reducer;
