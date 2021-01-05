import { createSlice } from "@reduxjs/toolkit";

export const shipsSlice = createSlice({
  name: "ships",
  initialState: {
    ships: [],
    shipsLeft: 0,
  },
  reducers: {
    isHit: (state, action) => {
      const { payload } = action;
      const shipToUpdate = state.ships.find(
        ({ y, x }) => y === payload.y && x === payload.x
      );
      shipToUpdate.isHit = true;
    },
    createShips: (state, action) => {
      // TODO: update shipsLeft
      state.ships = action.payload;
    },
  },
});

export const { isHit, createShips } = shipsSlice.actions;

export const selectShips = (state) => state.ships.ships;

export default shipsSlice.reducer;
