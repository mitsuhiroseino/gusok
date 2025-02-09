import isValidDate from 'src/date/isValidDate';

describe('isValidDate', () => {
  test('正しい日付', () => {
    const result = isValidDate(new Date());
    expect(result).toBe(true);
  });
  test('不正な日付', () => {
    const result = isValidDate(new Date('2000-22-01T00:00:00Z'));
    expect(result).toBe(false);
  });
  test('日付以外', () => {
    const result = isValidDate('2000-12-01T00:00:00Z');
    expect(result).toBe(false);
  });
});
