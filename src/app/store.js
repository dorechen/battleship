import { configureStore } from "@reduxjs/toolkit";
import shipsReducer from "../features/ship/shipsSlice";

export default configureStore({
  reducer: {
    ships: shipsReducer,
  },
});
