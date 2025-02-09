import adaptArgs from 'src/function/adaptArgs';

describe('adaptArgs', () => {
  test('引数の差し替え', () => {
    const fn = jest.fn((...args) => args[0]),
      adaptedFn = adaptArgs(fn, (arg: any) => [arg.item0, arg.item1, arg.item2]),
      result = adaptedFn({ item0: 'a', item1: 'b', item2: 'c' });
    expect(result).toBe('a');
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith('a', 'b', 'c');
  });
  test('引数の更新', () => {
    const fn = jest.fn((arg: any) => arg.item0),
      adaptedFn = adaptArgs(fn, (arg: any) => {
        arg.item0 = arg.item0 + '0';
      }),
      result = adaptedFn({ item0: 'a', item1: 'b', item2: 'c' });
    expect(result).toBe('a0');
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith({ item0: 'a0', item1: 'b', item2: 'c' });
  });
});
