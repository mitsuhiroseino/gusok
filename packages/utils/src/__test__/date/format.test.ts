import format from 'src/date/format';

describe('format', () => {
  // JST: 1999-01-02T03:40:56.789
  // UTC: 1999-01-01T18:40:56.789Z
  const DATE = new Date(1999, 0, 2, 3, 40, 56, 789);
  // format
  const FORMAT_YMDHMSS = 'yyyy-MM-dd HH:mm:ss.SSS';
  // 1999-01-02T15:40:56.789
  const JST_YMDHMSS = '1999-01-02 03:40:56.789';
  // 1999-01-02T15:40:56.789Z
  const UTC_YMDHMSS = '1999-01-01 18:40:56.789';

  describe('JST', () => {
    test('yyyy-MM-dd HH:mm:ss.SSS', () => {
      const result = format(DATE, { format: FORMAT_YMDHMSS });
      expect(result).toEqual(JST_YMDHMSS);
    });
  });

  describe('UTC', () => {
    test('yyyy-MM-dd HH:mm:ss.SSS', () => {
      const result = format(DATE, { format: FORMAT_YMDHMSS, utc: true });
      expect(result).toEqual(UTC_YMDHMSS);
    });
  });
});
