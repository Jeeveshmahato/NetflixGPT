import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowPlayTrailers: null,
    nowPopularMovies: null,
    nowTopRatedMovies: null,
    nowUpcomingMovies: null,
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
  },
});

export const {
  addNowMoviePlay,
  addNowTrailer,
  addNowPopularMovies,
  addNowTopRatedMovies,
  addNowUpcomingMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
