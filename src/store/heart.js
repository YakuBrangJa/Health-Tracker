import { createSlice } from "@reduxjs/toolkit";
import FavoriteIcon from "@mui/icons-material/Favorite";

const initialState = {
  heart: {
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
          to: 1,
          from: 1,
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
          to: 1,
          from: 1,
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
          to: 1,
          from: 1,
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
          to: 1,
          from: 1,
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
          to: 1,
          from: 1,
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
          to: 1,
          from: 1,
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
          to: 1,
          from: 1,
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

const heartSlice = createSlice({
  name: "heart",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState } = action.payload;
      const key = Object.keys(state.heart).find(
        (key) => state.heart[key].id === state.componentState.dataState
      );

      let transformedValue;

      if (unitState.state === "milimeter mercury") {
        transformedValue = {
          systolic: parseFloat(formData.systolic),
          diastolic: parseFloat(formData.diastolic),
        };
      } else {
        transformedValue = parseFloat(formData.value);
      }

      state.heart[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
      });
    },

    changeUnit(state, action) {
      const unitData = action.payload;
      const dataKey = Object.keys(state.heart).find(
        (key) => state.heart[key].id === state.componentState.dataState
      );

      const unit = state.heart[dataKey].unit;

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

      state.heart = data;
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

export const heartActions = heartSlice.actions;

export default heartSlice.reducer;
