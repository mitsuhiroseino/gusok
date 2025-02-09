import compare, { CompareResult, DIFFERENCE_TYPE, NO_VALUE, VALUE_TYPE } from 'src/data/compare';

describe('compare', () => {
  describe('array', () => {
    const ARRAY0 = [0, 1, 2],
      ARRAY00 = [0, 1, 2],
      ARRAY_VALUE = [0, 2, 2],
      ARRAY_SIZE = [0, 1];
    test('一致', () => {
      const result = compare(ARRAY0, ARRAY00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.ARRAY,
          type2: VALUE_TYPE.ARRAY,
          value1: ARRAY0,
          value2: ARRAY00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
          children: [
            {
              key: 0,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 0,
              value2: 0,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 1,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 1,
              value2: 1,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 2,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 2,
              value2: 2,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
          ],
        };
      expect(result).toEqual(compareResult);
    });
    test('要素数不一致', () => {
      const result = compare(ARRAY0, ARRAY_SIZE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.ARRAY,
          type2: VALUE_TYPE.ARRAY,
          value1: ARRAY0,
          value2: ARRAY_SIZE,
          difference: DIFFERENCE_TYPE.SIZE,
          children: [
            {
              key: 0,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 0,
              value2: 0,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 1,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 1,
              value2: 1,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 2,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NO_TYPE,
              value1: 2,
              value2: NO_VALUE,
              difference: DIFFERENCE_TYPE.KEY,
            },
          ],
        };
      expect(result).toEqual(compareResult);
    });
    test('値不一致', () => {
      const result = compare(ARRAY0, ARRAY_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.ARRAY,
          type2: VALUE_TYPE.ARRAY,
          value1: ARRAY0,
          value2: ARRAY_VALUE,
          difference: DIFFERENCE_TYPE.CHILDREN,
          children: [
            {
              key: 0,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 0,
              value2: 0,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 1,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 1,
              value2: 2,
              difference: DIFFERENCE_TYPE.VALUE,
            },
            {
              key: 2,
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 2,
              value2: 2,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
          ],
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('object', () => {
    const OBJECT0 = { a: 0, b: 1, c: 2 },
      OBJECT00 = { a: 0, b: 1, c: 2 },
      OBJECT_VALUE = { a: 0, b: 2, c: 2 },
      OBJECT_SIZE = { a: 0, b: 1 };
    test('一致', () => {
      const result = compare(OBJECT0, OBJECT00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.OBJECT,
          type2: VALUE_TYPE.OBJECT,
          value1: OBJECT0,
          value2: OBJECT00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
          children: [
            {
              key: 'a',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 0,
              value2: 0,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 'b',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 1,
              value2: 1,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 'c',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 2,
              value2: 2,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
          ],
        };
      expect(result).toEqual(compareResult);
    });
    test('要素数不一致', () => {
      const result = compare(OBJECT0, OBJECT_SIZE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.OBJECT,
          type2: VALUE_TYPE.OBJECT,
          value1: OBJECT0,
          value2: OBJECT_SIZE,
          difference: DIFFERENCE_TYPE.SIZE,
          children: [
            {
              key: 'a',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 0,
              value2: 0,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 'b',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 1,
              value2: 1,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 'c',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NO_TYPE,
              value1: 2,
              value2: NO_VALUE,
              difference: DIFFERENCE_TYPE.KEY,
            },
          ],
        };
      expect(result).toEqual(compareResult);
    });
    test('値不一致', () => {
      const result = compare(OBJECT0, OBJECT_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.OBJECT,
          type2: VALUE_TYPE.OBJECT,
          value1: OBJECT0,
          value2: OBJECT_VALUE,
          difference: DIFFERENCE_TYPE.CHILDREN,
          children: [
            {
              key: 'a',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 0,
              value2: 0,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
            {
              key: 'b',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 1,
              value2: 2,
              difference: DIFFERENCE_TYPE.VALUE,
            },
            {
              key: 'c',
              type1: VALUE_TYPE.NUMBER,
              type2: VALUE_TYPE.NUMBER,
              value1: 2,
              value2: 2,
              difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
            },
          ],
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('undefined', () => {
    const UNDEFINED0 = undefined,
      UNDEFINED00 = undefined,
      UNDEFINED_VALUE = null;
    test('一致', () => {
      const result = compare(UNDEFINED0, UNDEFINED00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.UNDEFINED,
          type2: VALUE_TYPE.UNDEFINED,
          value1: UNDEFINED0,
          value2: UNDEFINED00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
        };
      expect(result).toEqual(compareResult);
    });
    test('不一致', () => {
      const result = compare(UNDEFINED0, UNDEFINED_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.UNDEFINED,
          type2: VALUE_TYPE.NULL,
          value1: UNDEFINED0,
          value2: UNDEFINED_VALUE,
          difference: DIFFERENCE_TYPE.TYPE,
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('null', () => {
    const NULL0 = null,
      NULL00 = null,
      NULL_VALUE = undefined;
    test('一致', () => {
      const result = compare(NULL0, NULL00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.NULL,
          type2: VALUE_TYPE.NULL,
          value1: NULL0,
          value2: NULL00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
        };
      expect(result).toEqual(compareResult);
    });
    test('不一致', () => {
      const result = compare(NULL0, NULL_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.NULL,
          type2: VALUE_TYPE.UNDEFINED,
          value1: NULL0,
          value2: NULL_VALUE,
          difference: DIFFERENCE_TYPE.TYPE,
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('string', () => {
    const STRING0 = 'STRING',
      STRING00 = 'STRING',
      STRING_VALUE = 'string';
    test('一致', () => {
      const result = compare(STRING0, STRING00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.STRING,
          type2: VALUE_TYPE.STRING,
          value1: STRING0,
          value2: STRING00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
        };
      expect(result).toEqual(compareResult);
    });
    test('不一致', () => {
      const result = compare(STRING0, STRING_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.STRING,
          type2: VALUE_TYPE.STRING,
          value1: STRING0,
          value2: STRING_VALUE,
          difference: DIFFERENCE_TYPE.VALUE,
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('number', () => {
    const NUMBER0 = 123.456,
      NUMBER00 = 123.456,
      NUMBER_VALUE = 123.45;
    test('一致', () => {
      const result = compare(NUMBER0, NUMBER00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.NUMBER,
          type2: VALUE_TYPE.NUMBER,
          value1: NUMBER0,
          value2: NUMBER00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
        };
      expect(result).toEqual(compareResult);
    });
    test('不一致', () => {
      const result = compare(NUMBER0, NUMBER_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.NUMBER,
          type2: VALUE_TYPE.NUMBER,
          value1: NUMBER0,
          value2: NUMBER_VALUE,
          difference: DIFFERENCE_TYPE.VALUE,
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('boolean', () => {
    const BOOLEAN0 = true,
      BOOLEAN00 = true,
      BOOLEAN_VALUE = false;
    test('一致', () => {
      const result = compare(BOOLEAN0, BOOLEAN00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.BOOLEAN,
          type2: VALUE_TYPE.BOOLEAN,
          value1: BOOLEAN0,
          value2: BOOLEAN00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
        };
      expect(result).toEqual(compareResult);
    });
    test('不一致', () => {
      const result = compare(BOOLEAN0, BOOLEAN_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.BOOLEAN,
          type2: VALUE_TYPE.BOOLEAN,
          value1: BOOLEAN0,
          value2: BOOLEAN_VALUE,
          difference: DIFFERENCE_TYPE.VALUE,
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('date', () => {
    const DATE0 = new Date(2000, 0, 1, 2, 3, 4, 567),
      DATE00 = new Date(2000, 0, 1, 2, 3, 4, 567),
      DATE_VALUE = new Date(2000, 0, 1, 2, 3, 4, 56);
    test('一致', () => {
      const result = compare(DATE0, DATE00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.DATE,
          type2: VALUE_TYPE.DATE,
          value1: DATE0,
          value2: DATE00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
        };
      expect(result).toEqual(compareResult);
    });
    test('不一致', () => {
      const result = compare(DATE0, DATE_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.DATE,
          type2: VALUE_TYPE.DATE,
          value1: DATE0,
          value2: DATE_VALUE,
          difference: DIFFERENCE_TYPE.VALUE,
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('function', () => {
    const FUNCTION0 = () => {},
      FUNCTION00 = FUNCTION0,
      FUNCTION_VALUE = () => {};
    test('一致', () => {
      const result = compare(FUNCTION0, FUNCTION00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.FUNCTION,
          type2: VALUE_TYPE.FUNCTION,
          value1: FUNCTION0,
          value2: FUNCTION00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
        };
      expect(result).toEqual(compareResult);
    });
    test('不一致', () => {
      const result = compare(FUNCTION0, FUNCTION_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.FUNCTION,
          type2: VALUE_TYPE.FUNCTION,
          value1: FUNCTION0,
          value2: FUNCTION_VALUE,
          difference: DIFFERENCE_TYPE.VALUE,
        };
      expect(result).toEqual(compareResult);
    });
  });

  describe('unknown', () => {
    const UNKNOWN0 = new Map(),
      UNKNOWN00 = UNKNOWN0,
      UNKNOWN_VALUE = new Map();
    test('一致', () => {
      const result = compare(UNKNOWN0, UNKNOWN00),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.UNKNOWN,
          type2: VALUE_TYPE.UNKNOWN,
          value1: UNKNOWN0,
          value2: UNKNOWN00,
          difference: DIFFERENCE_TYPE.NO_DIFFERENCE,
        };
      expect(result).toEqual(compareResult);
    });
    test('不一致', () => {
      const result = compare(UNKNOWN0, UNKNOWN_VALUE),
        compareResult: CompareResult = {
          type1: VALUE_TYPE.UNKNOWN,
          type2: VALUE_TYPE.UNKNOWN,
          value1: UNKNOWN0,
          value2: UNKNOWN_VALUE,
          difference: DIFFERENCE_TYPE.VALUE,
        };
      expect(result).toEqual(compareResult);
    });
  });
});
