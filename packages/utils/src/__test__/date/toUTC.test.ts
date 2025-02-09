import toUTC from 'src/date/toUTC';

const DATE = new Date(1999, 10, 2, 15, 40, 56, 789);

describe('toUTC', () => {
  test('y, M, d, H, m, s, S', () => {
    // そのまま
    expect(DATE.toISOString()).toEqual('1999-11-02T06:40:56.789Z');
    // JSTの日時をUTCとして扱う
    const result = toUTC(DATE);
    expect(result.toISOString()).toEqual('1999-11-02T15:40:56.789Z');
  });
});
