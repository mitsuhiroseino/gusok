import sleep from 'src/function/sleep';

describe('sleep', () => {
  test('100ms', () => {
    const start = performance.now();
    sleep(100);
    const time = performance.now() - start;
    expect(time).toBeGreaterThanOrEqual(100);
    expect(time).toBeLessThanOrEqual(120);
  });
  test('0ms', () => {
    const start = performance.now();
    sleep(0);
    const time = performance.now() - start;
    expect(time).toBeGreaterThanOrEqual(0);
    expect(time).toBeLessThanOrEqual(20);
  });
  test('-100ms', () => {
    const start = performance.now();
    sleep(-100);
    const time = performance.now() - start;
    expect(time).toBeGreaterThanOrEqual(0);
    expect(time).toBeLessThanOrEqual(20);
  });
});
