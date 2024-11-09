import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowPlayTailers: null,
    nowPopularMovies: null,
    nowTopRatedMovies: null,
    nowUpcommingMovies: null,
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
    addNowUpcommingMovies: (state, action) => {
      state.nowUpcommingMovies = action.payload;
    },
    addNowTailer: (state, action) => {
      state.nowPlayTailers = action.payload;
    },
  },
});
export const { addNowMoviePlay  , addNowTailer , addNowPopularMovies , addNowTopRatedMovies , addNowUpcommingMovies} = movieSlice.actions;
export default movieSlice.reducer;
