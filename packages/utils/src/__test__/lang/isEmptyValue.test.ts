import isEmptyValue from 'src/lang/isEmptyValue';

describe('isEmptyValue', () => {
  describe('true', () => {
    test('undefined', () => {
      const value = undefined,
        result = isEmptyValue(value);
      expect(result).toBe(true);
    });
    test('null', () => {
      const value = null,
        result = isEmptyValue(value);
      expect(result).toBe(true);
    });
    test('空文字', () => {
      const value = '',
        result = isEmptyValue(value);
      expect(result).toBe(true);
    });
    test('空配列', () => {
      const value = [],
        result = isEmptyValue(value);
      expect(result).toBe(true);
    });
    test('空オブジェクト', () => {
      const value = {},
        result = isEmptyValue(value);
      expect(result).toBe(true);
    });
  });
  describe('false', () => {
    test('半角スペース', () => {
      const value = ' ',
        result = isEmptyValue(value);
      expect(result).toBe(false);
    });
    test('0', () => {
      const value = 0,
        result = isEmptyValue(value);
      expect(result).toBe(false);
    });
    test('日付型', () => {
      const value = new Date(),
        result = isEmptyValue(value);
      expect(result).toBe(false);
    });
    test('配列', () => {
      const value = [0],
        result = isEmptyValue(value);
      expect(result).toBe(false);
    });
    test('オブジェクト', () => {
      const value = { a: 0 },
        result = isEmptyValue(value);
      expect(result).toBe(false);
    });
  });
});
