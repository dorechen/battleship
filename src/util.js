export const generateRandShipPoints = (boardSize, { size, key }) => {
  const startPoint = [
    Math.floor(1 + Math.random() * (boardSize.y - size)),
    Math.floor(1 + Math.random() * (boardSize.x - size)),
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

export const inputToPoint = (target) => {
  const array = target.split("");
  // TODO: include calculating letters to number point
  return { y: parseInt(array[0]), x: parseInt(array[1]) };
};
