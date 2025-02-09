import fromUTC from 'src/date/fromUTC';

const DATE = new Date(1999, 10, 2, 15, 40, 56, 789);

describe('fromUTC', () => {
  test('y, M, d, H, m, s, S', () => {
    // そのまま
    expect(DATE.toISOString()).toEqual('1999-11-02T06:40:56.789Z');
    // UTCの日時をJSTとして扱う
    const result = fromUTC(DATE);
    expect(result.toISOString()).toEqual('1999-11-01T21:40:56.789Z');
  });
});
