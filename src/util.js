export const generateRandShipPoints = (boardSize, { size, key }) => {
  const startPoint = [
    Math.floor(Math.random() * (boardSize.y - size)),
    Math.floor(Math.random() * (boardSize.x - size)),
  ];
  const isHorizontal = Math.random() < 0.5;
  const placement = [];
  for (let i = 0; i < size; i++) {
    if (isHorizontal) {
      placement.push({
        y: startPoint[0],
        x: startPoint[1] + i,
        key,
        isHit: false,
      });
    } else {
      placement.push({
        y: startPoint[0] + i,
        x: startPoint[1],
        key,
        isHit: false,
      });
    }
  }
  return placement;
};

export const hasCollision = (shipsArray, newShip) => {
  if (shipsArray.length === 0) return false;
  for (let i = 0; i < shipsArray.length; i++)
    for (let j = 0; j < newShip.length; j++)
      if (shipsArray[i].x === newShip[j].x && shipsArray[i].y === newShip[j].y)
        return true;
  return false;
};
