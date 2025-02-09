import capitalizeSimply from 'src/string/capitalizeSimply';

describe('capitalizeSimply', () => {
  test('先頭小文字', () => {
    const result = capitalizeSimply('abc');
    expect(result).toBe('Abc');
  });
  test('先頭大文字', () => {
    const result = capitalizeSimply('Abc');
    expect(result).toBe('Abc');
  });
  test('1文字', () => {
    const result = capitalizeSimply('a');
    expect(result).toBe('A');
  });
  test('空文字', () => {
    const result = capitalizeSimply('');
    expect(result).toBe('');
  });
  test('null', () => {
    const result = capitalizeSimply(null as any);
    expect(result).toBe(null);
  });
});
