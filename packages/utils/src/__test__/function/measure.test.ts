import measure from 'src/function/measure';

describe('measure', () => {
  test('fnのみ', () => {
    const fn = jest.fn(() => true),
      result = measure(fn);
    expect(result).toEqual({ time: expect.any(Number), returnValue: true });
    expect(fn).toBeCalledTimes(10);
    expect(fn).toBeCalledWith();
  });
  test('fn & args', () => {
    const fn = jest.fn((...args) => args[2]),
      args = ['arg0', 'arg1', 'arg2'],
      result = measure(fn, { args });
    expect(result).toEqual({ time: expect.any(Number), returnValue: 'arg2' });
    expect(fn).toBeCalledTimes(10);
    expect(fn).toBeCalledWith('arg0', 'arg1', 'arg2');
  });
  test('fn & args & iteration', () => {
    const fn = jest.fn(),
      args = ['arg0', 'arg1', 'arg2'],
      result = measure(fn, { args, iteration: 100 });
    expect(result).toEqual({ time: expect.any(Number), returnValue: undefined });
    expect(fn).toBeCalledTimes(100);
    expect(fn).toBeCalledWith('arg0', 'arg1', 'arg2');
  });
  test('time', () => {
    const fn = jest.fn((...args) => {
        let start = performance.now();
        while (performance.now() - start < 100) {}
        return true;
      }),
      result = measure(fn);
    expect(result.time).toBeGreaterThanOrEqual(1000); // 100ms x 10
    expect(fn).toBeCalledTimes(10);
    expect(fn).toBeCalledWith();
  });
  test('Date.now()', () => {
    const fn = jest.fn((...args) => {
        const now = Date.now();
        return now;
      }),
      result = measure(fn, { iteration: 100000 });
    expect(fn).toBeCalledTimes(100000);
  });
  test('performance.now()', () => {
    const fn = jest.fn((...args) => {
        const now = performance.now();
        return now;
      }),
      result = measure(fn, { iteration: 100000 });
    expect(fn).toBeCalledTimes(100000);
  });
});
