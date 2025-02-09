import each from 'src/collection/each';

describe('each', () => {
  describe('array', () => {
    test('breakなし', () => {
      const array = [0, 2, 4, 6, 8],
        fn = jest.fn((value: any, index: number) => {}),
        result = each(array, fn);
      expect(result).toBe(undefined);
      expect(fn).toBeCalledTimes(5);
    });
    test('breakあり', () => {
      const array = [0, 2, 4, 6, 8],
        fn = jest.fn((value: any, index: number) => {
          if (value > 2) {
            return `array[${index}] === ${value}`;
          }
        }),
        result = each(array, fn);
      expect(result).toBe('array[2] === 4');
      expect(fn).toBeCalledTimes(3);
    });
  });
  describe('iterable', () => {
    class MyIterable {
      *[Symbol.iterator]() {
        yield 0;
        yield 2;
        yield 4;
        yield 6;
        yield 8;
      }
    }
    test('breakなし', () => {
      const iterable = new MyIterable(),
        fn = jest.fn((value: any, index: number) => {}),
        result = each(iterable, fn);
      expect(result).toBe(undefined);
      expect(fn).toBeCalledTimes(5);
    });
    test('breakあり', () => {
      const iterable = new MyIterable(),
        fn = jest.fn((value: any, index: number) => {
          if (value > 2) {
            return `iterable[${index}] === ${value}`;
          }
        }),
        result = each(iterable, fn);
      expect(result).toBe('iterable[2] === 4');
      expect(fn).toBeCalledTimes(3);
    });
  });
  describe('object', () => {
    test('breakなし', () => {
      const object = { a: 0, b: 2, c: 4, d: 6, e: 8 },
        fn = jest.fn((value: any, key: string) => {}),
        result = each(object, fn);
      expect(result).toBe(undefined);
      expect(fn).toBeCalledTimes(5);
    });
    test('breakあり', () => {
      const object = { a: 0, b: 2, c: 4, d: 6, e: 8 },
        fn = jest.fn((value: any, key: string) => {
          if (value > 2) {
            return `object.${key} === ${value}`;
          }
        }),
        result = each(object, fn);
      expect(result).toBe('object.c === 4');
      expect(fn).toBeCalledTimes(3); // 仕様上、オブジェクトの要素は順番が保証されている訳ではないので3にならない場合もあるが、リテラルなら多分大丈夫
    });
  });
});
