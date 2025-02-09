import isInvalidDate from 'src/date/isInvalidDate';

describe('isInvalidDate', () => {
  test('正しい日付', () => {
    const result = isInvalidDate(new Date());
    expect(result).toBe(false);
  });
  test('不正な日付', () => {
    const result = isInvalidDate(new Date('2000-22-01T00:00:00Z'));
    expect(result).toBe(true);
  });
  test('日付以外', () => {
    const result = isInvalidDate('2000-22-01T00:00:00Z');
    expect(result).toBe(false);
  });
});
