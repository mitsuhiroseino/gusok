import getDistance2D from 'src/coord/getDistance2D';
import ensureAccuracy from 'src/number/ensureAccuracy';

const getLength = (x: number, y: number) => Math.sqrt(x * x + y * y);

describe('getDistance2D', () => {
  describe('default', () => {
    test('正順', () => {
      const result = getDistance2D({ x: 0, y: 0 }, { x: 100, y: 200 });
      expect(result).toBe(getLength(100, 200));
    });
    test('逆順', () => {
      const result = getDistance2D({ x: 100, y: 200 }, { x: 0, y: 0 });
      expect(result).toBe(getLength(100, 200));
    });
  });

  describe('options', () => {
    test('accuracy', () => {
      const result = getDistance2D({ x: 0, y: 0 }, { x: 100, y: 200 }, { accuracy: 0.1 });
      expect(result).toBe(ensureAccuracy(getLength(100, 200), 0.1));
    });
  });
});
