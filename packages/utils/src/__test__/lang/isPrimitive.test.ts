import isPrimitive from 'src/lang/isPrimitive';

describe('isPrimitive', () => {
  describe('true', () => {
    test('undefined', () => {
      const value = undefined,
        result = isPrimitive(value);
      expect(result).toBe(true);
    });
    test('null', () => {
      const value = null,
        result = isPrimitive(value);
      expect(result).toBe(true);
    });
    test('string', () => {
      const value = '',
        result = isPrimitive(value);
      expect(result).toBe(true);
    });
    test('number', () => {
      const value = 0,
        result = isPrimitive(value);
      expect(result).toBe(true);
    });
    test('boolean', () => {
      const value = true,
        result = isPrimitive(value);
      expect(result).toBe(true);
    });
    test('BigInt', () => {
      const value = BigInt('100'),
        result = isPrimitive(value);
      expect(result).toBe(true);
    });
    test('Symbol', () => {
      const value = Symbol('abc'),
        result = isPrimitive(value);
      expect(result).toBe(true);
    });
  });
  describe('false', () => {
    test('date', () => {
      const value = new Date(),
        result = isPrimitive(value);
      expect(result).toBe(false);
    });
    test('array', () => {
      const value = [],
        result = isPrimitive(value);
      expect(result).toBe(false);
    });
    test('object', () => {
      const value = {},
        result = isPrimitive(value);
      expect(result).toBe(false);
    });
  });
});
