import toColumnIndex from 'src/spreadsheet/toColumnIndex';

describe('toColumnIndex', () => {
  describe('default', () => {
    test('1桁(最初)', () => {
      const result = toColumnIndex('A');
      expect(result).toBe(1);
    });

    test('1桁', () => {
      const result = toColumnIndex('M');
      expect(result).toBe(13);
    });

    test('1桁(最後)', () => {
      const result = toColumnIndex('Z');
      expect(result).toBe(26);
    });
    test('2桁(最初)', () => {
      const result = toColumnIndex('AA');
      expect(result).toBe(27);
    });

    test('2桁', () => {
      const result = toColumnIndex('NA');
      expect(result).toBe(365);
    });

    test('2桁(最後)', () => {
      const result = toColumnIndex('ZZ');
      expect(result).toBe(702);
    });
    test('3桁(最初)', () => {
      const result = toColumnIndex('AAA');
      expect(result).toBe(703);
    });

    test('3桁', () => {
      const result = toColumnIndex('MIT');
      expect(result).toBe(9042);
    });

    test('3桁(最後)', () => {
      const result = toColumnIndex('ZZZ');
      expect(result).toBe(18278);
    });

    test('不正な値', () => {
      const result = toColumnIndex('');
      expect(result).toBe(null);
    });
  });
  describe('zero-based', () => {
    test('1桁(最初)', () => {
      const result = toColumnIndex('A', true);
      expect(result).toBe(0);
    });

    test('1桁', () => {
      const result = toColumnIndex('M', true);
      expect(result).toBe(12);
    });

    test('1桁(最後)', () => {
      const result = toColumnIndex('Z', true);
      expect(result).toBe(25);
    });
    test('2桁(最初)', () => {
      const result = toColumnIndex('AA', true);
      expect(result).toBe(26);
    });

    test('2桁', () => {
      const result = toColumnIndex('NA', true);
      expect(result).toBe(364);
    });

    test('2桁(最後)', () => {
      const result = toColumnIndex('ZZ', true);
      expect(result).toBe(701);
    });
    test('3桁(最初)', () => {
      const result = toColumnIndex('AAA', true);
      expect(result).toBe(702);
    });

    test('3桁', () => {
      const result = toColumnIndex('MIT', true);
      expect(result).toBe(9041);
    });

    test('3桁(最後)', () => {
      const result = toColumnIndex('ZZZ', true);
      expect(result).toBe(18277);
    });

    test('不正な値', () => {
      const result = toColumnIndex('', true);
      expect(result).toBe(null);
    });
  });
});
