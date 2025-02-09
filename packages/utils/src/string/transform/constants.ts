import asString from '../asString';
import escapeForRegex from '../escapeForRegex';
import { TransformOptions } from './types';

/**
 * 英字の全角・半角を変換する為のマップ
 */
export const ALPHABET_WIDTH = {
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

/**
 * 数字の全角・半角を変換する為のマップ
 */
export const NUMBER_WIDTH = {
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

/**
 * 記号の全角・半角を変換する為のマップ
 */
export const SIGN_WIDTH = {
  "'": '＇',
  '-': '－',
  '!': '！',
  '"': '＂',
  '#': '＃',
  $: '＄',
  '%': '％',
  '&': '＆',
  '(': '（',
  ')': '）',
  '*': '＊',
  ',': '，',
  '､': '、',
  '.': '．',
  '｡': '。',
  '/': '／',
  ':': '：',
  ';': '；',
  '?': '？',
  '@': '＠',
  '[': '［',
  '\\': '＼',
  ']': '］',
  '^': '＾',
  _: '＿',
  '`': '｀',
  '{': '｛',
  '|': '｜',
  '}': '｝',
  '~': '～',
  '¦': '￤',
  '¯': '￣',
  '¢': '￠',
  '£': '￡',
  '¥': '￥',
  '｢': '「',
  '｣': '」',
  '₩': '￦',
  '+': '＋',
  '<': '＜',
  '=': '＝',
  '>': '＞',
  '￨': '│',
} as const;

/**
 * スペースの全角・半角を変換する為のマップ
 */
export const SPACE_WIDTH = { ' ': '　' } as const;

/**
 * カタカナの半角・全角を変換する為のマップ
 */
export const KANA_WIDTH = {
  ﾞ: '◌゙',
  ﾟ: '◌゚',
  '･': '・',
  ｧ: 'ァ',
  ｱ: 'ア',
  ｨ: 'ィ',
  ｲ: 'イ',
  ｩ: 'ゥ',
  ｳ: 'ウ',
  ｳﾞ: 'ヴ',
  ｪ: 'ェ',
  ｴ: 'エ',
  ｫ: 'ォ',
  ｵ: 'オ',
  ｶ: 'カ',
  ｶﾞ: 'ガ',
  ｷ: 'キ',
  ｷﾞ: 'ギ',
  ｸ: 'ク',
  ｸﾞ: 'グ',
  ｹ: 'ケ',
  ｹﾞ: 'ゲ',
  ｺ: 'コ',
  ｺﾞ: 'ゴ',
  ｻ: 'サ',
  ｻﾞ: 'ザ',
  ｼ: 'シ',
  ｼﾞ: 'ジ',
  ｽ: 'ス',
  ｽﾞ: 'ズ',
  ｾ: 'セ',
  ｾﾞ: 'ゼ',
  ｿ: 'ソ',
  ｿﾞ: 'ゾ',
  ﾀ: 'タ',
  ﾀﾞ: 'ダ',
  ﾁ: 'チ',
  ﾁﾞ: 'ヂ',
  ｯ: 'ッ',
  ﾂ: 'ツ',
  ﾂﾞ: 'ヅ',
  ﾃ: 'テ',
  ﾃﾞ: 'デ',
  ﾄ: 'ト',
  ﾄﾞ: 'ド',
  ﾅ: 'ナ',
  ﾆ: 'ニ',
  ﾇ: 'ヌ',
  ﾈ: 'ネ',
  ﾉ: 'ノ',
  ﾊ: 'ハ',
  ﾊﾞ: 'バ',
  ﾊﾟ: 'パ',
  ﾋ: 'ヒ',
  ﾋﾞ: 'ビ',
  ﾋﾟ: 'ピ',
  ﾌ: 'フ',
  ﾌﾞ: 'ブ',
  ﾌﾟ: 'プ',
  ﾍ: 'ヘ',
  ﾍﾞ: 'ベ',
  ﾍﾟ: 'ペ',
  ﾎ: 'ホ',
  ﾎﾞ: 'ボ',
  ﾎﾟ: 'ポ',
  ﾏ: 'マ',
  ﾐ: 'ミ',
  ﾑ: 'ム',
  ﾒ: 'メ',
  ﾓ: 'モ',
  ｬ: 'ャ',
  ﾔ: 'ヤ',
  ｭ: 'ュ',
  ﾕ: 'ユ',
  ｮ: 'ョ',
  ﾖ: 'ヨ',
  ﾗ: 'ラ',
  ﾘ: 'リ',
  ﾙ: 'ル',
  ﾚ: 'レ',
  ﾛ: 'ロ',
  ﾜ: 'ワ',
  ｦ: 'ヲ',
  ﾝ: 'ン',
  ｰ: 'ー',
} as const;

/**
 * ひらがな・カタカナを変換する為のマップ
 */
export const KANA = {
  ぁ: 'ァ',
  あ: 'ア',
  ぃ: 'ィ',
  い: 'イ',
  ぅ: 'ゥ',
  う: 'ウ',
  ゔ: 'ヴ',
  ぇ: 'ェ',
  え: 'エ',
  ぉ: 'ォ',
  お: 'オ',
  か: 'カ',
  が: 'ガ',
  き: 'キ',
  ぎ: 'ギ',
  く: 'ク',
  ぐ: 'グ',
  け: 'ケ',
  げ: 'ゲ',
  こ: 'コ',
  ご: 'ゴ',
  さ: 'サ',
  ざ: 'ザ',
  し: 'シ',
  じ: 'ジ',
  す: 'ス',
  ず: 'ズ',
  せ: 'セ',
  ぜ: 'ゼ',
  そ: 'ソ',
  ぞ: 'ゾ',
  た: 'タ',
  だ: 'ダ',
  ち: 'チ',
  ぢ: 'ヂ',
  っ: 'ッ',
  つ: 'ツ',
  づ: 'ヅ',
  て: 'テ',
  で: 'デ',
  と: 'ト',
  ど: 'ド',
  な: 'ナ',
  に: 'ニ',
  ぬ: 'ヌ',
  ね: 'ネ',
  の: 'ノ',
  は: 'ハ',
  ば: 'バ',
  ぱ: 'パ',
  ひ: 'ヒ',
  び: 'ビ',
  ぴ: 'ピ',
  ふ: 'フ',
  ぷ: 'ブ',
  ぶ: 'プ',
  へ: 'ヘ',
  べ: 'ベ',
  ぺ: 'ペ',
  ほ: 'ホ',
  ぼ: 'ボ',
  ぽ: 'ポ',
  ま: 'マ',
  み: 'ミ',
  む: 'ム',
  め: 'メ',
  も: 'モ',
  ゃ: 'ャ',
  や: 'ヤ',
  ゅ: 'ュ',
  ゆ: 'ユ',
  ょ: 'ョ',
  よ: 'ヨ',
  ら: 'ラ',
  り: 'リ',
  る: 'ル',
  れ: 'レ',
  ろ: 'ロ',
  ゎ: 'ヮ',
  わ: 'ワ',
  ゐ: 'ヰ',
  ゑ: 'ヱ',
  を: 'ヲ',
  ん: 'ン',
  ゝ: 'ヽ',
  ゞ: 'ヾ',
} as const;

/**
 * 濁音・半濁音と清音を変換する為のマップ
 */
export const KANA_DAKUON = {
  ゔ: 'う',
  が: 'か',
  ぎ: 'き',
  ぐ: 'く',
  げ: 'け',
  ご: 'こ',
  ざ: 'さ',
  じ: 'し',
  ず: 'す',
  ぜ: 'せ',
  ぞ: 'そ',
  だ: 'た',
  ぢ: 'ち',
  づ: 'つ',
  で: 'て',
  ど: 'と',
  ば: 'は',
  ぱ: 'は',
  び: 'ひ',
  ぴ: 'ひ',
  ぷ: 'ふ',
  ぶ: 'ふ',
  べ: 'へ',
  ぺ: 'へ',
  ぼ: 'ほ',
  ぽ: 'ほ',
  ゞ: 'ゝ',
  ヴ: 'ウ',
  ガ: 'カ',
  ギ: 'キ',
  グ: 'ク',
  ゲ: 'ケ',
  ゴ: 'コ',
  ザ: 'サ',
  ジ: 'シ',
  ズ: 'ス',
  ゼ: 'セ',
  ゾ: 'ソ',
  ダ: 'タ',
  ヂ: 'チ',
  ヅ: 'ツ',
  デ: 'テ',
  ド: 'ト',
  バ: 'ハ',
  パ: 'ハ',
  ビ: 'ヒ',
  ピ: 'ヒ',
  ブ: 'フ',
  プ: 'フ',
  ベ: 'ヘ',
  ペ: 'ヘ',
  ボ: 'ホ',
  ポ: 'ホ',
  ヾ: 'ヽ',
} as const;

/**
 * 促音を清音に変換する為のマップ
 */
export const KANA_SOKUON = {
  っ: 'つ',
  ッ: 'ツ',
} as const;

/**
 * 拗音を清音に変換する為のマップ
 */
export const KANA_YOUON = {
  ぁ: 'あ',
  ぃ: 'い',
  ぅ: 'う',
  ぇ: 'え',
  ぉ: 'お',
  ゃ: 'や',
  ゅ: 'ゆ',
  ょ: 'よ',
  ゎ: 'わ',
  ァ: 'ア',
  ィ: 'イ',
  ゥ: 'ウ',
  ェ: 'エ',
  ォ: 'オ',
  ャ: 'ヤ',
  ュ: 'ユ',
  ョ: 'ヨ',
  ヮ: 'ワ',
} as const;

/**
 * 長音を削除する為のマップ
 */
export const OMIT_KANA_CHOUON = {
  ー: '',
} as const;

/**
 * スペースを削除するためのマップ
 */
export const OMIT_SPACE = { ' ': '', '　': '' } as const;

/**
 * 改行をHTMLの<br/>置き換える為のマップ
 */
export const HTML_LINE_FEED = {
  '\r\n': '<br/>',
  '\r': '<br/>',
  '\n': '<br/>',
} as const;

/**
 * HTMLの<br/>を改行(\r\n)に置き換える為のマップ
 */
export const TEXT_LINE_FEED = {
  '<br/>': '\r\n',
} as const;

/**
 * HTML用エスケープの為のマップ
 */
export const HTML = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot',
  "'": '&#39;',
  ' ': '&nbsp;',
} as const;

/**
 * 複数の変換を組み合わせた変換
 */
export const PRESETS = {
  /**
   * 半角に変換
   */
  toHalfWidth: ['toHalfWidthAlphabet', 'toHalfWidthNumber', 'toHalfWidthSign', 'toHalfWidthSpace'],

  /**
   * 全角に変換
   */
  toFullWidth: ['toFullWidthAlphabet', 'toFullWidthNumber', 'toFullWidthSign', 'toFullWidthSpace'],

  /**
   * HTMLの内容をHTMLで表示するための変換
   */
  toHtmlOnHtml: ['escapeForHtml', 'toHtmlLineFeed'],

  /**
   * 文字列をそのままHTMLに表示するための変換
   */
  toTextOnHtml: ['_toEmptyString', 'toHtmlOnHtml'],
};

const ESCAPE_STRING_FROM = /('|\\)/g,
  ESCAPE_STRING_TO = '\\$1';

/**
 * replacerを使わない変換
 */
export const FUNCTIONS = {
  // nullを空文字に変換
  _toEmptyString: (target: string, options: TransformOptions) => {
    return asString(target);
  },
  toLowerCase: (target: string, options: TransformOptions) => {
    return target.toLowerCase();
  },
  toUpperCase: (target: string, options: TransformOptions) => {
    return target.toUpperCase();
  },
  toLocaleLowerCase: (target: string, options: TransformOptions) => {
    return target.toLocaleLowerCase(options.locales);
  },
  toLocaleUpperCase: (target: string, options: TransformOptions) => {
    return target.toLocaleUpperCase(options.locales);
  },
  // 正規表現のリテラル部分を文字列で記述する際に必要なエスケープ。RegExpのコンストラクターに渡せる形式
  escapeForRegex,
  // プログラム内で文字列を記述する際に必要なエスケープ。"'"と"/"に"/"を付与する。
  escapeForString: (target: string, options: TransformOptions) => {
    return target.replace(ESCAPE_STRING_FROM, ESCAPE_STRING_TO);
  },
};

export const TRANSFORMATION_TYPES = {
  // mapによる変換
  TO_FULL_WIDTH_ALPHABET: 'toFullWidthAlphabet',
  TO_HALF_WIDTH_ALPHABET: 'toHalfWidthAlphabet',
  TO_FULL_WIDTH_NUMBER: 'toFullWidthNumber',
  TO_HALF_WIDTH_NUMBER: 'toHalfWidthNumber',
  TO_FULL_WIDTH_SIGN: 'toFullWidthSign',
  TO_HALF_WIDTH_SIGN: 'toHalfWidthSign',
  TO_FULL_WIDTH_SPACE: 'toFullWidthSpace',
  TO_HALF_WIDTH_SPACE: 'toHalfWidthSpace',
  TO_ZENKAKU: 'toZenkaku',
  TO_HANKAKU: 'toHankaku',
  TO_KATAKANA: 'toKatakana',
  TO_HIRAGANA: 'toHiragana',
  TO_WITHOUT_DAKUON: 'toWithoutDakuon',
  TO_WITHOUT_SOKUON: 'toWithoutSokuon',
  TO_WITHOUT_YOUON: 'toWithoutYouon',
  TO_WITHOUT_CHOUON: 'toWithoutChouon',
  TO_WITHOUT_SPACE: 'toWithoutSpace',
  TO_HTML_LINE_FEED: 'toHtmlLineFeed',
  TO_TEXT_LINE_FEED: 'toTextLineFeed',
  ESCAPE_FOR_HTML: 'escapeForHtml',
  UNESCAPE_FROM_HTML: 'unescapeFromHtml',
  // 複数のmapを使った変換
  TO_FULL_WIDTH: 'toFullWidth',
  TO_HALF_WIDTH: 'toHalfWidth',
  TO_HTML_ON_HTML: 'toHtmlOnHtml',
  TO_TEXT_ON_HTML: 'toTextOnHtml',
  // mapを使わない変換
  TO_LOWER_CASE: 'toLowerCase',
  TO_UPPER_CASE: 'toUpperCase',
  TO_LOCALE_LOWER_CASE: 'toLocaleLowerCase',
  TO_LOCALE_UPPER_CASE: 'toLocaleUpperCase',
  ESCAPE_FOR_REGEXP: 'escapeForRegex',
  ESCAPE_FOR_STRING: 'escapeForString',
} as const;

/**
 * 変換用マップ
 */
export const TRANSFORMATIONS = [
  {
    map: ALPHABET_WIDTH,
    type: TRANSFORMATION_TYPES.TO_FULL_WIDTH_ALPHABET,
    reverseType: TRANSFORMATION_TYPES.TO_HALF_WIDTH_ALPHABET,
  },
  {
    map: NUMBER_WIDTH,
    type: TRANSFORMATION_TYPES.TO_FULL_WIDTH_NUMBER,
    reverseType: TRANSFORMATION_TYPES.TO_HALF_WIDTH_NUMBER,
  },
  {
    map: SIGN_WIDTH,
    type: TRANSFORMATION_TYPES.TO_FULL_WIDTH_SIGN,
    reverseType: TRANSFORMATION_TYPES.TO_HALF_WIDTH_SIGN,
  },
  {
    map: SPACE_WIDTH,
    type: TRANSFORMATION_TYPES.TO_FULL_WIDTH_SPACE,
    reverseType: TRANSFORMATION_TYPES.TO_HALF_WIDTH_SPACE,
  },
  { map: KANA_WIDTH, type: TRANSFORMATION_TYPES.TO_ZENKAKU, reverseType: TRANSFORMATION_TYPES.TO_HANKAKU },
  { map: KANA, type: TRANSFORMATION_TYPES.TO_KATAKANA, reverseType: TRANSFORMATION_TYPES.TO_HIRAGANA },
  { map: KANA_DAKUON, type: TRANSFORMATION_TYPES.TO_WITHOUT_DAKUON },
  { map: KANA_SOKUON, type: TRANSFORMATION_TYPES.TO_WITHOUT_SOKUON },
  { map: KANA_YOUON, type: TRANSFORMATION_TYPES.TO_WITHOUT_YOUON },
  { map: OMIT_KANA_CHOUON, type: TRANSFORMATION_TYPES.TO_WITHOUT_CHOUON },
  { map: OMIT_SPACE, type: TRANSFORMATION_TYPES.TO_WITHOUT_SPACE },
  { map: HTML_LINE_FEED, type: TRANSFORMATION_TYPES.TO_HTML_LINE_FEED },
  { map: TEXT_LINE_FEED, type: TRANSFORMATION_TYPES.TO_TEXT_LINE_FEED },
  { map: HTML, type: TRANSFORMATION_TYPES.ESCAPE_FOR_HTML, reverseType: TRANSFORMATION_TYPES.UNESCAPE_FROM_HTML },
];
