import calcPathDistanceRatio from 'src/coord/calcPathDistanceRatio';

const getLength = (current: { x: number; y: number }, prev: { x: number; y: number }) => {
  const x = current.x - prev.x,
    y = current.y - prev.y;
  return Math.sqrt(x * x + y * y);
};

describe('calcPathDistanceRatio', () => {
  describe('default', () => {
    const path = [
        { x: 0, y: 0 },
        { x: 10, y: 20 },
        { x: 100, y: 200 },
      ],
      pathWithDistance = [
        { ...path[0], distance: 0, distanceDelta: 0, index: 0 },
        {
          ...path[1],
          distance: getLength(path[1], path[0]),
          distanceDelta: getLength(path[1], path[0]),
          index: 1,
        },
        {
          ...path[2],
          distance: getLength(path[1], path[0]) + getLength(path[2], path[1]),
          distanceDelta: getLength(path[2], path[1]),
          index: 2,
        },
      ];
    test('3件', () => {
      const result = calcPathDistanceRatio(pathWithDistance);
      expect(result).toEqual([
        { ...pathWithDistance[0], ratio: 0 },
        { ...pathWithDistance[1], ratio: pathWithDistance[1].distance / pathWithDistance[2].distance },
        { ...pathWithDistance[2], ratio: 1 },
      ]);
    });
  });

  describe('options', () => {});
});
