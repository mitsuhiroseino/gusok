import clear from 'src/array/clear';

describe('clear', () => {
  test('全要素削除', () => {
    const array = [0, 1, 2, 3, 4],
      result = clear(array);
    expect(result).toEqual([]);
  });
});
