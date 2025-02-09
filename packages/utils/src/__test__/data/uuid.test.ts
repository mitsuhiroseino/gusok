import uniq from 'lodash/uniq';
import uuid from 'src/data/uuid';

describe('uuid', () => {
  test('重複', () => {
    const results: string[] = [];
    for (let i = 0; i < 1000000; i++) {
      results.push(uuid());
    }
    expect(results.length).toBe(uniq(results).length);
  });
  describe('options', () => {
    test('prefix', () => {
      const result = uuid({ prefix: 'ABC-' });
      expect(result).toMatch(/^ABC-/);
      expect(result).toHaveLength(20);
    });
    test('suffix', () => {
      const result = uuid({ suffix: '-ABC' });
      expect(result).toMatch(/-ABC$/);
      expect(result).toHaveLength(20);
    });
    test('digitsNumber', () => {
      const result = uuid({ digitsNumber: 8 });
      expect(result).toHaveLength(8);
    });
  });
});
