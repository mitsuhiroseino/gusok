import adaptReturnValue from 'src/function/adaptReturnValue';

describe('adaptReturnValue', () => {
  test('戻り値の差し替え', () => {
    const fn = jest.fn((arg) => arg.item0),
      adaptedFn = adaptReturnValue(fn, (returnValue: any) => returnValue + '!'),
      result = adaptedFn({ item0: 'a', item1: 'b', item2: 'c' });
    expect(result).toBe('a!');
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith({ item0: 'a', item1: 'b', item2: 'c' });
  });
  test('戻り値の更新', () => {
    const fn = jest.fn((arg: any) => {
        return { item1: arg.item1, item2: arg.item2 };
      }),
      adaptedFn = adaptReturnValue(fn, (returnValue: any) => {
        returnValue.item3 = 'D';
      }),
      result = adaptedFn({ item0: 'a', item1: 'b', item2: 'c' });
    expect(result).toEqual({ item1: 'b', item2: 'c', item3: 'D' });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith({ item0: 'a', item1: 'b', item2: 'c' });
  });
});
