// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';
import searchReducer from './features/search/searchSlice';
import filterReducer from './features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    search: searchReducer,
    filter: filterReducer,
  },
});
