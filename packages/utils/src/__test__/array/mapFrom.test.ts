import mapFrom from 'src/array/mapFrom';

describe('mapFrom', () => {
  test('配列', () => {
    const array = [0, 1, 2, 3, 4],
      result = mapFrom(array, (value) => value + 1);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  test('配列以外', () => {
    const item = 0,
      result = mapFrom(item, (value) => value + 1);
    expect(result).toBe(1);
  });
});
