import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time: 0,
  isRunning: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state, action) => {
      state.time = action.payload * 60; 
      state.isRunning = true;

      state.intervalId = setInterval(() => {
        if (state.time > 0) {
          state.time -= 1;
        } else {
          clearInterval(state.intervalId);
          state.isRunning = false;
        }
      }, 1000);
    },
    pauseTimer: (state) => {
      state.isRunning = false;

      clearInterval(state.intervalId);
    },
    resumeTimer: (state) => {
      state.isRunning = true;

      state.intervalId = setInterval(() => {
        if (state.time > 0) {
          state.time -= 1;
        } else {
          clearInterval(state.intervalId);
          state.isRunning = false;
        }
      }, 1000);
    },
    resetTimer: (state) => {
      state.time = 0;
      state.isRunning = false;

      clearInterval(state.intervalId);
    },
  },
});

export const { startTimer, pauseTimer, resumeTimer, resetTimer } = timerSlice.actions;
export default timerSlice.reducer