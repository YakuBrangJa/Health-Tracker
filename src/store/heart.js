import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heart: {
    heartRate: {
      id: "heart1",
      title: "Heart Rate",
      type: "heart",
      data: [
        {
          data: "date",
          time: "time",
          value: 12,
        },
      ],
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
          symbol: "VO2max",
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
};

const heartSlice = createSlice({
  name: "heart",
  initialState,
  reducers: {
    addData(state, action) {
      const { date, time, value, dataState, unitState } = action.payload;
      const key = Object.keys(state.heart).find(
        (key) => state.heart[key].id === dataState
      );

      let transformedValue = value;

      state.heart[key].data.push({
        date,
        time,
        value: parseFloat(transformedValue),
      });
    },
    changeUnit(state, action) {
      const unitData = action.payload;
      const dataKey = Object.keys(state.heart).find(
        (key) => state.heart[key].id === unitData.dataState
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
  },
});

export const heartActions = heartSlice.actions;

export default heartSlice.reducer;
