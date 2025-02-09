import replaceWithMap from 'src/string/replaceWithMap';

describe('replaceWithMap', () => {
  test('置換', () => {
    const result = replaceWithMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { ABC: '!!!', M: '?', YZ: '@@' });
    expect(result).toBe('!!!DEFGHIJKL?NOPQRSTUVWX@@');
  });
  test('sourceの文字列が長い方が有効', () => {
    const result = replaceWithMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { B: '_', ABC: '!!!', M: '?', YZ: '@@' });
    expect(result).toBe('!!!DEFGHIJKL?NOPQRSTUVWX@@');
  });
  test('長さが変わる置換', () => {
    const result = replaceWithMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { ABC: '!', M: '???', YZ: '' });
    expect(result).toBe('!DEFGHIJKL???NOPQRSTUVWX');
  });
  test('置換された文字列の置換はしない', () => {
    const result = replaceWithMap('ABCDEFGHIJKLMNOPQRSTUVWXYZ', { ABC: 'MYZ', M: '?', YZ: '@@' });
    expect(result).toBe('MYZDEFGHIJKL?NOPQRSTUVWX@@');
  });
});
