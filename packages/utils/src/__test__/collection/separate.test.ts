import isBoolean from 'lodash/isBoolean';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import separate from 'src/collection/separate';

describe('separate', () => {
  describe('default', () => {
    test('flat', () => {
      const result = separate(
        {
          a: 1,
          b: '2',
          c: 3,
          d: '4',
          e: 5,
        },
        (value) => typeof value,
      );
      expect(result).toEqual({
        number: { a: 1, c: 3, e: 5 },
        string: { b: '2', d: '4' },
      });
    });

    test('nested', () => {
      const result = separate(
        {
          a: 1,
          b: '2',
          c: 3,
          d: '4',
          e: { A: 1, B: '2', C: 3, D: '4' },
          f: true,
          g: [1, '2', 3, '4', 5],
        },
        (value) => (isBoolean(value) ? null : typeof value),
      );
      expect(result).toEqual({
        number: { a: 1, c: 3, e: { A: 1, C: 3 }, g: [1, 3, 5] },
        string: { b: '2', d: '4', e: { B: '2', D: '4' }, g: ['2', '4'] },
      });
    });

    test('array', () => {
      const result = separate(
        [
          { a: 123, b: 'ABC', c: true },
          { a: 456, b: 'DEF', c: false },
          { a: 789, b: 'GHI', c: true },
        ],
        (value) => (isString(value) ? 'string' : 'rest'),
      );
      expect(result).toEqual({
        string: [{ b: 'ABC' }, { b: 'DEF' }, { b: 'GHI' }],
        rest: [
          { a: 123, c: true },
          { a: 456, c: false },
          { a: 789, c: true },
        ],
      });
    });

    test('array in object', () => {
      const result = separate(
        {
          a: 0,
          b: '!!!',
          c: false,
          array: [
            { a: 123, b: 'ABC', c: true },
            { a: 456, b: 'DEF', c: false },
            { a: 789, b: 'GHI', c: true },
          ],
        },
        (value) => (isString(value) ? 'string' : 'rest'),
      );
      expect(result).toEqual({
        string: { b: '!!!', array: [{ b: 'ABC' }, { b: 'DEF' }, { b: 'GHI' }] },
        rest: {
          a: 0,
          c: false,
          array: [
            { a: 123, c: true },
            { a: 456, c: false },
            { a: 789, c: true },
          ],
        },
      });
    });
  });

  describe('options', () => {
    test('flat', () => {
      const result = separate(
        {
          a: 1,
          b: '2',
          c: 3,
          d: '4',
          e: 5,
        },
        (value) => typeof value,
      );
      expect(result).toEqual({
        number: { a: 1, c: 3, e: 5 },
        string: { b: '2', d: '4' },
      });
    });

    test('level', () => {
      const result = separate(
        {
          a: 1,
          b: '2',
          c: 3,
          d: '4',
          e: { A: 1, B: '2', C: 3, D: '4', E: { AA: 1, BB: '2', CC: 3, DD: '4' } },
          f: true,
          g: [1, '2', 3, '4', 5, ['a', 'b', 'c', 'd', 'e']],
        },
        (value) => (isBoolean(value) ? null : typeof value),
        { level: 1 },
      );
      expect(result).toEqual({
        number: { a: 1, c: 3, e: { A: 1, C: 3 }, g: [1, 3, 5] },
        string: { b: '2', d: '4', e: { B: '2', D: '4' }, g: ['2', '4'] },
      });
    });

    test('includeObject', () => {
      const result = separate(
        [
          { a: 123, b: 'ABC', c: true },
          { a: 456, b: 'DEF', c: false },
          { a: 789, b: 'GHI', c: true },
        ],
        (value) => {
          if (isPlainObject(value)) {
            return !value.c ? 'string' : undefined;
          } else {
            return isString(value) ? 'string' : 'rest';
          }
        },
        { includeObject: true },
      );
      expect(result).toEqual({
        string: [{ b: 'ABC' }, { a: 456, b: 'DEF', c: false }, { b: 'GHI' }],
        rest: [
          { a: 123, c: true },
          { a: 789, c: true },
        ],
      });
    });

    test('includeArray', () => {
      const result = separate(
        {
          a: 0,
          b: '!!!',
          c: false,
          array1: [{ A: 1, B: 'abc', C: false }],
          array3: [
            { a: 123, b: 'ABC', c: true },
            { a: 456, b: 'DEF', c: false },
            { a: 789, b: 'GHI', c: true },
          ],
        },
        (value) =>
          Array.isArray(value) ? (value.length === 1 ? 'array' : undefined) : isString(value) ? 'string' : 'rest',
        { includeArray: true },
      );
      expect(result).toEqual({
        array: { array1: [{ A: 1, B: 'abc', C: false }] },
        string: {
          b: '!!!',
          array3: [{ b: 'ABC' }, { b: 'DEF' }, { b: 'GHI' }],
        },
        rest: {
          a: 0,
          c: false,
          array3: [
            { a: 123, c: true },
            { a: 456, c: false },
            { a: 789, c: true },
          ],
        },
      });
    });
  });
});
