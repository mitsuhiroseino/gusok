import getDefined from 'src/lang/getDefined';

describe('getDefined', () => {
  describe('引数3件', () => {
    test('3件あり', () => {
      const arg0 = 'ARG0',
        arg1 = 'ARG1',
        arg2 = 'ARG2',
        args = [arg0, arg1, arg2],
        result = getDefined(...args);
      expect(result).toBe(arg0);
    });
    test('2件あり', () => {
      const arg0 = undefined,
        arg1 = 'ARG1',
        arg2 = 'ARG2',
        args = [arg0, arg1, arg2],
        result = getDefined(...args);
      expect(result).toBe(arg1);
    });
    test('1件あり', () => {
      const arg0 = undefined,
        arg1 = undefined,
        arg2 = 'ARG2',
        args = [arg0, arg1, arg2],
        result = getDefined(...args);
      expect(result).toBe(arg2);
    });
  });
  test('引数なし', () => {
    const args = [],
      result = getDefined(...args);
    expect(result).toBe(undefined);
  });
});
