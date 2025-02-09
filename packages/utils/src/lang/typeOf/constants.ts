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

  /**
   * なんでもOK
   * typeOfの戻り値としては使用しない
   */
  ANY: 'any',
} as const;

/**
 * 値なしを表すシンボル
 * オブジェクトのプロパティ等でプロパティ自体が無い事と、値がundefinedの場合を区別する際に使用する値
 */
export const NO_VALUE = Symbol('NO_VALUE');
