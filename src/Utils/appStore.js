import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import GptReducer from "./GptSlice";
import Languagereducer from "./LanguageSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: GptReducer,
    language: Languagereducer,
  },
});

export default appStore;
