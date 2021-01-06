import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isHit,
  isMiss,
  createGame,
  selectShips,
  selectBoard,
} from "./features/ship/shipsSlice";
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
  } else dispatch(isMiss(target));
  return { target, hit, shipIsSunk };
};

const generateGameMessage = (lastMove) => {
  const { target, hit, shipIsSunk } = lastMove;
  let message = `You target ${target.target}. `;
  if (hit) message = message + "You hit! ";
  else message = message + "You missed. ";
  if (shipIsSunk) message = message + "A ship is sunk! ";
  //  TODO: "there are # ships left"

  return message;
};

const renderBoard = (a) => {
  const column = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  return (
    <div>
      <table>
        <thead>
          <tr>
            {["-", 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>{" "}
        <tbody>
          {a.map((item, index) => (
            <tr>
              <td>{column[index]}</td>
              {item.map((i) => (
                <td>{i}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  const ships = useSelector(selectShips);
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();
  const [targetPoint, setTargetPoint] = useState("");
  const [lastMove, setLastMove] = useState("");

  return (
    <div className="App">
      <button onClick={() => dispatch(createGame(startgame()))}>
        Start New Game
      </button>
      <div className="game-body">
        {ships.length > 0 ? (
          <>
            <input
              placeholder={targetPoint || "input target"}
              value={targetPoint}
              onChange={(e) => setTargetPoint(e.target.value)}
            />
            <button
              onClick={() =>
                setLastMove(shoot(inputToPoint(targetPoint), ships, dispatch))
              }
            >
              Shoot Target
            </button>
            <div>{lastMove && generateGameMessage(lastMove)}</div>
          </>
        ) : (
          <></>
        )}
        <div>{board && renderBoard(board)}</div>
      </div>
    </div>
  );
}

export default App;
