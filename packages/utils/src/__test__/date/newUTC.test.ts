import newUTC from 'src/date/newUTC';

const YMDHMSS = '1999-11-02T15:40:56.789Z',
  YMDHMS = '1999-11-02T15:40:56.000Z',
  YMDHM = '1999-11-02T15:40:00.000Z',
  YMDH = '1999-11-02T15:00:00.000Z',
  YMD = '1999-11-02T00:00:00.000Z',
  YM = '1999-11-01T00:00:00.000Z',
  Y = '1999-01-01T00:00:00.000Z';

describe('newUTC', () => {
  test('y, M, d, H, m, s, S', () => {
    const result = newUTC(1999, 10, 2, 15, 40, 56, 789);
    expect(result.toISOString()).toEqual(YMDHMSS);
  });
  test('y, M, d, H, m, s', () => {
    const result = newUTC(1999, 10, 2, 15, 40, 56);
    expect(result.toISOString()).toEqual(YMDHMS);
  });
  test('y, M, d, H, m', () => {
    const result = newUTC(1999, 10, 2, 15, 40);
    expect(result.toISOString()).toEqual(YMDHM);
  });
  test('y, M, d, H', () => {
    const result = newUTC(1999, 10, 2, 15);
    expect(result.toISOString()).toEqual(YMDH);
  });
  test('y, M, d', () => {
    const result = newUTC(1999, 10, 2);
    expect(result.toISOString()).toEqual(YMD);
  });
  test('y, M', () => {
    const result = newUTC(1999, 10);
    expect(result.toISOString()).toEqual(YM);
  });
  test('y', () => {
    const result = newUTC(1999);
    expect(result.toISOString()).toEqual(Y);
  });
});
