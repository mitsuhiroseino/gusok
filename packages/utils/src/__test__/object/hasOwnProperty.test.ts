import hasOwnProperty from 'src/object/hasOwnProperty';

describe('hasOwnProperty', () => {
  const OBJECT = {
    string: 'あ',
    number: 1,
    boolean: true,
    date: new Date(1999, 0, 2, 3, 40, 56, 789),
    array: ['A', 'B', 'C'],
    object: { a: 0, b: 1, c: 2 },
    null: null,
    undefined: undefined,
  };

  test('あり', () => {
    const result = hasOwnProperty(OBJECT, 'string');
    expect(result).toBe(true);
  });

  test('あり(値がnull)', () => {
    const result = hasOwnProperty(OBJECT, 'null');
    expect(result).toBe(true);
  });

  test('あり(値がundefined)', () => {
    const result = hasOwnProperty(OBJECT, 'undefined');
    expect(result).toBe(true);
  });

  test('なし', () => {
    const result = hasOwnProperty(OBJECT, 'none');
    expect(result).toBe(false);
  });

  test('インスタンスなし', () => {
    const result = hasOwnProperty(null, 'string');
    expect(result).toBe(false);
  });
});
