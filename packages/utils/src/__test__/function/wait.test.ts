import wait from 'src/function/wait';

describe('wait', () => {
  test('100ms', () => {
    const start = performance.now();
    return wait(100, (...args) => args[0], [true, false]).then((result) => {
      const time = performance.now() - start;
      expect(time).toBeGreaterThanOrEqual(100);
      expect(time).toBeLessThanOrEqual(140);
      expect(result).toBe(true);
    });
  });
  test('0ms', () => {
    const start = performance.now();
    return wait(0, (...args) => args[0], [true, false]).then((result) => {
      const time = performance.now() - start;
      expect(time).toBeGreaterThanOrEqual(0);
      expect(time).toBeLessThanOrEqual(40);
      expect(result).toBe(true);
    });
  });
  test('-100ms', () => {
    const start = performance.now();
    return wait(-100, (...args) => args[1], [true, false]).then((result) => {
      const time = performance.now() - start;
      expect(time).toBeGreaterThanOrEqual(0);
      expect(time).toBeLessThanOrEqual(40);
      expect(result).toBe(false);
    });
  });
});
