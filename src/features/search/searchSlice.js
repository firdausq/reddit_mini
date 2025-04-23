// src/features/search/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    term: '',
  },
  reducers: {
    setSearchTerm(state, action) {
      state.term = action.payload;
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
