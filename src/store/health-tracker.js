import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // BODY MEASUREMENTS
  bodyMeasurements: {
    id: "body-measurements",
    componentState: {
      firstRun: true,
      dataState: "",
      firstClick: false,
    },
    rootData: {
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
            name: "body mass index",
            selected: true,
            symbol: "bmi",
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
  },
  //  HEART
  heart: {
    id: "heart",
    componentState: {
      firstRun: true,
      dataState: "",
      firstClick: false,
    },
    rootData: {
      heartRate: {
        id: "heart1",
        title: "Heart Rate",
        type: "heart",
        data: [],
        unit: {
          beatPerMinute: {
            name: "beat per minute",
            selected: true,
            symbol: "bpm",
          },
        },
      },
      bloodPressure: {
        id: "heart2",
        title: "Blood Pressure",
        type: "heart",
        data: [],
        unit: {
          milimeterMercury: {
            name: "milimeter mercury",
            selected: true,
            symbol: "mmHg",
          },
        },
      },
      heartRateVariability: {
        id: "heart3",
        title: "Heart Rate Variability",
        type: "heart",
        data: [],
        unit: {
          milisecond: {
            name: "milisecond",
            selected: true,
            symbol: "ms",
          },
        },
      },
      cardioFitness: {
        id: "heart4",
        title: "Cardio Fitness",
        type: "heart",
        data: [],
        unit: {
          maxOxygenVolume: {
            name: "max oxygen volume",
            selected: true,
            symbol: `VO2max`,
          },
        },
      },
      peripheralPerfusionIndex: {
        id: "heart5",
        title: "Peripheral Perfusion Index",
        type: "heart",
        data: [],
        unit: {
          percentage: {
            name: "percentage",
            selected: true,
            symbol: "%",
          },
        },
      },
      restingHR: {
        id: "heart6",
        title: "Resting Heart Rate",
        type: "heart",
        data: [],
        unit: {
          beatPerMinute: {
            name: "beat per minute",
            selected: true,
            symbol: "bpm",
          },
        },
      },
      walkingHR: {
        id: "heart7",
        title: "Walking Heart Rate",
        type: "heart",
        data: [],
        unit: {
          beatPerMinute: {
            name: "beat per minute",
            selected: true,
            symbol: "bpm",
          },
        },
      },
    },
  },
};

const healthTrackerSlice = createSlice({
  name: "health tracker",
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
    updateDataState(state, action) {
      state.componentState.dataState = action.payload;
    },
    updateFirstClick(state, action) {
      state.componentState.firstClick = action.payload;
    },
  },
});

export const healthTrackerActions = healthTrackerSlice.actions;

export default healthTrackerSlice.reducer;
