import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
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

const shoot = (target) => {
  const { y, x } = target;
  // TODO: return hit/miss, number of ships left/not yet sunk, updated board
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
