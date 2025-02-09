import insert from 'src/array/insert';

describe('insert', () => {
  describe('1要素', () => {
    test('先頭に追加', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, 'a', 0);
      expect(array).toEqual(['a', 0, 1, 2, 3, 4]);
    });

    test('中盤に追加', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, 'a', 2);
      expect(array).toEqual([0, 1, 'a', 2, 3, 4]);
    });

    test('末尾に追加', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, 'a', 5);
      expect(array).toEqual([0, 1, 2, 3, 4, 'a']);
    });

    test('末尾に追加(index未指定)', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, 'a');
      expect(array).toEqual([0, 1, 2, 3, 4, 'a']);
    });

    test('先頭に追加(index=-1)', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, 'a', -1);
      expect(array).toEqual(['a', 0, 1, 2, 3, 4]);
    });

    test('末尾に追加(index=要素数以上)', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, 'a', 10);
      expect(array).toEqual([0, 1, 2, 3, 4, 'a']);
    });
  });

  describe('複数要素', () => {
    test('先頭に追加', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, ['a', 'b', 'c'], 0);
      expect(array).toEqual(['a', 'b', 'c', 0, 1, 2, 3, 4]);
    });

    test('中盤に追加', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, ['a', 'b', 'c'], 2);
      expect(array).toEqual([0, 1, 'a', 'b', 'c', 2, 3, 4]);
    });

    test('末尾に追加', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, ['a', 'b', 'c'], 5);
      expect(array).toEqual([0, 1, 2, 3, 4, 'a', 'b', 'c']);
    });

    test('末尾に追加(index未指定)', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, ['a', 'b', 'c']);
      expect(array).toEqual([0, 1, 2, 3, 4, 'a', 'b', 'c']);
    });

    test('先頭に追加(index=-1)', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, ['a', 'b', 'c'], -1);
      expect(array).toEqual(['a', 'b', 'c', 0, 1, 2, 3, 4]);
    });

    test('末尾に追加(index=要素数以上)', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      insert(array, ['a', 'b', 'c'], 10);
      expect(array).toEqual([0, 1, 2, 3, 4, 'a', 'b', 'c']);
    });
  });
});
