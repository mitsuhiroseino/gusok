import relayAsync from 'src/function/relayAsync';

describe('relayAsync', () => {
  test('default', () => {
    const fn0 = jest.fn(() => Promise.resolve(0)),
      fn1 = jest.fn(() => Promise.resolve(1)),
      fn2 = jest.fn(() => Promise.resolve(2)),
      fns = [fn0, fn1, fn2];

    relayAsync(fns).then((result) => {
      expect(result).toEqual([0, 1, 2]);
      expect(fn0).toBeCalledTimes(1);
      expect(fn0).toBeCalledWith();
      expect(fn1).toBeCalledTimes(1);
      expect(fn1).toBeCalledWith();
      expect(fn2).toBeCalledTimes(1);
      expect(fn2).toBeCalledWith();
    });
  });
  test('args', () => {
    const fn0 = jest.fn((...args) => Promise.resolve(args[0] + '0')),
      fn1 = jest.fn((...args) => Promise.resolve(args[1] + '1')),
      fn2 = jest.fn((...args) => Promise.resolve(args[2] + '2')),
      fns = [fn0, fn1, fn2],
      args = ['a', 'b', 'c'];

    relayAsync(fns, { args }).then((result) => {
      expect(result).toEqual(['a0', 'b1', 'c2']);
      expect(fn0).toBeCalledTimes(1);
      expect(fn0).toBeCalledWith(...args);
      expect(fn1).toBeCalledTimes(1);
      expect(fn1).toBeCalledWith(...args);
      expect(fn2).toBeCalledTimes(1);
      expect(fn2).toBeCalledWith(...args);
    });
  });
  test('returnValueToArg', () => {
    const fn0 = jest.fn(() => Promise.resolve('0')),
      fn1 = jest.fn((arg) => Promise.resolve(arg + '1')),
      fn2 = jest.fn((arg) => Promise.resolve(arg + '2')),
      fns = [fn0, fn1, fn2];

    relayAsync(fns, { returnValueToArg: true }).then((result) => {
      expect(result).toEqual(['0', '01', '012']);
      expect(fn0).toBeCalledTimes(1);
      expect(fn0).toBeCalledWith();
      expect(fn1).toBeCalledTimes(1);
      expect(fn1).toBeCalledWith('0');
      expect(fn2).toBeCalledTimes(1);
      expect(fn2).toBeCalledWith('01');
    });
  });
  test('args & returnValueToArg', () => {
    const fn0 = jest.fn((...args) => Promise.resolve(args[2] + '0')),
      fn1 = jest.fn((arg) => Promise.resolve(arg + '1')),
      fn2 = jest.fn((arg) => Promise.resolve(arg + '2')),
      fns = [fn0, fn1, fn2],
      args = ['a', 'b', 'c'];

    relayAsync(fns, { args, returnValueToArg: true }).then((result) => {
      expect(result).toEqual(['c0', 'c01', 'c012']);
      expect(fn0).toBeCalledTimes(1);
      expect(fn0).toBeCalledWith(...args);
      expect(fn1).toBeCalledTimes(1);
      expect(fn1).toBeCalledWith('c0');
      expect(fn2).toBeCalledTimes(1);
      expect(fn2).toBeCalledWith('c01');
    });
  });
});
