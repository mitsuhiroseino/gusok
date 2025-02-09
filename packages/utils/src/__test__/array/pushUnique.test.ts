import pushUnique from 'src/array/pushUnique';

describe('pushUnique', () => {
  describe('1要素', () => {
    test('重複なし', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      pushUnique(array, 5);
      expect(array).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test('重複あり', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      pushUnique(array, 2);
      expect(array).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('複数要素', () => {
    test('重複なし', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      pushUnique(array, [5, 6, 7]);
      expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });

    test('重複あり(一部)', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      pushUnique(array, [2, 4, 6, 8]);
      expect(array).toEqual([0, 1, 2, 3, 4, 6, 8]);
    });

    test('重複あり(全部)', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      pushUnique(array, [0, 2, 4]);
      expect(array).toEqual([0, 1, 2, 3, 4]);
    });
  });
});
