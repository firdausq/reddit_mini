// src/features/filter/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    subreddit: 'popular',
    sort: 'hot',
    time: 'day', // nur relevant für top & controversial
  },
  reducers: {
    setSubreddit(state, action) {
      state.subreddit = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
  },
});

export const { setSubreddit, setSort, setTime } = filterSlice.actions;
export default filterSlice.reducer;
