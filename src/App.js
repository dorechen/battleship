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
import { generateRandShipPoints, hasCollision } from "./util";

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

function App() {
  const ships = useSelector(selectShips);
  const shipsLeft = useSelector(selectShipsLeft);
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();
  const [lastMove, setLastMove] = useState("");
  const yLookup = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

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
            <div>{generateGameMessage(lastMove, shipsLeft)}</div>

            <table>
              <thead>
                <tr key="dl">
                  {["-", 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <th key={`x-${index}`}>{item}</th>
                  ))}
                </tr>
              </thead>{" "}
              <tbody>
                {board.map((item, yIndex) => (
                  <tr key={`y-${yIndex}`}>
                    <td key={`row-${yLookup[yIndex]}`}>{yLookup[yIndex]}</td>
                    {item.map((i, xIndex) => (
                      <td
                        key={`${yIndex},${xIndex}`}
                        onClick={() => {
                          if (shipsLeft)
                            setLastMove(
                              shoot(
                                {
                                  target: `${yLookup[yIndex]}${xIndex + 1}`,
                                  y: yIndex,
                                  x: xIndex,
                                },
                                ships,
                                dispatch
                              )
                            );
                        }}
                      >
                        {i}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
