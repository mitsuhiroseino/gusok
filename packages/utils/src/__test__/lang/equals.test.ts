import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import equals, { COMPARE_MODE, IsSameOptions } from 'src/lang/isSame';

describe('equal', () => {
  describe('default', () => {
    test('一致', () => {
      const value1 = 'ABC',
        value2 = 'ABC',
        result = equals(value1, value2);
      expect(result).toBe(true);
    });

    test('不一致', () => {
      const value1 = 'ABC',
        value2 = 'abc',
        result = equals(value1, value2);
      expect(result).toBe(false);
    });
  });

  describe('options', () => {
    describe('equalityType="strict"', () => {
      const OPTIONS: IsSameOptions = { compareMode: COMPARE_MODE.STRICT };

      test('一致', () => {
        const value1 = 'ABC',
          value2 = 'ABC',
          result = equals(value1, value2, OPTIONS);
        expect(result).toBe(true);
      });

      test('不一致', () => {
        const value1 = 'ABC',
          value2 = 'abc',
          result = equals(value1, value2, OPTIONS);
        expect(result).toBe(false);
      });

      test('一致 (customizer)', () => {
        const value1 = 'ABC',
          value2 = 'abc',
          result = equals(value1, value2, {
            ...OPTIONS,
            customizer: (v0, v1) => {
              if (v0 !== v1) {
                return v0.toLowerCase() === v1.toLowerCase();
              }
            },
          });
        expect(result).toBe(true);
      });
    });

    describe('equalityType="loosely"', () => {
      const OPTIONS: IsSameOptions = { compareMode: COMPARE_MODE.LOOSE };

      test('一致', () => {
        const value1 = '123',
          value2 = 123,
          result = equals(value1, value2, OPTIONS);
        expect(result).toBe(true);
      });

      test('不一致', () => {
        const value1 = 'ABC',
          value2 = 'abc',
          result = equals(value1, value2, OPTIONS);
        expect(result).toBe(false);
      });

      test('一致 (customizer)', () => {
        const value1 = 123,
          value2 = 120,
          result = equals(value1, value2, {
            ...OPTIONS,
            customizer: (v0, v1) => {
              if (isNumber(v0) && isNumber(v1)) {
                return v0 >= v1;
              }
            },
          });
        expect(result).toBe(true);
      });
    });

    describe('equalityType="deeply"', () => {
      const OPTIONS: IsSameOptions = { compareMode: COMPARE_MODE.DEEP };

      test('一致', () => {
        const value1 = ['123'],
          value2 = ['123'],
          result = equals(value1, value2, OPTIONS);
        expect(result).toBe(true);
      });

      test('不一致', () => {
        const value1 = ['123'],
          value2 = [123],
          result = equals(value1, value2, OPTIONS);
        expect(result).toBe(false);
      });

      test('一致 (customizer)', () => {
        const value1 = { item0: 'ABC', item1: ['DEF', 'GHI'], item2: { a: 'JKL', b: 'MNO' } },
          value2 = { item0: 'abc', item1: ['def', 'ghi'], item2: { a: 'jkl', b: 'mno' } },
          result = equals(value1, value2, {
            ...OPTIONS,
            customizer: (v0, v1) => {
              if (isString(v0) && isString(v1)) {
                return v0.toLowerCase() === v1.toLowerCase();
              }
            },
          });
        expect(result).toBe(true);
      });
    });
  });
});
