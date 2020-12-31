import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import {
  generateRandShipPoint,
  hasSpaceForShipOnBoard,
  placeShip,
} from "./util";

const startgame = (boardSize = { y: 8, x: 8 }) => {
  const destroyer = { size: 2, key: "D" };
  const cruiser = { size: 3, key: "C" };
  const battleship = { size: 4, key: "B" };
  const allShips = [battleship, cruiser, destroyer];

  const board = Array.from(Array(boardSize.y), () => new Array(boardSize.x));

  const placeShipOnBoard = (board, { size, key }) => {
    const isHorizontal = Math.random() < 0.5;

    let shipStartPoint = generateRandShipPoint(boardSize, size);

    while (!hasSpaceForShipOnBoard(board, shipStartPoint, isHorizontal, size))
      shipStartPoint = generateRandShipPoint(boardSize, size);

    placeShip(board, shipStartPoint, isHorizontal, { size, key });
  };

  allShips.forEach((ship) => placeShipOnBoard(board, ship));
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
