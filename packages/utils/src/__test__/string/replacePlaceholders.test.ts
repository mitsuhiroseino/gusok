import replacePlaceholders from 'src/string/replacePlaceholders';

describe('replacePlaceholders', () => {
  test('置換(オブジェクト)', () => {
    const result = replacePlaceholders('{{ABC}}DEFGHIJKL{{M}}NOPQRSTUVWX{{YZ}}', { ABC: '!!!', M: '?', YZ: '@@' });
    expect(result).toBe('!!!DEFGHIJKL?NOPQRSTUVWX@@');
  });
  test('置換(配列)', () => {
    const result = replacePlaceholders('{{0}}DEFGHIJKL{{1}}NOPQRSTUVWX{{2}}', ['!!!', '?', '@@']);
    expect(result).toBe('!!!DEFGHIJKL?NOPQRSTUVWX@@');
  });
  test('置換対象がない場合(デフォルト)', () => {
    const result = replacePlaceholders('{{ABC}}DEFGHIJKL{{M}}NOPQRSTUVWX{{YZ}}', { B: '_', M: '?', YZ: '@@' });
    expect(result).toBe('{{ABC}}DEFGHIJKL?NOPQRSTUVWX@@');
  });
  test('置換対象がない場合(プレイスホルダーは削除)', () => {
    const result = replacePlaceholders(
      '{{ABC}}DEFGHIJKL{{M}}NOPQRSTUVWX{{YZ}}',
      { B: '_', M: '?', YZ: '@@' },
      { removePlaceholders: true },
    );
    expect(result).toBe('DEFGHIJKL?NOPQRSTUVWX@@');
  });
  test('任意の括り文字', () => {
    const result = replacePlaceholders(
      '{{ABC}}DEFGHIJKL*[M]*NOPQRSTUVWX*[YZ]*',
      { ABC: '!!!', M: '?', YZ: '@@' },
      { bracket: ['*[', ']*'] },
    );
    expect(result).toBe('{{ABC}}DEFGHIJKL?NOPQRSTUVWX@@');
  });
});
