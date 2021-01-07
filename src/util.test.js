import { hasCollision } from "./util";

test("a collision", () => {
  expect(
    hasCollision(
      [{ y: 1, x: 1, key: "B", isHit: false }],
      [{ y: 1, x: 1, key: "C", isHit: false }]
    )
  ).toBe(true);
});

test("no collision", () => {
  expect(
    hasCollision(
      [{ y: 1, x: 1, key: "B", isHit: false }],
      [{ y: 1, x: 2, key: "C", isHit: false }]
    )
  ).toBe(false);
  expect(hasCollision([], [{ y: 1, x: 2, key: "C", isHit: false }])).toBe(
    false
  );
});
