import toColumnId from 'src/spreadsheet/toColumnId';

describe('toColumnId', () => {
  describe('default', () => {
    test('1桁(最初)', () => {
      const result = toColumnId(1);
      expect(result).toBe('A');
    });

    test('1桁', () => {
      const result = toColumnId(13);
      expect(result).toBe('M');
    });

    test('1桁(最後)', () => {
      const result = toColumnId(26);
      expect(result).toBe('Z');
    });

    test('2桁(最初)', () => {
      const result = toColumnId(27);
      expect(result).toBe('AA');
    });

    test('2桁', () => {
      const result = toColumnId(365);
      expect(result).toBe('NA');
    });

    test('2桁(最後)', () => {
      const result = toColumnId(702);
      expect(result).toBe('ZZ');
    });

    test('3桁(最初)', () => {
      const result = toColumnId(703);
      expect(result).toBe('AAA');
    });

    test('3桁', () => {
      const result = toColumnId(9042);
      expect(result).toBe('MIT');
    });

    test('3桁(最後)', () => {
      const result = toColumnId(18278);
      expect(result).toBe('ZZZ');
    });

    test('不正な値', () => {
      const result = toColumnId(0);
      expect(result).toBe(null);
    });
  });
  describe('zero-based', () => {
    test('1桁(最初)', () => {
      const result = toColumnId(0, true);
      expect(result).toBe('A');
    });

    test('1桁', () => {
      const result = toColumnId(12, true);
      expect(result).toBe('M');
    });

    test('1桁(最後)', () => {
      const result = toColumnId(25, true);
      expect(result).toBe('Z');
    });

    test('2桁(最初)', () => {
      const result = toColumnId(26, true);
      expect(result).toBe('AA');
    });

    test('2桁', () => {
      const result = toColumnId(364, true);
      expect(result).toBe('NA');
    });

    test('2桁(最後)', () => {
      const result = toColumnId(701, true);
      expect(result).toBe('ZZ');
    });

    test('3桁(最初)', () => {
      const result = toColumnId(702, true);
      expect(result).toBe('AAA');
    });

    test('3桁', () => {
      const result = toColumnId(9041, true);
      expect(result).toBe('MIT');
    });

    test('3桁(最後)', () => {
      const result = toColumnId(18277, true);
      expect(result).toBe('ZZZ');
    });

    test('不正な値', () => {
      const result = toColumnId(-1, true);
      expect(result).toBe(null);
    });
  });
});
