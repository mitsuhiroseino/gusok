import createExtractTokens from 'src/string/createExtractTokens';

describe('createExtractTokens', () => {
  test('prefix="{{", suffix="}}"', () => {
    const extractTokensCustom = createExtractTokens(['{{', '}}']);
    const result = extractTokensCustom('{{ABC}}DEFG{{HIJ}}KL{MNO}PQRSTUVW{{XYZ}}', true);
    expect(result).toEqual(['ABC', 'HIJ', 'XYZ']);
  });
  test('prefix="${", suffix="}"', () => {
    const extractTokensCustom = createExtractTokens(['${', '}']);
    const result = extractTokensCustom('${ABC}DEFG${HIJ}KL{MNO}PQRSTUVW${XYZ}', true);
    expect(result).toEqual(['ABC', 'HIJ', 'XYZ']);
  });
  test('prefix="[", suffix="]"', () => {
    const extractTokensCustom = createExtractTokens(['[', ']']);
    const result = extractTokensCustom('[ABC]DEFG[HIJ]KLMNOPQRSTUVW[XYZ]', true);
    expect(result).toEqual(['ABC', 'HIJ', 'XYZ']);
  });
  test('prefix="|", suffix="|"', () => {
    const extractTokensCustom = createExtractTokens('|');
    const result = extractTokensCustom('|ABC|DEFG|HIJ|KLMNOPQRSTUVW|XYZ|', true);
    expect(result).toEqual(['ABC', 'HIJ', 'XYZ']);
  });
  test('prefix="★", suffix="★"', () => {
    const extractTokensCustom = createExtractTokens('★');
    const result = extractTokensCustom('★ABC★DEFG★HIJ★KLMNOPQRSTUVW★XYZ★', true);
    expect(result).toEqual(['ABC', 'HIJ', 'XYZ']);
  });
});
