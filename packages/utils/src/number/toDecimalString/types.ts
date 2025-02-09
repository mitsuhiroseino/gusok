export type ToDecimalStringOptions = {
  /**
   * 空文字、null、undefinedの場合に返す値
   * デフォルトは空文字
   */
  empty?: number | string | null;

  /**
   * 数値に変換できない時に返す値
   * デフォルトは空文字
   */
  nan?: number | string | null;

  /**
   * 最小値～最大値に収まっていない時に返す値
   * デフォルトは空文字
   */
  outOfRange?: number | string | null;

  /**
   * 入力可能な最小値
   * デフォルトは制限なし
   */
  min?: number | string;

  /**
   * 入力可能な最大値
   * デフォルトは制限なし
   */
  max?: number | string;

  /**
   * 入力可能な小数点以下の桁数
   * デフォルトは制限なし
   */
  precision?: number;

  /**
   * 下限を下回った時には下限値を返す
   */
  clampToMin?: boolean;

  /**
   * 上限を上回った時には上限値を返す
   */
  clampToMax?: boolean;

  /**
   * 入力中の数値に対する処理
   * trueの場合は、'-'、'.'のみや'1.'などの入力中の状態が許容される
   * デフォルトはfalse
   */
  interactive?: boolean;
};
