import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({
  name: "GPTSlice",
  initialState: {
    SearchGpt: false,
    GptMovies: null,
    searchMovie: null,
  },
  reducers: {
    addSearch: (state) => {
      state.SearchGpt = !state.SearchGpt;
    },
    addGptMovies: (state, action) => {
      const { searchMovie, GptMovies } = action.payload;
      state.searchMovie = searchMovie;
      state.GptMovies = GptMovies;
    },
  },
});
export const { addSearch, addGptMovies } = GptSlice.actions;
export default GptSlice.reducer;
