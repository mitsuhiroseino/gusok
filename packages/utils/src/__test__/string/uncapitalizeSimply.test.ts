import uncapitalizeSimply from 'src/string/uncapitalizeSimply';

describe('uncapitalizeSimply', () => {
  test('先頭小文字', () => {
    const result = uncapitalizeSimply('abc');
    expect(result).toBe('abc');
  });
  test('先頭大文字', () => {
    const result = uncapitalizeSimply('Abc');
    expect(result).toBe('abc');
  });
  test('1文字', () => {
    const result = uncapitalizeSimply('A');
    expect(result).toBe('a');
  });
  test('空文字', () => {
    const result = uncapitalizeSimply('');
    expect(result).toBe('');
  });
  test('null', () => {
    const result = uncapitalizeSimply(null as any);
    expect(result).toBe(null);
  });
});
