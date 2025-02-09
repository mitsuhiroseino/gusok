import parse from 'src/object/parse';

describe('parse', () => {
  const DATE = new Date(1999, 0, 2, 3, 40, 56, 789),
    OBJECT = {
      string: 'あ',
      number: 1,
      boolean: true,
      date: '1999-01-01T18:40:56.789Z',
      array: ['A', 'B', 'C'],
      object: { a: 0, b: 1, c: 2 },
    };
  test('default', () => {
    const result = parse(
      '{"string":"あ","number":1,"boolean":true,"date":"1999-01-01T18:40:56.789Z","array":["A","B","C"],"object":{"a":0,"b":1,"c":2}}',
    );
    expect(result).toEqual(OBJECT);
  });
  test('reviver', () => {
    const result = parse(
      '{"string":"あ","number":1,"boolean":true,"date":"1999-01-01T18:40:56.789Z","array":["A","B","C"],"object":{"a":0,"b":1,"c":2}}',
      { reviver: (key, value) => (key === 'date' ? new Date(value) : value) },
    );
    expect(result).toEqual({ ...OBJECT, date: DATE });
  });
});
