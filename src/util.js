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
  const yLookup = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const array = target.split("");
  const y = parseInt(yLookup.indexOf(array[0].toUpperCase()));
  const x = parseInt(array[1]) - 1;
  return { target: target.toUpperCase(), y, x };
};
