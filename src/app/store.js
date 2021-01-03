import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import shipsReducer from "../features/ship/shipsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    ships: shipsReducer,
  },
});
