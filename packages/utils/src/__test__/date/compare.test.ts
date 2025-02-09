import compare from 'src/date/compare';

describe('compare', () => {
  const DATE0_TIME0 = new Date(2000, 1, 2, 3, 40, 56, 789),
    DATE1_TIME0 = new Date(2000, 2, 2, 3, 40, 56, 789),
    DATE0_TIME1 = new Date(2000, 1, 2, 3, 41, 56, 789);

  describe('default', () => {
    test('value1 < value2', () => {
      const result = compare(DATE0_TIME0, DATE1_TIME0);
      expect(result).toBeLessThan(0);
    });

    test('value1 = value2', () => {
      const result = compare(DATE0_TIME0, DATE0_TIME0);
      expect(result).toBe(0);
    });

    test('value1 > value2', () => {
      const result = compare(DATE1_TIME0, DATE0_TIME0);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('options', () => {
    describe('format', () => {
      test('HHmmss(value1 < value2)', () => {
        const result = compare(DATE0_TIME0, DATE0_TIME1, { format: 'HHmmss' });
        expect(result).toBeLessThan(0);
      });

      test('HHmmss(value1 = value2)', () => {
        const result = compare(DATE0_TIME0, DATE0_TIME0, { format: 'HHmmss' });
        expect(result).toBe(0);
      });

      test('HHmmss(value1 > value2)', () => {
        const result = compare(DATE0_TIME1, DATE0_TIME0, { format: 'HHmmss' });
        expect(result).toBeGreaterThan(0);
      });
    });

    describe('undefinedOrder', () => {
      test('-2', () => {
        const result = compare(undefined as any, DATE0_TIME0, { undefinedOrder: -2 });
        expect(result).toBeLessThan(0);
      });

      test('0', () => {
        const result = compare(undefined as any, DATE0_TIME0, { undefinedOrder: 0 });
        expect(result).toBe(0);
      });

      test('2', () => {
        const result = compare(undefined as any, DATE0_TIME0, { undefinedOrder: 2 });
        expect(result).toBeGreaterThan(0);
      });
    });

    describe('nullOrder', () => {
      test('-1', () => {
        const result = compare(null as any, DATE0_TIME0, { nullOrder: -1 });
        expect(result).toBeLessThan(0);
      });

      test('0', () => {
        const result = compare(null as any, DATE0_TIME0, { nullOrder: 0 });
        expect(result).toBe(0);
      });

      test('1', () => {
        const result = compare(null as any, DATE0_TIME0, { nullOrder: 1 });
        expect(result).toBeGreaterThan(0);
      });
    });
  });
});
