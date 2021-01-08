import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isHit,
  isMiss,
  createGame,
  selectShips,
  selectShipsLeft,
  selectBoard,
} from "./features/ship/shipsSlice";
import "./App.css";
import { generateRandShipPoints, hasCollision, inputToPoint } from "./util";

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

const generateGameMessage = (lastMove, shipsLeft) => {
  const { target, hit, shipIsSunk } = lastMove;
  const shipName = [
    { key: "D", name: "destroyer" },
    { key: "C", name: "cruiser" },
    { key: "B", name: "battleship" },
  ];

  return (
    <>
      <div>
        <b>{`Ships left: `}</b>
        {shipsLeft}
      </div>
      <div>
        <b>{`Last move: `}</b>
        {lastMove ? `${target.target}` : ""}
      </div>
      <div>
        {lastMove
          ? `${hit ? "Hit!" : "Miss."}${
              shipIsSunk
                ? ` You have sunk a ${
                    shipName.find((s) => s.key === hit.key).name
                  }!`
                : ""
            }`
          : ""}
      </div>
      {!shipsLeft && (
        <div>You've won! Click "Start New Game" to play again.</div>
      )}
    </>
  );
};

const renderBoard = (board) => {
  const column = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  return (
    <table>
      <thead>
        <tr>
          {["-", 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <th>{item}</th>
          ))}
        </tr>
      </thead>{" "}
      <tbody>
        {board.map((item, index) => (
          <tr>
            <td>{column[index]}</td>
            {item.map((i) => (
              <td>{i}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  const ships = useSelector(selectShips);
  const shipsLeft = useSelector(selectShipsLeft);
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();
  const [targetPoint, setTargetPoint] = useState("");
  const [lastMove, setLastMove] = useState("");

  return (
    <div className="App">
      <button
        onClick={() => {
          dispatch(createGame(startgame()));
          setLastMove("");
        }}
      >
        Start New Game
      </button>
      <div className="game-body">
        {ships.length > 0 ? (
          <>
            {!!shipsLeft && (
              <>
                <input
                  placeholder={targetPoint || "input target"}
                  value={targetPoint}
                  onClick={(e) => e.target.select()}
                  onChange={(e) => setTargetPoint(e.target.value)}
                />
                <button
                  onClick={() =>
                    setLastMove(
                      shoot(inputToPoint(targetPoint), ships, dispatch)
                    )
                  }
                >
                  Shoot Target
                </button>
              </>
            )}
            <div>{generateGameMessage(lastMove, shipsLeft)}</div>
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
