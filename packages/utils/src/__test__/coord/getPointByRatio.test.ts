import getPointByRatio, { GetPointByRatioOptions } from 'src/coord/getPointByRatio';

const getLength = (current: { x: number; y: number }, prev: { x: number; y: number }) => {
  const x = current.x - prev.x,
    y = current.y - prev.y;
  return Math.sqrt(x * x + y * y);
};

describe('getPointByRatio', () => {
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
      const result = getPointByRatio(pathWithDistanceRatio, 0);
      expect(result).toEqual(pathWithDistanceRatio[0]);
    });
    test('ratio=0.2', () => {
      const result = getPointByRatio(pathWithDistanceRatio, 0.2);
      expect(result).toEqual({
        x: 20,
        y: 40,
        distance: getLength({ x: 20, y: 40 }, path[0]),
        distanceDelta: getLength({ x: 20, y: 40 }, path[0]),
        index: 1,
        ratio: 0.2,
      });
    });
    test('ratio=0.5', () => {
      const result = getPointByRatio(pathWithDistanceRatio, 0.5);
      expect(result).toEqual(pathWithDistanceRatio[1]);
    });
    test('ratio=0.8', () => {
      const result = getPointByRatio(pathWithDistanceRatio, 0.8);
      expect(result).toEqual({
        x: 80,
        y: 160,
        distance: getLength(path[1], path[0]) + getLength({ x: 80, y: 160 }, path[1]),
        distanceDelta: getLength({ x: 80, y: 160 }, path[1]),
        index: 2,
        ratio: 0.8,
      });
    });
    test('ratio=1', () => {
      const result = getPointByRatio(pathWithDistanceRatio, 1);
      expect(result).toEqual(pathWithDistanceRatio[2]);
    });
  });

  describe('options', () => {
    describe('loopX', () => {
      const options: GetPointByRatioOptions = {
        loopX: true,
        minValueX: -200,
        maxValueX: 200,
        loopY: true,
        minValueY: -200,
        maxValueY: 200,
      };
      test('xの差=100,yの差=100', () => {
        // 0→正
        const zero_positive = getPointByRatio(
          [
            { x: 0, y: 0 },
            { x: 100, y: 100 },
          ],
          1,
          options,
        );

        // 0→負
        const zero_negative = getPointByRatio(
          [
            { x: 0, y: 0 },
            { x: -100, y: -100 },
          ],
          1,
          options,
        );

        // 正→0→負
        const positive_zero_negative = getPointByRatio(
          [
            { x: 50, y: 50 },
            { x: -50, y: -50 },
          ],
          1,
          options,
        );

        // 負→0→正
        const negative_zero_positive = getPointByRatio(
          [
            { x: -50, y: -50 },
            { x: 50, y: 50 },
          ],
          1,
          options,
        );

        // 正→最大→負
        const positive_max_negative = getPointByRatio(
          [
            { x: 150, y: 150 },
            { x: -150, y: -150 },
          ],
          1,
          options,
        );

        // 最大→負
        const max_negative = getPointByRatio(
          [
            { x: 200, y: 200 },
            { x: -100, y: -100 },
          ],
          1,
          options,
        );

        // 最小→正
        const min_positive = getPointByRatio(
          [
            { x: -200, y: -200 },
            { x: 100, y: 100 },
          ],
          1,
          options,
        );

        // 各距離が同じこと
        expect(zero_positive.distance).toBe(zero_negative.distance);
        expect(zero_positive.distance).toBe(positive_zero_negative.distance);
        expect(zero_positive.distance).toBe(negative_zero_positive.distance);
        expect(zero_positive.distance).toBe(positive_max_negative.distance);
        expect(zero_positive.distance).toBe(max_negative.distance);
        expect(zero_positive.distance).toBe(min_positive.distance);
      });
    });
  });
});
