// src/features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Hier wird fetchPosts angepasst, um die Filter zu berücksichtigen
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ searchTerm, subreddit, sort, time }, { rejectWithValue }) => {
    // Standardwerte setzen, falls sie nicht vorhanden sind
    const currentSubreddit = subreddit || 'popular';
    const currentSort = sort || 'hot';
    const currentTime = time || 'hour';

    // Wenn ein searchTerm vorliegt, wird die Reddit-Such-API verwendet, sonst die Subreddit-API
    const query = searchTerm
      ? `search.json?q=${searchTerm}`
      : `r/${currentSubreddit}/${currentSort}.json?t=${currentTime}`;
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
      const postData = data.data.children.map((child) => {
        const post = child.data;

        // Überprüfen, ob Medien vorhanden sind
        const media = post.secure_media?.reddit_video || post.preview?.images[0]?.source;

        return { ...post, media }; // Füge das Medienobjekt hinzu
      });

      // Cache speichern
      localStorage.setItem(`posts-${searchTerm || currentSubreddit}`, JSON.stringify(postData));

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
