import transform from 'src/string/transform';

describe('transform', () => {
  test('toLowerCase', () => {
    const result = transform(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
      'toLowerCase',
    );
    expect(result).toBe('abcdefghijklmnopqrstuvwxyzａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ');
  });

  test('toUpperCase', () => {
    const result = transform(
      'abcdefghijklmnopqrstuvwxyzａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
      'toUpperCase',
    );
    expect(result).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ');
  });

  test('toLocaleLowerCase', () => {
    const result = transform(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
      'toLocaleLowerCase',
      { locales: 'TR' },
    );
    expect(result).toBe('abcdefghıjklmnopqrstuvwxyzａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ');
  });

  test('toLocaleUpperCase', () => {
    const result = transform(
      'abcdefghijklmnopqrstuvwxyzａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
      'toLocaleUpperCase',
      { locales: 'TR' },
    );
    expect(result).toBe('ABCDEFGHİJKLMNOPQRSTUVWXYZＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ');
  });

  test('toFullWidthAlphabet', () => {
    const result = transform('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 'toFullWidthAlphabet');
    expect(result).toBe(
      'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
    );
  });

  test('toHalfWidthAlphabet', () => {
    const result = transform(
      'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
      'toHalfWidthAlphabet',
    );
    expect(result).toBe('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  });

  test('toFullWidthNumber', () => {
    const result = transform('0123456789', 'toFullWidthNumber');
    expect(result).toBe('０１２３４５６７８９');
  });

  test('toHalfWidthNumber', () => {
    const result = transform('０１２３４５６７８９', 'toHalfWidthNumber');
    expect(result).toBe('0123456789');
  });

  test('toFullWidthSign', () => {
    const result = transform('\'-!"#$%&()*,､.｡/:;?@[\\]^_`{|}~¦¯¢£¥｢｣₩+<=>￨', 'toFullWidthSign');
    expect(result).toBe('＇－！＂＃＄％＆（）＊，、．。／：；？＠［＼］＾＿｀｛｜｝～￤￣￠￡￥「」￦＋＜＝＞│');
  });

  test('toHalfWidthSign', () => {
    const result = transform(
      '＇－！＂＃＄％＆（）＊，、．。／：；？＠［＼］＾＿｀｛｜｝～￤￣￠￡￥「」￦＋＜＝＞│',
      'toHalfWidthSign',
    );
    expect(result).toBe('\'-!"#$%&()*,､.｡/:;?@[\\]^_`{|}~¦¯¢£¥｢｣₩+<=>￨');
  });

  test('toFullWidthSpace', () => {
    const result = transform(' ', 'toFullWidthSpace');
    expect(result).toBe('　');
  });

  test('toHalfWidthSpace', () => {
    const result = transform('　', 'toHalfWidthSpace');
    expect(result).toBe(' ');
  });

  test('toZenkaku', () => {
    const result = transform(
      'ﾞﾟ･ｧｱｨｲｩｳｳﾞｪｴｫｵｶｶﾞｷｷﾞｸｸﾞｹｹﾞｺｺﾞｻｻﾞｼｼﾞｽｽﾞｾｾﾞｿｿﾞﾀﾀﾞﾁﾁﾞｯﾂﾂﾞﾃﾃﾞﾄﾄﾞﾅﾆﾇﾈﾉﾊﾊﾞﾊﾟﾋﾋﾞﾋﾟﾌﾌﾞﾌﾟﾍﾍﾞﾍﾟﾎﾎﾞﾎﾟﾏﾐﾑﾒﾓｬﾔｭﾕｮﾖﾗﾘﾙﾚﾛﾜｦﾝｰ',
      'toZenkaku',
    );
    expect(result).toBe(
      '◌゙◌゚・ァアィイゥウヴェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロワヲンー',
    );
  });

  test('toHankaku', () => {
    const result = transform(
      '◌゙◌゚・ァアィイゥウヴェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロワヲンー',
      'toHankaku',
    );
    expect(result).toBe(
      'ﾞﾟ･ｧｱｨｲｩｳｳﾞｪｴｫｵｶｶﾞｷｷﾞｸｸﾞｹｹﾞｺｺﾞｻｻﾞｼｼﾞｽｽﾞｾｾﾞｿｿﾞﾀﾀﾞﾁﾁﾞｯﾂﾂﾞﾃﾃﾞﾄﾄﾞﾅﾆﾇﾈﾉﾊﾊﾞﾊﾟﾋﾋﾞﾋﾟﾌﾌﾞﾌﾟﾍﾍﾞﾍﾟﾎﾎﾞﾎﾟﾏﾐﾑﾒﾓｬﾔｭﾕｮﾖﾗﾘﾙﾚﾛﾜｦﾝｰ',
    );
  });

  test('toHiragana', () => {
    const result = transform(
      'ァアィイゥウヴェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヽヾ',
      'toHiragana',
    );
    expect(result).toBe(
      'ぁあぃいぅうゔぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぷぶへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゝゞ',
    );
  });

  test('toKatakana', () => {
    const result = transform(
      'ぁあぃいぅうゔぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぷぶへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゝゞ',
      'toKatakana',
    );
    expect(result).toBe(
      'ァアィイゥウヴェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヽヾ',
    );
  });

  test('toWithoutDakuon', () => {
    const result = transform(
      'ゔがぎぐげござじずぜぞだぢづでどばぱびぴぷぶべぺぼぽゞヴガギグゲゴザジズゼゾダヂヅデドバパビピブプベペボポヾ',
      'toWithoutDakuon',
    );
    expect(result).toBe(
      'うかきくけこさしすせそたちつてとははひひふふへへほほゝウカキクケコサシスセソタチツテトハハヒヒフフヘヘホホヽ',
    );
  });

  test('toWithoutSokuon', () => {
    const result = transform('っッ', 'toWithoutSokuon');
    expect(result).toBe('つツ');
  });

  test('toWithoutYouon', () => {
    const result = transform('ぁぃぅぇぉゃゅょゎァィゥェォャュョヮ', 'toWithoutYouon');
    expect(result).toBe('あいうえおやゆよわアイウエオヤユヨワ');
  });

  test('toWithoutChouon', () => {
    const result = transform('あーいーうーえーおー', 'toWithoutChouon');
    expect(result).toBe('あいうえお');
  });

  test('toWithoutSpace', () => {
    const result = transform('あ い　う え　お ', 'toWithoutSpace');
    expect(result).toBe('あいうえお');
  });

  test('toHtmlLineFeed', () => {
    const result = transform('1行目\r2行目\r\n3行目\n4行目', 'toHtmlLineFeed');
    expect(result).toBe('1行目<br/>2行目<br/>3行目<br/>4行目');
  });

  test('toTextLineFeed', () => {
    const result = transform('1行目<br/>2行目<br/>3行目<br/>4行目', 'toTextLineFeed');
    expect(result).toBe('1行目\r\n2行目\r\n3行目\r\n4行目');
  });

  test('escapeForHtml', () => {
    const result = transform('<div>"A" & \'B\'</div>', 'escapeForHtml');
    expect(result).toBe('&lt;div&gt;&quotA&quot&nbsp;&amp;&nbsp;&#39;B&#39;&lt;/div&gt;');
  });

  test('unescapeFromHtml', () => {
    const result = transform('&lt;div&gt;&quotA&quot&nbsp;&amp;&nbsp;&#39;B&#39;&lt;/div&gt;', 'unescapeFromHtml');
    expect(result).toBe('<div>"A" & \'B\'</div>');
  });

  test('toFullWidth', () => {
    const result = transform('Abc100 & Def200;', 'toFullWidth');
    expect(result).toBe('Ａｂｃ１００　＆　Ｄｅｆ２００；');
  });

  test('toHalfWidth', () => {
    const result = transform('Ａｂｃ１００　＆　Ｄｅｆ２００；', 'toHalfWidth');
    expect(result).toBe('Abc100 & Def200;');
  });

  test('toHtmlOnHtml', () => {
    const result = transform('<div>1行目\r2行目\r\n3行目\n4行目</div>', 'toHtmlOnHtml');
    expect(result).toBe('&lt;div&gt;1行目<br/>2行目<br/>3行目<br/>4行目&lt;/div&gt;');
  });

  test('toTextOnHtml', () => {
    const result = transform('  Abc  Def\r\nGhi  Jkl  ', 'toTextOnHtml');
    expect(result).toBe('&nbsp;&nbsp;Abc&nbsp;&nbsp;Def<br/>Ghi&nbsp;&nbsp;Jkl&nbsp;&nbsp;');
  });

  test('toTextOnHtml (値がnull)', () => {
    const result = transform(null as any, 'toTextOnHtml');
    expect(result).toBe('');
  });

  test('escapeForRegex', () => {
    const result = ['A-B', 'A.B', 'A*B', 'A+B', 'A?B', 'A^B', 'A$B', '{AB}', '(AB)', 'A|B', '[AB]', 'A/B', 'A\\B']
      .map((str) => transform(str, 'escapeForRegex'))
      .join('|');
    expect(new RegExp(`(${result})`)).toEqual(
      /(A\-B|A\.B|A\*B|A\+B|A\?B|A\^B|A\$B|\{AB\}|\(AB\)|A\|B|\[AB\]|A\/B|A\\B)/,
    );
  });

  test('escapeForString', () => {
    const result = transform("'Abc\\Def'", 'escapeForString');
    expect(result).toBe("\\'Abc\\\\Def\\'");
  });

  test('toHalfWidth & toUpperCase & toKatakana', () => {
    const result = transform('答えはＡｂｃ１００　＆　Ｄｅｆ２００；', ['toHalfWidth', 'toUpperCase', 'toKatakana']);
    expect(result).toBe('答エハABC100 & DEF200;');
  });

  test('replacementMap', () => {
    const result = transform('答えはＡｂｃ１００　＆　Ｄｅｆ２００；', 'toHalfWidth', {
      replacementMap: { '０': '零', '１': '壱', '２': '弐' },
    });
    expect(result).toBe('答えはAbc壱零零 & Def弐零零;');
    // キャッシュが使用されている(と思われる)ことの確認
    const result2 = transform('答えはＡｂｃ１００　＆　Ｄｅｆ２００；', 'toHalfWidth', {
      replacementMap: { '０': '零', '１': '壱', '２': '弐' },
    });
    expect(result2).toBe('答えはAbc壱零零 & Def弐零零;');
    // キャッシュが使用されないことの確認
    const result3 = transform('答えはＡｂｃ１００　＆　Ｄｅｆ２００；', 'toHalfWidth', {
      replacementMap: { '０': '〇', '１': '一', '２': '二' },
    });
    expect(result3).toBe('答えはAbc一〇〇 & Def二〇〇;');
    // replacementMapのみ
    const result4 = transform('答えはＡｂｃ１００　＆　Ｄｅｆ２００；', null, {
      replacementMap: { '０': '〇', '１': '一', '２': '二' },
    });
    expect(result4).toBe('答えはＡｂｃ一〇〇　＆　Ｄｅｆ二〇〇；');
  });
});
