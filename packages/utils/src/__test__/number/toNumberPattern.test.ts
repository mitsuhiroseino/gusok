import toNumberPattern from 'src/number/toNumberPattern';

describe('toNumberPattern', () => {
  test('##0', () => {
    const result = toNumberPattern('##0');
    expect(result).toEqual({
      decNumLength: 0,
      decPattern: [],
      dp: false,
      intNumLength: 3,
      intPattern: ['0', '#', '#'],
      prefix: undefined,
      suffix: undefined,
      ts: false,
    });
  });
  test('000', () => {
    const result = toNumberPattern('000');
    expect(result).toEqual({
      decNumLength: 0,
      decPattern: [],
      dp: false,
      intNumLength: 3,
      intPattern: ['0', '0', '0'],
      prefix: undefined,
      suffix: undefined,
      ts: false,
    });
  });
  test('###,##0', () => {
    const result = toNumberPattern('###,##0');
    expect(result).toEqual({
      decNumLength: 0,
      decPattern: [],
      dp: false,
      intNumLength: 6,
      intPattern: ['0', '#', '#', ',', '#', '#', '#'],
      prefix: undefined,
      suffix: undefined,
      ts: true,
    });
  });
  test('000,000', () => {
    const result = toNumberPattern('000,000');
    expect(result).toEqual({
      decNumLength: 0,
      decPattern: [],
      dp: false,
      intNumLength: 6,
      intPattern: ['0', '0', '0', ',', '0', '0', '0'],
      prefix: undefined,
      suffix: undefined,
      ts: true,
    });
  });
  test('###,##0.0##', () => {
    const result = toNumberPattern('###,##0.0##');
    expect(result).toEqual({
      decNumLength: 3,
      decPattern: ['0', '#', '#'],
      dp: true,
      intNumLength: 6,
      intPattern: ['0', '#', '#', ',', '#', '#', '#'],
      prefix: undefined,
      suffix: undefined,
      ts: true,
    });
  });
  test('000,000.000', () => {
    const result = toNumberPattern('000,000.000');
    expect(result).toEqual({
      decNumLength: 3,
      decPattern: ['0', '0', '0'],
      dp: true,
      intNumLength: 6,
      intPattern: ['0', '0', '0', ',', '0', '0', '0'],
      prefix: undefined,
      suffix: undefined,
      ts: true,
    });
  });
  test('"△"###,##0.0##', () => {
    const result = toNumberPattern('"△"###,##0.0##');
    expect(result).toEqual({
      decNumLength: 3,
      decPattern: ['0', '#', '#'],
      dp: true,
      intNumLength: 6,
      intPattern: ['0', '#', '#', ',', '#', '#', '#'],
      prefix: '△',
      suffix: undefined,
      ts: true,
    });
  });
  test('###,##0.0##"△"', () => {
    const result = toNumberPattern('###,##0.0##"△"');
    expect(result).toEqual({
      decNumLength: 3,
      decPattern: ['0', '#', '#'],
      dp: true,
      intNumLength: 6,
      intPattern: ['0', '#', '#', ',', '#', '#', '#'],
      prefix: undefined,
      suffix: '△',
      ts: true,
    });
  });
});
