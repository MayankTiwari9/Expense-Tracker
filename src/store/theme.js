import { createSlice } from "@reduxjs/toolkit"

const initialThemeState = {
    darkTheme: false,
}

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
        toggleTheme(state){
            state.darkTheme = !state.darkTheme;
        }
    }
})

export const themeAction = themeSlice.actions;
export default themeSlice.reducer;
