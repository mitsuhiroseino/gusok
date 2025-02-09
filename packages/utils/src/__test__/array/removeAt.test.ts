import removeAt from 'src/array/removeAt';

describe('removeAt', () => {
  describe('1要素', () => {
    test('先頭', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, 0);
      expect(array).toEqual([1, 2, 3, 4]);
      expect(result).toEqual([0]);
    });

    test('中盤', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, 2);
      expect(array).toEqual([0, 1, 3, 4]);
      expect(result).toEqual([2]);
    });

    test('末尾', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, 4);
      expect(array).toEqual([0, 1, 2, 3]);
      expect(result).toEqual([4]);
    });

    test('先頭以前', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, -3);
      expect(array).toEqual([0, 1, 3, 4]);
      expect(result).toEqual([2]);
    });

    test('末尾以降', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, 10);
      expect(array).toEqual([0, 1, 2, 3, 4]);
      expect(result).toEqual([]);
    });
  });

  describe('複数要素', () => {
    test('先頭', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, 0, 3);
      expect(array).toEqual([3, 4]);
      expect(result).toEqual([0, 1, 2]);
    });

    test('中盤', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, 1, 3);
      expect(array).toEqual([0, 4]);
      expect(result).toEqual([1, 2, 3]);
    });

    test('末尾', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, 2, 3);
      expect(array).toEqual([0, 1]);
      expect(result).toEqual([2, 3, 4]);
    });

    test('先頭以前', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, -2, 3);
      expect(array).toEqual([0, 4]);
      expect(result).toEqual([1, 2, 3]);
    });

    test('末尾以降', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      const result = removeAt(array, 5, 3);
      expect(array).toEqual([0, 1, 2, 3, 4]);
      expect(result).toEqual([]);
    });
  });
});
