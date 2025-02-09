import getPathByRatio from 'src/coord/getPathByRatio';

const getLength = (current: { x: number; y: number }, prev: { x: number; y: number }) => {
  const x = current.x - prev.x,
    y = current.y - prev.y;
  return Math.sqrt(x * x + y * y);
};

describe('getPathByRatio', () => {
  describe('default', () => {
    const path = [
        { x: 0, y: 0 },
        { x: 50, y: 100 },
        { x: 100, y: 200 },
      ],
      pathWithDistanceRatio = [
        { ...path[0], distance: 0, distanceDelta: 0, index: 0, ratio: 0 },
        {
          ...path[1],
          distance: getLength(path[1], path[0]),
          distanceDelta: getLength(path[1], path[0]),
          index: 1,
          ratio: getLength(path[1], path[0]) / (getLength(path[1], path[0]) + getLength(path[2], path[1])),
        },
        {
          ...path[2],
          distance: getLength(path[1], path[0]) + getLength(path[2], path[1]),
          distanceDelta: getLength(path[2], path[1]),
          index: 2,
          ratio: 1,
        },
      ];
    test('ratio=0', () => {
      const result = getPathByRatio(pathWithDistanceRatio, 0);
      expect(result).toEqual([pathWithDistanceRatio[0]]);
    });
    test('ratio=0.2', () => {
      const result = getPathByRatio(pathWithDistanceRatio, 0.2);
      expect(result).toEqual([
        pathWithDistanceRatio[0],
        {
          x: 20,
          y: 40,
          distance: getLength({ x: 20, y: 40 }, path[0]),
          distanceDelta: getLength({ x: 20, y: 40 }, path[0]),
          index: 1,
          ratio: 0.2,
        },
      ]);
    });
    test('ratio=0.5', () => {
      const result = getPathByRatio(pathWithDistanceRatio, 0.5);
      expect(result).toEqual([pathWithDistanceRatio[0], pathWithDistanceRatio[1]]);
    });
    test('ratio=0.8', () => {
      const result = getPathByRatio(pathWithDistanceRatio, 0.8);
      expect(result).toEqual([
        pathWithDistanceRatio[0],
        pathWithDistanceRatio[1],
        {
          x: 80,
          y: 160,
          distance: getLength(path[1], path[0]) + getLength({ x: 80, y: 160 }, path[1]),
          distanceDelta: getLength({ x: 80, y: 160 }, path[1]),
          index: 2,
          ratio: 0.8,
        },
      ]);
    });
    test('ratio=1', () => {
      const result = getPathByRatio(pathWithDistanceRatio, 1);
      expect(result).toEqual(pathWithDistanceRatio);
    });
  });

  describe('options', () => {});
});
