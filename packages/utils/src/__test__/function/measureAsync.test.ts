import measureAsync from 'src/function/measureAsync';

describe('measureAsync', () => {
  test('fnのみ', () => {
    const fn = jest.fn(() => Promise.resolve(true));
    return measureAsync(fn).then((result) => {
      expect(result).toEqual({ time: expect.any(Number), returnValue: true });
      expect(fn).toBeCalledTimes(10);
      expect(fn).toBeCalledWith();
    });
  });
  test('fn & args', () => {
    const fn = jest.fn((...args) => Promise.resolve(args[2])),
      args = ['arg0', 'arg1', 'arg2'];
    return measureAsync(fn, { args }).then((result) => {
      expect(result).toEqual({ time: expect.any(Number), returnValue: 'arg2' });
      expect(fn).toBeCalledTimes(10);
      expect(fn).toBeCalledWith('arg0', 'arg1', 'arg2');
    });
  });
  test('fn & args & iteration', () => {
    const fn = jest.fn((...args) => Promise.resolve()),
      args = ['arg0', 'arg1', 'arg2'];
    return measureAsync(fn, { args, iteration: 100 }).then((result) => {
      expect(result).toEqual({ time: expect.any(Number), returnValue: undefined });
      expect(fn).toBeCalledTimes(100);
      expect(fn).toBeCalledWith('arg0', 'arg1', 'arg2');
    });
  });
  test('time', () => {
    const fn = jest.fn((...args) => {
      return new Promise((resolve) => setTimeout(() => resolve(true), 100));
    });
    return measureAsync(fn).then((result) => {
      expect(result.time).toBeGreaterThanOrEqual(1000);
      expect(fn).toBeCalledTimes(10);
      expect(fn).toBeCalledWith();
    });
  });
});
