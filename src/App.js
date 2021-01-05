import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isHit, createShips, selectShips } from "./features/ship/shipsSlice";
import "./App.css";
import { generateRandShipPoints, inputToPoint } from "./util";

const hasCollision = (shipsArray, newShip) => {
  if (shipsArray.length === 0) return false;
  shipsArray.forEach(({ y, x }) => {
    if (x === newShip.x && y === newShip.y) return true;
  });
  return false;
};

const startgame = (boardSize = { y: 8, x: 8 }) => {
  const destroyer = { size: 2, key: "D" };
  const cruiser = { size: 3, key: "C" };
  const battleship = { size: 4, key: "B" };
  const allShips = [battleship, cruiser, destroyer];

  const shipArray = [];
  const shipPlacement = (allShips) =>
    allShips.forEach((ship) => {
      let shipPoints = generateRandShipPoints(boardSize, ship);
      while (hasCollision(shipArray, shipPoints))
        shipPoints = generateRandShipPoints(boardSize, ship);

      shipArray.push(...shipPoints);
    });

  shipPlacement(allShips);
  return shipArray;
};

const shoot = (target, ships, dispatch) => {
  const { y, x } = target;
  const hit = ships.find((point) => point.y === y && point.x === x);
  let shipIsSunk = false;
  if (hit) {
    const ship = ships
      .filter(({ key }) => key === hit.key)
      .filter(({ y, x, isHit }) => !isHit && !(hit.y === y && hit.x === x));
    shipIsSunk = ship.length === 0;
    dispatch(isHit(hit));
  }
  return { hit, shipIsSunk };
};

function App() {
  const ships = useSelector(selectShips);
  const dispatch = useDispatch();
  const [targetPoint, setTargetPoint] = useState("");

  return (
    <div className="App">
      <button onClick={() => dispatch(createShips(startgame()))}>
        Start New Game
      </button>
      <body className="App-body">
        {ships.length > 0 ? (
          <>
            <input
              placeholder={targetPoint || "input target"}
              value={targetPoint}
              onChange={(e) => setTargetPoint(e.target.value)}
            />
            <button
              onClick={() => shoot(inputToPoint(targetPoint), ships, dispatch)}
            >
              Shoot Target
            </button>
          </>
        ) : (
          <></>
        )}
      </body>
    </div>
  );
}

export default App;
