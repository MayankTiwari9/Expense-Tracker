import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import expenseReducer from "./expenses";
import themeReucer from "./theme";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme: themeReucer },
});

export default store;
