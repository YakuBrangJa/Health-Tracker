import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    data: [
      {
        date: "date",
        time: "time",
        value: {
          systolic: 123,
          diastolic: 80,
        },
      },
    ],
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
    data: [
      {
        date: "date",
        time: "time",
        value: 12,
      },
    ],
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
};

const heartSlice = createSlice({
  name: "heart",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, dataState, unitState } = action.payload;
      const key = Object.keys(state).find((key) => state[key].id === dataState);

      let transformedValue;

      if (unitState.state === "milimeter mercury") {
        transformedValue = {
          systolic: formData.systolic,
          diastolic: formData.diastolic,
        };
      } else {
        transformedValue = parseFloat(formData.value);
      }

      state[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
      });
    },
    changeUnit(state, action) {
      const unitData = action.payload;
      const dataKey = Object.keys(state).find(
        (key) => state[key].id === unitData.dataState
      );

      const unit = state[dataKey].unit;

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
