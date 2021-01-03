import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createShips, selectShips } from "./features/ship/shipsSlice";
import logo from "./logo.svg";
import "./App.css";
import { generateRandShipPoints } from "./util";

const hasCollision = (shipsArray, newShip) => {
  if (shipsArray.length === 0) return false;
  shipsArray.forEach((ship) =>
    ship.forEach(({ y, x }) => {
      if (x === newShip.x && y === newShip.y) return true;
    })
  );
  return false;
};

const startgame = (boardSize = { y: 8, x: 8 }) => {
  const destroyer = { size: 2, key: "D" };
  const cruiser = { size: 3, key: "C" };
  const battleship = { size: 4, key: "B" };
  const allShips = [battleship, cruiser, destroyer];

  const shipPlacement = (allShips) => {
    const shipArray = [];

    return allShips.map((ship) => {
      let shipPoints = generateRandShipPoints(boardSize, ship);
      while (hasCollision(shipArray, shipPoints))
        shipPoints = generateRandShipPoints(boardSize, ship);

      return shipPoints;
    });
  };

  return shipPlacement(allShips);
};

const shoot = (target, ships) => {
  const { y, x } = target;
  const hasHit = () => {};
  const hasSunkedShip = () => {};
  // TODO: return hit/miss, number of ships left/not yet sunk, updated board
};

function App() {
  const ships = useSelector(selectShips);
  const dispatch = useDispatch();
  const [targetPoint, setTargetPoint] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => dispatch(createShips(startgame()))}>
          NEW START
        </button>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
