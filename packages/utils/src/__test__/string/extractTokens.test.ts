import extractTokens from 'src/string/extractTokens';

describe('extractTokens', () => {
  test('tokenなし', () => {
    const result = extractTokens('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    expect(result).toEqual([]);
  });
  test('tokenあり', () => {
    const result = extractTokens('{{ABC}}DEFG{{HIJ}}KLMNOPQRSTUVW{{XYZ}}');
    expect(result).toEqual(['{{ABC}}', '{{HIJ}}', '{{XYZ}}']);
  });
  test('tokenあり(値のみ)', () => {
    const result = extractTokens('{{ABC}}DEFG{{HIJ}}KLMNOPQRSTUVW{{XYZ}}', true);
    expect(result).toEqual(['ABC', 'HIJ', 'XYZ']);
  });
});
