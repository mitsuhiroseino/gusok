import asString from 'src/string/asString';

describe('asString', () => {
  test('文字列', () => {
    const result = asString('Abc');
    expect(result).toBe('Abc');
  });

  test('null', () => {
    const result = asString(null);
    expect(result).toBe('');
  });

  test('undefined', () => {
    const result = asString(undefined);
    expect(result).toBe('');
  });

  test('空文字', () => {
    const result = asString('');
    expect(result).toBe('');
  });

  test('数値', () => {
    const result = asString(123);
    expect(result).toBe('123');
  });

  test('真偽値', () => {
    const result = asString(true);
    expect(result).toBe('true');
  });

  test('日時', () => {
    const result = asString(new Date(1999, 0, 2, 3, 40, 56, 789));
    expect(result).toBe('Sat Jan 02 1999 03:40:56 GMT+0900 (日本標準時)');
  });

  test('オブジェクト', () => {
    const result = asString({});
    expect(result).toBe('[object Object]');
  });

  test('配列', () => {
    const result = asString(['a', 'b', 'c']);
    expect(result).toBe('a,b,c');
  });
});
