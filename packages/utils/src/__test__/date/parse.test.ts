import newUTC from 'src/date/newUTC';
import parse from 'src/date/parse';

// 1999/01/02 15:40:56.789
const JST_YMDHMSS = new Date(1999, 0, 2, 15, 40, 56, 789),
  JST_YMDHMS = new Date(1999, 0, 2, 15, 40, 56),
  JST_YMDHM = new Date(1999, 0, 2, 15, 40),
  JST_YMDH = new Date(1999, 0, 2, 15),
  JST_YMD = new Date(1999, 0, 2),
  JST_YM = new Date(1999, 0),
  JST_Y = new Date(1999, 0);

// 1999/01/02 15:40:56.789Z
const UTC_YMDHMSS = newUTC(1999, 0, 2, 15, 40, 56, 789),
  UTC_YMDHMS = newUTC(1999, 0, 2, 15, 40, 56),
  UTC_YMDHM = newUTC(1999, 0, 2, 15, 40),
  UTC_YMDH = newUTC(1999, 0, 2, 15),
  UTC_YMD = newUTC(1999, 0, 2),
  UTC_YM = newUTC(1999, 0),
  UTC_Y = newUTC(1999);

describe('parse', () => {
  describe('JST', () => {
    test('yyyy/MM/dd HH:mm:ss.SSS', () => {
      const result = parse('1999/01/02 15:40:56.789');
      expect(result).toEqual(JST_YMDHMSS);
    });
    test('yyyy/MM/dd HH:mm:ss', () => {
      const result = parse('1999/01/02 15:40:56');
      expect(result).toEqual(JST_YMDHMS);
    });
    test('yyyy/MM/dd HH:mm', () => {
      const result = parse('1999/01/02 15:40');
      expect(result).toEqual(JST_YMDHM);
    });
    test('yyyy/MM/dd HH', () => {
      const result = parse('1999/01/02 15');
      expect(result).toEqual(JST_YMDH);
    });
    test('yyyy/MM/dd', () => {
      const result = parse('1999/01/02');
      expect(result).toEqual(JST_YMD);
    });
    test('yyyy/MM', () => {
      const result = parse('1999/01');
      expect(result).toEqual(JST_YM);
    });
    test('yyyy', () => {
      const result = parse('1999');
      expect(result).toEqual(JST_Y);
    });
    test('unmatch', () => {
      const result = parse('1999-01-02 15:40:56.789');
      expect(result).toBe(null);
    });
    test('任意の形式', () => {
      const result = parse('1999年01月02 15時40分56秒789ミリ秒', { formats: 'yyyy年MM月dd HH時mm分ss秒SSSミリ秒' });
      expect(result).toEqual(JST_YMDHMSS);
    });
    test('数値', () => {
      const result = parse(JST_YMDHMSS.getTime());
      expect(result).toEqual(JST_YMDHMSS);
    });
    test('日付', () => {
      const result = parse(new Date(JST_YMDHMSS));
      expect(result).toEqual(JST_YMDHMSS);
    });
  });

  describe('UTC', () => {
    test('yyyy/MM/dd HH:mm:ss.SSS', () => {
      const result = parse('1999/01/02 15:40:56.789', { utc: true });
      expect(result).toEqual(UTC_YMDHMSS);
    });
    test('yyyy/MM/dd HH:mm:ss', () => {
      const result = parse('1999/01/02 15:40:56', { utc: true });
      expect(result).toEqual(UTC_YMDHMS);
    });
    test('yyyy/MM/dd HH:mm', () => {
      const result = parse('1999/01/02 15:40', { utc: true });
      expect(result).toEqual(UTC_YMDHM);
    });
    test('yyyy/MM/dd HH', () => {
      const result = parse('1999/01/02 15', { utc: true });
      expect(result).toEqual(UTC_YMDH);
    });
    test('yyyy/MM/dd', () => {
      const result = parse('1999/01/02', { utc: true });
      expect(result).toEqual(UTC_YMD);
    });
    test('yyyy/MM', () => {
      const result = parse('1999/01', { utc: true });
      expect(result).toEqual(UTC_YM);
    });
    test('yyyy', () => {
      const result = parse('1999', { utc: true });
      expect(result).toEqual(UTC_Y);
    });
    test('unmatch', () => {
      const result = parse('1999-01-02 15:40:56.789', { utc: true });
      expect(result).toBe(null);
    });
    test('任意の形式', () => {
      const result = parse('1999年01月02 15時40分56秒789ミリ秒', {
        formats: 'yyyy年MM月dd HH時mm分ss秒SSSミリ秒',
        utc: true,
      });
      expect(result).toEqual(UTC_YMDHMSS);
    });
    test('数値', () => {
      const result = parse(UTC_YMDHMSS.getTime(), { utc: true });
      expect(result).toEqual(UTC_YMDHMSS);
    });
    test('日付', () => {
      const result = parse(new Date(UTC_YMDHMSS), { utc: true });
      expect(result).toEqual(UTC_YMDHMSS);
    });
  });
});
