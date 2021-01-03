import { createSlice } from "@reduxjs/toolkit";

export const shipsSlice = createSlice({
  name: "ships",
  initialState: {
    ships: [],
  },
  reducers: {
    isHit: (state, action) => {
      state.ships.find((s) => s.key === action.payload.key).isHit = true;
    },
    createShips: (state, action) => {
      state.ships = action.payload;
    },
  },
});

export const { isHit, createShips } = shipsSlice.actions;

export const selectShips = (state) => state.ships.ships;

export default shipsSlice.reducer;
