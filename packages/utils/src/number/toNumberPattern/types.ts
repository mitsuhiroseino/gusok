/**
 * フォーマットパターン
 */
export type Pattern = (string | [string])[];

/**
 * フォーマットパターン情報
 */
export type PatternInfo = {
  /**
   * 整数部のパターン(逆順)
   */
  intPattern: Pattern;

  /**
   * 整数部の数値のみの桁数
   */
  intNumLength: number;

  /**
   * 小数部のパターン
   */
  decPattern: Pattern;

  /**
   * 小数部の数値のみの桁数
   */
  decNumLength: number;

  /**
   * 小数点有無
   */
  dp: boolean;

  /**
   * 整数部桁区切り有無
   */
  ts: boolean;

  /**
   * 先頭に付ける文字列
   */
  prefix?: string;

  /**
   * 末尾に付ける文字列
   */
  suffix?: string;
};
