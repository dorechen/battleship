import { createSlice } from "@reduxjs/toolkit";

export const shipsSlice = createSlice({
  name: "ships",
  initialState: {
    board: null,
    ships: [],
    shipsLeft: 0,
  },
  reducers: {
    isHit: (state, action) => {
      const { y, x } = action.payload;
      const shipToUpdate = state.ships.find(
        (ship) => y === ship.y && x === ship.x
      );
      shipToUpdate.isHit = true;
      state.board[y][x] = "x";
      state.shipsLeft = [
        ...new Set(state.ships.filter((s) => !s.isHit).map((s) => s.key)),
      ].length;
    },
    isMiss: (state, action) => {
      const { y, x } = action.payload;
      state.board[y][x] = "o";
    },
    createGame: (state, action) => {
      // TODO: be able to change board size
      state.board = Array.from(Array(8), () => new Array(8).fill(" "));
      state.ships = action.payload;
      state.shipsLeft = [...new Set(action.payload.map((s) => s.key))].length;
    },
  },
});

export const { isHit, isMiss, createGame } = shipsSlice.actions;

export const selectShips = (state) => state.ships.ships;
export const selectShipsLeft = (state) => state.ships.shipsLeft;
export const selectBoard = (state) => state.ships.board;

export default shipsSlice.reducer;
