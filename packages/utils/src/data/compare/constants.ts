/**
 * 不一致種別
 */
export const DIFFERENCE_TYPE = {
  /**
   * 不一致なし
   */
  NO_DIFFERENCE: Symbol('NO_DIFFERENCE'),

  /**
   * 値の不一致
   */
  VALUE: 'value',

  /**
   * 型の不一致
   */
  TYPE: 'type',

  /**
   * 子要素の数不一致
   */
  SIZE: 'size',

  /**
   * 子要素のキー不一致
   */
  KEY: 'key',

  /**
   * 子要素で何かしらの不一致
   */
  CHILDREN: 'children',
} as const;

/**
 * 型種別
 */
export const VALUE_TYPE = {
  /**
   * 値なしの場合の種別
   */
  NO_TYPE: Symbol('NO_TYPE'),

  /**
   * undefined
   */
  UNDEFINED: 'undefined',

  /**
   * null
   */
  NULL: 'null',

  /**
   * 文字列
   */
  STRING: 'string',

  /**
   * 数値
   */
  NUMBER: 'number',

  /**
   * 真偽値
   */
  BOOLEAN: 'boolean',

  /**
   * 日付
   */
  DATE: 'date',

  /**
   * 配列
   */
  ARRAY: 'array',

  /**
   * オブジェクト
   */
  OBJECT: 'object',

  /**
   * 関数
   */
  FUNCTION: 'function',

  /**
   * 不明
   */
  UNKNOWN: 'unknown',
} as const;

/**
 * 値なしを表すシンボル
 */
export const NO_VALUE = Symbol('NO_VALUE');
