import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowPlayTailers: null,
  },
  reducers: {
    addNowMoviePlay: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addNowTailer: (state, action) => {
      state.nowPlayTailers = action.payload;
    },
  },
});
export const { addNowMoviePlay  , addNowTailer} = movieSlice.actions;
export default movieSlice.reducer;
