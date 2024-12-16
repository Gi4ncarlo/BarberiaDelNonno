import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer"; // Importa el reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // Usa el slice como reducer en el store
  },
})
