import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowPlayTrailers: null,
    nowPopularMovies: null,
    nowTopRatedMovies: null,
    nowUpcomingMovies: null,
    pagination: {
      nowPlaying: { page: 1, totalPages: null, loading: false, hasMore: true },
      popular: { page: 1, totalPages: null, loading: false, hasMore: true },
      topRated: { page: 1, totalPages: null, loading: false, hasMore: true },
      upcoming: { page: 1, totalPages: null, loading: false, hasMore: true },
    },
  },
  reducers: {
    addNowMoviePlay: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addNowPopularMovies: (state, action) => {
      state.nowPopularMovies = action.payload;
    },
    addNowTopRatedMovies: (state, action) => {
      state.nowTopRatedMovies = action.payload;
    },
    addNowUpcomingMovies: (state, action) => {
      state.nowUpcomingMovies = action.payload;
    },
    addNowTrailer: (state, action) => {
      state.nowPlayTrailers = action.payload;
    },
    // Append reducers for infinite scroll
    appendNowPlayingMovies: (state, action) => {
      const existingIds = new Set((state.nowPlayingMovies || []).map((m) => m.id));
      const newMovies = action.payload.filter((m) => !existingIds.has(m.id));
      state.nowPlayingMovies = [...(state.nowPlayingMovies || []), ...newMovies];
    },
    appendPopularMovies: (state, action) => {
      const existingIds = new Set((state.nowPopularMovies || []).map((m) => m.id));
      const newMovies = action.payload.filter((m) => !existingIds.has(m.id));
      state.nowPopularMovies = [...(state.nowPopularMovies || []), ...newMovies];
    },
    appendTopRatedMovies: (state, action) => {
      const existingIds = new Set((state.nowTopRatedMovies || []).map((m) => m.id));
      const newMovies = action.payload.filter((m) => !existingIds.has(m.id));
      state.nowTopRatedMovies = [...(state.nowTopRatedMovies || []), ...newMovies];
    },
    appendUpcomingMovies: (state, action) => {
      const existingIds = new Set((state.nowUpcomingMovies || []).map((m) => m.id));
      const newMovies = action.payload.filter((m) => !existingIds.has(m.id));
      state.nowUpcomingMovies = [...(state.nowUpcomingMovies || []), ...newMovies];
    },
    setPagination: (state, action) => {
      const { category, data } = action.payload;
      state.pagination[category] = {
        ...state.pagination[category],
        ...data,
      };
    },
  },
});

export const {
  addNowMoviePlay,
  addNowTrailer,
  addNowPopularMovies,
  addNowTopRatedMovies,
  addNowUpcomingMovies,
  appendNowPlayingMovies,
  appendPopularMovies,
  appendTopRatedMovies,
  appendUpcomingMovies,
  setPagination,
} = movieSlice.actions;
export default movieSlice.reducer;
