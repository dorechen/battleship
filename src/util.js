export const generateRandShipPoints = (boardSize, { size, key }) => {
  const startPoint = [
    Math.floor(Math.random() * (boardSize.y - (size - 1))),
    Math.floor(Math.random() * (boardSize.x - (size - 1))),
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
