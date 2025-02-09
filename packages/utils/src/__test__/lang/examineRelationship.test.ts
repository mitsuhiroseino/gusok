import examineRelationship, { RELATIONAL_OPERATOR } from 'src/lang/examineRelationship';

describe('examineRelationship', () => {
  describe('0', () => {
    const value = 0;

    test('===', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.EQ });
      expect(result).toBe(true);
    });

    test('!==', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.NE });
      expect(result).toBe(false);
    });

    test('>', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.GT });
      expect(result).toBe(false);
    });

    test('>=', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.GE });
      expect(result).toBe(true);
    });

    test('<', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.LT });
      expect(result).toBe(false);
    });

    test('<=', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.LE });
      expect(result).toBe(true);
    });
  });

  describe('正', () => {
    const value = 1;

    test('===', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.EQ });
      expect(result).toBe(false);
    });

    test('!==', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.NE });
      expect(result).toBe(true);
    });

    test('>', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.GT });
      expect(result).toBe(true);
    });

    test('>=', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.GE });
      expect(result).toBe(true);
    });

    test('<', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.LT });
      expect(result).toBe(false);
    });

    test('<=', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.LE });
      expect(result).toBe(false);
    });
  });

  describe('負', () => {
    const value = -1;

    test('===', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.EQ });
      expect(result).toBe(false);
    });

    test('!==', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.NE });
      expect(result).toBe(true);
    });

    test('>', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.GT });
      expect(result).toBe(false);
    });

    test('>=', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.GE });
      expect(result).toBe(false);
    });

    test('<', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.LT });
      expect(result).toBe(true);
    });

    test('<=', () => {
      const result = examineRelationship(value, { operator: RELATIONAL_OPERATOR.LE });
      expect(result).toBe(true);
    });
  });
});
