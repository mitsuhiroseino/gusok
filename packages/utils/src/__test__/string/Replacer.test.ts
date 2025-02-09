import Replacer from 'src/string/Replacer';

describe('Replacer', () => {
  // 英字全角・半角
  const ALPHABET_WIDTH = {
    A: 'Ａ',
    a: 'ａ',
    B: 'Ｂ',
    b: 'ｂ',
    C: 'Ｃ',
    c: 'ｃ',
    D: 'Ｄ',
    d: 'ｄ',
    E: 'Ｅ',
    e: 'ｅ',
    F: 'Ｆ',
    f: 'ｆ',
    G: 'Ｇ',
    g: 'ｇ',
    H: 'Ｈ',
    h: 'ｈ',
    I: 'Ｉ',
    i: 'ｉ',
    J: 'Ｊ',
    j: 'ｊ',
    K: 'Ｋ',
    k: 'ｋ',
    L: 'Ｌ',
    l: 'ｌ',
    M: 'Ｍ',
    m: 'ｍ',
    N: 'Ｎ',
    n: 'ｎ',
    O: 'Ｏ',
    o: 'ｏ',
    P: 'Ｐ',
    p: 'ｐ',
    Q: 'Ｑ',
    q: 'ｑ',
    R: 'Ｒ',
    r: 'ｒ',
    S: 'Ｓ',
    s: 'ｓ',
    T: 'Ｔ',
    t: 'ｔ',
    U: 'Ｕ',
    u: 'ｕ',
    V: 'Ｖ',
    v: 'ｖ',
    W: 'Ｗ',
    w: 'ｗ',
    X: 'Ｘ',
    x: 'ｘ',
    Y: 'Ｙ',
    y: 'ｙ',
    Z: 'Ｚ',
    z: 'ｚ',
  } as const;
  // 数字全角・半角
  const NUMBER_WIDTH = {
    '0': '０',
    '1': '１',
    '2': '２',
    '3': '３',
    '4': '４',
    '5': '５',
    '6': '６',
    '7': '７',
    '8': '８',
    '9': '９',
  } as const;

  test('default', () => {
    const replacer = new Replacer({
      replacements: [
        { type: 'toWideAlphabet', map: ALPHABET_WIDTH },
        { type: 'toWideNumber', map: NUMBER_WIDTH },
      ],
    });
    const result = replacer.replace('ABC!!!123???');
    expect(result).toBe('ＡＢＣ!!!１２３???');
  });

  test('指定の変換のみ', () => {
    const replacer = new Replacer({
      replacements: [
        { type: 'toWideAlphabet', map: ALPHABET_WIDTH },
        { type: 'toWideNumber', map: NUMBER_WIDTH },
      ],
    });
    const result = replacer.replace('ABC!!!123???', 'toWideNumber');
    expect(result).toBe('ABC!!!１２３???');
  });

  test('後勝ち', () => {
    const replacer = new Replacer({
      replacements: [
        { type: 'toWideAlphabet', map: ALPHABET_WIDTH },
        { type: 'toWideNumber', map: NUMBER_WIDTH },
        {
          type: 'toKanjiNumber',
          map: {
            '0': '〇',
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四',
            '5': '五',
            '6': '六',
            '7': '七',
            '8': '八',
            '9': '九',
          },
        },
      ],
    });
    const result = replacer.replace('ABC!!!123???', ['toWideNumber', 'toKanjiNumber']);
    expect(result).toBe('ABC!!!一二三???');
  });
});
