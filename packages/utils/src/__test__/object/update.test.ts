import update, { COMPARE_MODE } from 'src/object/update';

describe('update', () => {
  const getValue = () => ({
    string: 'あ',
    number: 1,
    boolean: true,
    date: new Date(1999, 0, 2, 3, 40, 56, 789),
    array: ['A', 'B', 'C'],
    object: { a: 0, b: 1, c: 2 },
  });

  describe('処理', () => {
    test('更新あり', () => {
      const value = getValue(),
        result = update(value, { number: 2, array: ['a', 'b', 'c'] });
      expect(result).toEqual({ number: 1, array: ['A', 'B', 'C'] });
      expect(value).toEqual({
        string: 'あ',
        number: 2,
        boolean: true,
        date: new Date(1999, 0, 2, 3, 40, 56, 789),
        array: ['a', 'b', 'c'],
        object: { a: 0, b: 1, c: 2 },
      });
    });

    test('追加あり', () => {
      const value = getValue(),
        result = update(value, { null: null, undefined: undefined });
      expect(result).toEqual({ null: undefined, undefined: undefined });
      expect(value).toEqual({
        string: 'あ',
        number: 1,
        boolean: true,
        date: new Date(1999, 0, 2, 3, 40, 56, 789),
        array: ['A', 'B', 'C'],
        object: { a: 0, b: 1, c: 2 },
        null: null,
        undefined: undefined,
      });
    });

    test('更新なし', () => {
      const value = getValue(),
        result = update(value, { number: 1, boolean: true });
      expect(result).toEqual({});
      expect(value).toEqual({
        string: 'あ',
        number: 1,
        boolean: true,
        date: new Date(1999, 0, 2, 3, 40, 56, 789),
        array: ['A', 'B', 'C'],
        object: { a: 0, b: 1, c: 2 },
      });
    });
  });

  describe('options', () => {
    test('equalityType', () => {
      const value = getValue(),
        result = update(value, { number: '1' }, { compareMode: COMPARE_MODE.LOOSE });
      expect(result).toEqual({});
      expect(value).toEqual({
        string: 'あ',
        number: 1,
        boolean: true,
        date: new Date(1999, 0, 2, 3, 40, 56, 789),
        array: ['A', 'B', 'C'],
        object: { a: 0, b: 1, c: 2 },
      });
    });
  });
});
