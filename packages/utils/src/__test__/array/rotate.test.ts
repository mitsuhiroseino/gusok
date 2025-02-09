import rotate from 'src/array/rotate';

describe('rotate', () => {
  test('default(1件)', () => {
    const array = [0, 1, 2, 3, 4],
      result = rotate(array);
    expect(result).toEqual([1, 2, 3, 4, 0]);
  });
  test('複数件', () => {
    const array = [0, 1, 2, 3, 4],
      result = rotate(array, 3);
    expect(result).toEqual([3, 4, 0, 1, 2]);
  });
  test('0件', () => {
    const array = [0, 1, 2, 3, 4],
      result = rotate(array, 0);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });
  test('配列の要素数以上', () => {
    const array = [0, 1, 2, 3, 4],
      result = rotate(array, 8);
    expect(result).toEqual([3, 4, 0, 1, 2]);
  });
});
