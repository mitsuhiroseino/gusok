import format from 'src/object/format';

describe('format', () => {
  const DATE = new Date(1999, 0, 2, 3, 40, 56, 789),
    OBJECT = {
      string: 'あ',
      number: 1,
      boolean: true,
      date: DATE,
      array: ['A', 'B', 'C'],
      object: { a: 0, b: 1, c: 2 },
    };
  test('default', () => {
    const result = format(OBJECT);
    expect(result).toBe(
      '{"string":"あ","number":1,"boolean":true,"date":"1999-01-01T18:40:56.789Z","array":["A","B","C"],"object":{"a":0,"b":1,"c":2}}',
    );
  });
  test('replacer', () => {
    const result = format(OBJECT, {
      replacer: (key, value) => (key === 'date' ? value.substr(0, value.length - 1) : value),
    });
    expect(result).toBe(
      '{"string":"あ","number":1,"boolean":true,"date":"1999-01-01T18:40:56.789","array":["A","B","C"],"object":{"a":0,"b":1,"c":2}}',
    );
  });
  test('space', () => {
    const result = format(OBJECT, { space: 4 });
    expect(result).toBe(`{
    "string": "あ",
    "number": 1,
    "boolean": true,
    "date": "1999-01-01T18:40:56.789Z",
    "array": [
        "A",
        "B",
        "C"
    ],
    "object": {
        "a": 0,
        "b": 1,
        "c": 2
    }
}`);
  });
});
