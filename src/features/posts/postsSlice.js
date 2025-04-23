import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (searchTerm, { rejectWithValue }) => {
    const query = searchTerm ? `search.json?q=${searchTerm}` : `r/popular.json`;
    const url = `https://www.reddit.com/${query}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 429) {
          return rejectWithValue({ message: 'Rate limit exceeded' });
        }
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      const postData = data.data.children.map((child) => child.data);

      // Cache speichern
      localStorage.setItem(`posts-${searchTerm || 'popular'}`, JSON.stringify(postData));

      return postData;

    } catch (err) {
      console.error('Fetch failed:', err);
      return rejectWithValue({ message: err.message });
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload?.message || 'Unknown error';

        // Im Fehlerfall: versuche aus dem Cache zu laden
        const lastSuccessful = localStorage.getItem('posts-popular');
        if (lastSuccessful) {
          state.items = JSON.parse(lastSuccessful);
        }
      });
  },
});

export default postsSlice.reducer;
