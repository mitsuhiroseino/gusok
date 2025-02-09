import applyIf from 'src/function/applyIf';

describe('applyIf', () => {
  test('fnあり', () => {
    const fn = jest.fn((arg0: string, arg1: string, arg2: string) => true),
      result = applyIf(fn, ['arg0', 'arg1', 'arg2']);
    expect(result).toBe(true);
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith('arg0', 'arg1', 'arg2');
  });
  test('fnなし', () => {
    const fn = null,
      result = applyIf(fn, ['arg0', 'arg1', 'arg2']);
    expect(result).toBe(undefined);
  });
});
