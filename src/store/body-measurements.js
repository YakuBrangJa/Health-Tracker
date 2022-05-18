import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bodyMeasurements: {
    height: {
      id: "body1",
      title: "Height",
      type: "body-measurements",
      data: [],
      selectedUnit: "foot",
      unit: {
        foot: {
          name: "foot",
          symbol: "ft",
          to: (value, chart) => {
            if (chart) return parseFloat((value / 30.48).toFixed(1));
            return `${Math.floor(value / 30.48)}'${Math.round(
              (value % 30.48) / 2.54
            )}"`;
          },
          from: (value) => value.foot * 30.48 + value.inch * 2.54,
        },
        centimeter: {
          name: "centimeter",
          symbol: "cm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
        meter: {
          name: "meter",
          symbol: "m",
          to: (value) => parseFloat((value / 100).toFixed(1)),
          from: (value) => value.value * 100,
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Height",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },
    weight: {
      id: "body2",
      title: "Weight",
      type: "body-measurements",
      data: [],
      selectedUnit: "pound",
      unit: {
        pound: {
          name: "pound",
          symbol: "lbs",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
        kilogram: {
          name: "kilogram",
          symbol: "kg",
          to: (value) => parseFloat((value / 2.205).toFixed(1)),
          from: (value) => value.value * 2.205,
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Weight",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
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
          symbol: "°F",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
        celcius: {
          name: "celcius",
          symbol: "°C",
          to: (value) => parseFloat(((value - 32) * (5 / 9)).toFixed(1)),
          from: (value) => value.value * (9 / 5) + 32,
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Body Temperature",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
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
          symbol: "%",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Body Fat Percentage",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
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
          name: "bmi",
          symbol: "bmi",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "BMI",
          borderWidth: 1,
          borderColor: "rgba(53, 162, 235, 0.8)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        multiValue: false,
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
          symbol: "in",
          to: (value) => parseFloat((value / 2.54).toFixed(1)),
          from: (value) => value.value * 2.54,
        },
        centimeter: {
          name: "centimeter",
          symbol: "cm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "line",

        config: {
          label: "Body Temperature",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
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
          name: "pound",
          symbol: "lbs",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
        kilogram: {
          name: "kilogram",
          symbol: "kg",
          to: (value) => parseFloat((value / 2.205).toFixed(1)),
          from: (value) => value.value * 2.205,
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Lean Body Mass",
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

      const transformedValue = unitState.from(formData);
      state.bodyMeasurements[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
      });
    },

    changeUnit(state, action) {
      const { unit } = action.payload;
      const dataKey = Object.keys(state.bodyMeasurements).find(
        (key) =>
          state.bodyMeasurements[key].id === state.componentState.dataState
      );

      state.bodyMeasurements[dataKey].selectedUnit = unit;
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        state.bodyMeasurements[key].data = !data[key].data
          ? []
          : data[key].data;
        state.bodyMeasurements[key].selectedUnit = data[key].selectedUnit;
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

export const bodyMeasurementsActions = bodyMeasurementsSlice.actions;

export default bodyMeasurementsSlice.reducer;
