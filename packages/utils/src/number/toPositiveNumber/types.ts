/**
 * オプション
 */
export type ToPositiveNumberOptions = {
  /**
   * 負の数だった場合に返す値
   * 未指定の場合はnullを返す
   * `abs`を指定した場合は絶対値を返す
   */
  negativeValue?: number | null | undefined | 'abs';

  /**
   * 値がnull,undefinedだった場合に返す値
   * 未指定の場合はnull,undefinedをそのまま返す
   */
  defaultValue?: number;
};
