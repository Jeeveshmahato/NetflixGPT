import { createSlice } from "@reduxjs/toolkit";

const Language = createSlice({
    name: "language",
    initialState: {
        language: "English",
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})
export const{changeLanguage} = Language.actions;
export default Language.reducer;