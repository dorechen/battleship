export const generateRandShipPoint = (boardSize, size) => [
  Math.floor(Math.random() * (boardSize.y - (size - 1))),
  Math.floor(Math.random() * (boardSize.x - (size - 1))),
];

export const hasSpaceForShipOnBoard = (
  board,
  shipStartPoint,
  isHorizontal,
  size
) => {
  let count = 0;
  while (count < size) {
    if (isHorizontal) {
      if (board[shipStartPoint[0]][shipStartPoint[1] + count]) return false;
    } else {
      if (board[shipStartPoint[0] + count][shipStartPoint[1]]) return false;
    }
    count++;
  }
  return true;
};

export const placeShip = (
  board,
  shipStartPoint,
  isHorizontal,
  { size, key }
) => {
  let count = 0;
  while (count < size) {
    if (isHorizontal) {
      board[shipStartPoint[0]][shipStartPoint[1] + count] = key;
    } else {
      board[shipStartPoint[0] + count][shipStartPoint[1]] = key;
    }
    count++;
  }
};
