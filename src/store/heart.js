import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heart: {
    heartRate: {
      id: "heart1",
      title: "Heart Rate",
      type: "heart",
      data: [],
      selectedUnit: "beatsPerMinute",
      unit: {
        beatsPerMinute: {
          name: "beatsPerMinute",
          symbol: "bpm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Heart Rate",
          borderWidth: 2.5,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
      },
    },

    bloodPressure: {
      id: "heart2",
      title: "Blood Pressure",
      type: "heart",
      data: [],
      selectedUnit: "milimeterMercury",
      unit: {
        milimeterMercury: {
          name: "milimeter mercury",
          symbol: "mmHg",
          to: (value, chart) => {
            if (chart)
              return {
                systolic: value.systolic.toFixed(1),
                diastolic: value.diastolic.toFixed(1),
              };
            return `${value.systolic}/${value.diastolic}`;
          },
          from: (value) => {
            return {
              systolic: parseFloat(value.systolic),
              diastolic: parseFloat(value.diastolic),
            };
          },
        },
      },
      chartConfig: {
        type: "bar",
        config: [
          {
            label: "Diastolic",
            path: "diastolic",
            borderWidth: 0,
            backgroundColor: "rgba(53, 162, 235, 0.7)",
          },
          {
            label: "Systolic",
            path: "systolic",
            borderWidth: 0,
            backgroundColor: "rgba(255, 99, 132, 0.8)",
          },
        ],
        multiValue: true,
      },
    },
    heartRateVariability: {
      id: "heart3",
      title: "Heart Rate Variability",
      type: "heart",
      data: [],
      selectedUnit: "milisecond",
      unit: {
        milisecond: {
          name: "milisecond",
          symbol: "ms",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Heart Rate",
          borderWidth: 2.5,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
      },
    },
    cardioFitness: {
      id: "heart4",
      title: "Cardio Fitness",
      type: "heart",
      data: [],
      selectedUnit: "maxOxygenVolume",
      unit: {
        maxOxygenVolume: {
          name: "maxOxygenVolume",
          symbol: `VO2max`,
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Cardio Fitness",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },
    peripheralPerfusionIndex: {
      id: "heart5",
      title: "Peripheral Perfusion Index",
      type: "heart",
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
          label: "Peripheral Perfusion Index",
          borderWidth: 0,
          backgroundColor: "rgba(53, 162, 235, 0.7)",
        },
        multiValue: false,
      },
    },
    restingHR: {
      id: "heart6",
      title: "Resting Heart Rate",
      type: "heart",
      data: [],
      selectedUnit: "beatsPerMinute",
      unit: {
        beatsPerMinute: {
          name: "beatsPerMinute",
          symbol: "bpm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Resting Heart Rate",
          borderWidth: 2.5,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
        multiValue: false,
      },
    },

    walkingHR: {
      id: "heart7",
      title: "Walking Heart Rate",
      type: "heart",
      data: [],
      selectedUnit: "beatsPerMinute",
      unit: {
        beatsPerMinute: {
          name: "beatsPerMinute",
          symbol: "bpm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Walking Heart Rate",
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

const heartSlice = createSlice({
  name: "heart",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState } = action.payload;
      const key = Object.keys(state.heart).find(
        (key) => state.heart[key].id === state.componentState.dataState
      );

      const transformedValue = unitState.from(formData);

      state.heart[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
      });
    },

    changeUnit(state, action) {
      const { unit } = action.payload;
      const dataKey = Object.keys(state.heart).find(
        (key) => state.heart[key].id === state.componentState.dataState
      );

      state.heart[dataKey].selectedUnit = unit;
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        state.heart[key].data = !data[key].data ? [] : data[key].data;
        state.heart[key].selectedUnit = data[key].selectedUnit;
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

export const heartActions = heartSlice.actions;

export default heartSlice.reducer;
