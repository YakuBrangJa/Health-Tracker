import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heart: {
    heartRate: {
      id: "heart1",
      title: "Heart Rate",
      type: "heart",
      data: [],
      favourite: false,
      selectedUnit: "beatsPerMinute",
      unit: {
        beatsPerMinute: {
          name: "beatsPerMinute",
          symbol: "bpm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "bpm",
              name: "value",
              type: "number",
              min: 30,
              max: 350,
              step: "1",
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Heart Rate",
        },
        multiValue: false,
      },
    },

    bloodPressure: {
      id: "heart2",
      title: "Blood Pressure",
      type: "heart",
      data: [],
      favourite: false,
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
          formConfig: [
            {
              symbol: "systolic",
              name: "systolic",
              type: "number",
              min: 40,
              max: 300,
              step: "1",
            },
            {
              symbol: "diastolic",
              name: "diastolic",
              type: "number",
              min: 30,
              max: 200,
              step: "1",
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: [
          {
            label: "Diastolic",
            path: "diastolic",
            backgroundColor: "rgba(48, 145, 209, 0.7)",
          },
          {
            label: "Systolic",
            path: "systolic",
            backgroundColor: "rgba(254, 55, 95, 0.7)",
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
      favourite: false,
      selectedUnit: "milisecond",
      unit: {
        milisecond: {
          name: "milisecond",
          symbol: "ms",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "ms",
              name: "value",
              type: "number",
              min: 5,
              max: 350,
              step: "1",
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Heart Rate",
        },
        multiValue: false,
      },
    },
    cardioFitness: {
      id: "heart4",
      title: "Cardio Fitness",
      type: "heart",
      data: [],
      favourite: false,
      selectedUnit: "maxOxygenVolume",
      unit: {
        maxOxygenVolume: {
          name: "maxOxygenVolume",
          symbol: `VO2max`,
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "VO2max",
              name: "value",
              type: "number",
              min: 1,
              max: 100,
              step: "1",
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Cardio Fitness",
        },
        multiValue: false,
      },
    },
    peripheralPerfusionIndex: {
      id: "heart5",
      title: "Peripheral Perfusion Index",
      type: "heart",
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
              min: 0,
              max: 25,
              step: "0.01",
            },
          ],
        },
      },
      chartConfig: {
        type: "bar",
        config: {
          label: "Peripheral Perfusion Index",
        },
        multiValue: false,
      },
    },
    restingHR: {
      id: "heart6",
      title: "Resting Heart Rate",
      type: "heart",
      data: [],
      favourite: false,
      selectedUnit: "beatsPerMinute",
      unit: {
        beatsPerMinute: {
          name: "beatsPerMinute",
          symbol: "bpm",
          to: (value) => parseFloat(value.toFixed(1)),
          from: (value) => parseFloat(value.value),
          formConfig: [
            {
              symbol: "bpm",
              name: "value",
              type: "number",
              min: 10,
              max: 300,
              step: "1",
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Resting Heart Rate",
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
          formConfig: [
            {
              symbol: "bpm",
              name: "value",
              type: "number",
              min: 30,
              max: 400,
              step: "1",
            },
          ],
        },
      },
      chartConfig: {
        type: "line",
        config: {
          label: "Walking Heart Rate",
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

const heartSlice = createSlice({
  name: "heart",
  initialState,
  reducers: {
    addData(state, action) {
      const { formData, unitState, sidebarState } = action.payload;
      const key = Object.keys(state.heart).find(
        (key) =>
          state.heart[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      const transformedValue = unitState.from(formData);

      state.heart[key].data.push({
        date: formData.date,
        time: formData.time,
        value: transformedValue,
        id: Math.floor(Math.random() * Date.now()),
      });
    },

    removeData(state, action) {
      const { id, sidebarState } = action.payload;
      const dataKey = Object.keys(state.heart).find(
        (key) =>
          state.heart[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.heart[dataKey].data = state.heart[dataKey].data.filter(
        (item) => item.id !== id
      );
    },

    changeUnit(state, action) {
      const { unit, sidebarState } = action.payload;
      const dataKey = Object.keys(state.heart).find(
        (key) =>
          state.heart[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.heart[dataKey].selectedUnit = unit;
    },

    toggleFavourite(state, action) {
      const { sidebarState } = action.payload;
      const dataKey = Object.keys(state.heart).find(
        (key) =>
          state.heart[key].id ===
          (sidebarState === "/vitals"
            ? state.componentState.vitalsDataState
            : state.componentState.dataState)
      );

      state.heart[dataKey].favourite = !state.heart[dataKey].favourite;
    },

    populateData(state, action) {
      const data = action.payload;

      for (let key in data) {
        state.heart[key].data = !data[key].data ? [] : data[key].data;
        state.heart[key].selectedUnit = data[key].selectedUnit;
        state.heart[key].favourite = data[key].favourite;
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

export const heartActions = heartSlice.actions;

export default heartSlice.reducer;
