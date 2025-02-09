import comparePerformanceAsync from 'src/function/comparePerformanceAsync';
import wait from 'src/function/wait';

describe('comparePerformanceAsync', () => {
  test('default', () => {
    const fn0 = jest.fn(() => Promise.resolve(true)),
      fn1 = jest.fn(() => Promise.resolve(false)),
      fn2 = jest.fn(() => Promise.resolve(null)),
      targets = [
        { id: 'fn0', fn: fn0 },
        { id: 'fn1', fn: fn1 },
        { id: 'fn2', fn: fn2 },
      ];
    return comparePerformanceAsync({ id: 'default', targets }).then((result) => {
      expect(result).toEqual({
        id: 'default',
        results: [
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
          { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
        ],
        returnValues: { fn0: true, fn1: false, fn2: null },
        start: expect.any(Date),
        end: expect.any(Date),
        average: { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
        totalAverage: expect.any(Number),
        order: expect.arrayContaining(targets),
      });
      expect(fn0).toBeCalledTimes(100);
      expect(fn0).toBeCalledWith();
      expect(fn1).toBeCalledTimes(100);
      expect(fn1).toBeCalledWith();
      expect(fn2).toBeCalledTimes(100);
      expect(fn2).toBeCalledWith();
      return result;
    });
  });

  test('iteration&tests', () => {
    const fn0 = jest.fn(() => {
        return wait(100, () => 0);
      }),
      fn1 = jest.fn(() => {
        return wait(50, () => 10);
      }),
      fn2 = jest.fn(() => {
        return wait(10, () => 20);
      }),
      target0 = { id: 'fn0', fn: fn0 },
      target1 = { id: 'fn1', fn: fn1 },
      target2 = { id: 'fn2', fn: fn2 },
      targets = [target0, target1, target2];
    return comparePerformanceAsync<[string, number, boolean], number>({
      id: 'iteration&tests',
      targets,
      args: ['arg0', 1, true],
      iteration: 5,
      tests: 3,
    }).then((result) => {
      expect(result.id).toBe('iteration&tests');
      expect(result.results).toEqual([
        { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
        { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
        { fn0: expect.any(Number), fn1: expect.any(Number), fn2: expect.any(Number) },
      ]);
      expect(result.returnValues).toEqual({ fn0: 0, fn1: 10, fn2: 20 });
      expect(result.average.fn0).toBeGreaterThanOrEqual(500);
      expect(result.average.fn0).toBeLessThan(700);
      expect(result.average.fn1).toBeGreaterThanOrEqual(250);
      expect(result.average.fn1).toBeLessThan(350);
      expect(result.average.fn2).toBeGreaterThanOrEqual(50);
      expect(result.average.fn2).toBeLessThan(100);
      expect(result.totalAverage).toBeGreaterThanOrEqual(250);
      expect(result.totalAverage).toBeLessThan(350);
      expect(result.order).toEqual([target2, target1, target0]);
      expect(fn0).toBeCalledTimes(15);
      expect(fn0).toBeCalledWith('arg0', 1, true);
      expect(fn1).toBeCalledTimes(15);
      expect(fn1).toBeCalledWith('arg0', 1, true);
      expect(fn2).toBeCalledTimes(15);
      expect(fn2).toBeCalledWith('arg0', 1, true);

      return result;
    });
  });

  test('args', () => {
    const fn0 = jest.fn((nums) => {
        return wait(0, () => {
          nums[0]++;
          return nums[0];
        });
      }),
      fn1 = jest.fn((nums) => {
        return wait(0, () => {
          nums[0]++;
          return nums[0];
        });
      }),
      fn2 = jest.fn((nums) => {
        return wait(0, () => {
          nums[0]++;
          return nums[0];
        });
      }),
      target0 = { id: 'fn0', fn: fn0 },
      target1 = { id: 'fn1', fn: fn1 },
      target2 = { id: 'fn2', fn: fn2 },
      targets = [target0, target1, target2];
    return comparePerformanceAsync<[number[]], void>({
      id: 'args',
      targets,
      args: [[0]],
    }).then((result) => {
      expect(result.id).toBe('args');
      expect(result.returnValues).toEqual({ fn0: 280, fn1: 290, fn2: 300 });
      expect(fn0).toBeCalledTimes(100);
      expect(fn0).toHaveBeenLastCalledWith([300]);
      expect(fn1).toBeCalledTimes(100);
      expect(fn1).toHaveBeenLastCalledWith([300]);
      expect(fn2).toBeCalledTimes(100);
      expect(fn2).toHaveBeenLastCalledWith([300]);
    });
  });

  test('getArgs', () => {
    const fn0 = jest.fn((nums) => {
        return wait(0, () => {
          nums[0]++;
          return nums[0];
        });
      }),
      fn1 = jest.fn((nums) => {
        return wait(0, () => {
          nums[0]++;
          return nums[0];
        });
      }),
      fn2 = jest.fn((nums) => {
        return wait(0, () => {
          nums[0]++;
          return nums[0];
        });
      }),
      target0 = { id: 'fn0', fn: fn0 },
      target1 = { id: 'fn1', fn: fn1 },
      target2 = { id: 'fn2', fn: fn2 },
      targets = [target0, target1, target2];
    return comparePerformanceAsync<[number[]], void>({
      id: 'getArgs',
      targets,
      getArgs: () => [[0]],
    }).then((result) => {
      expect(result.id).toBe('getArgs');
      expect(result.returnValues).toEqual({ fn0: 1, fn1: 1, fn2: 1 });
      expect(fn0).toBeCalledTimes(100);
      expect(fn0).toHaveBeenLastCalledWith([1]); // fn0に渡された段階では[0]だが、fn0で配列の要素に+1しているので検証の段階では[1]になっている
      expect(fn1).toBeCalledTimes(100);
      expect(fn1).toHaveBeenLastCalledWith([1]);
      expect(fn2).toBeCalledTimes(100);
      expect(fn2).toHaveBeenLastCalledWith([1]);
    });
  });

  test('warmingUp', () => {
    const fn0 = jest.fn(() => Promise.resolve()),
      fn1 = jest.fn(() => Promise.resolve()),
      fn2 = jest.fn(() => Promise.resolve()),
      target0 = { id: 'fn0', fn: fn0 },
      target1 = { id: 'fn1', fn: fn1 },
      target2 = { id: 'fn2', fn: fn2 },
      targets = [target0, target1, target2];
    return comparePerformanceAsync({
      id: 'warmingUp',
      targets,
      warmingUp: true,
    }).then((result) => {
      expect(result.id).toBe('warmingUp');
      expect(fn0).toBeCalledTimes(101); // warmingUp + tests * iteration
      expect(fn1).toBeCalledTimes(101);
      expect(fn2).toBeCalledTimes(101);
    });
  });
});
