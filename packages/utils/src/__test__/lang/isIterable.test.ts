import isIterable from 'src/lang/isIterable';

describe('isIterable', () => {
  describe('true', () => {
    test('配列', () => {
      const value = [],
        result = isIterable(value);
      expect(result).toBe(true);
    });
    test('アーギュメント', function () {
      const value = arguments,
        result = isIterable(value);
      expect(result).toBe(true);
    });
    test('カスタムIterable', () => {
      class MyIterable {
        *[Symbol.iterator]() {
          yield 0;
          yield 1;
          yield 2;
        }
      }
      const value = new MyIterable(),
        result = isIterable(value);
      expect(result).toBe(true);
    });
    test('文字列', () => {
      const value = '',
        result = isIterable(value);
      expect(result).toBe(true);
    });
  });
  describe('false', () => {
    test('オブジェクト', () => {
      const value = {},
        result = isIterable(value);
      expect(result).toBe(false);
    });
    test('日付', () => {
      const value = new Date(),
        result = isIterable(value);
      expect(result).toBe(false);
    });
    test('数値', () => {
      const value = 0,
        result = isIterable(value);
      expect(result).toBe(false);
    });
    test('真偽値', () => {
      const value = true,
        result = isIterable(value);
      expect(result).toBe(false);
    });
  });
});
