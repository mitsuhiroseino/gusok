import { FormatType } from '../types';

export type ToDateStringOptions = {
  /**
   * フォーマット
   * デフォルトは`YYYY-MM-DD`
   */
  format?: FormatType;

  /**
   * 空文字、null、undefinedの場合に返す値
   * デフォルトは空文字
   */
  empty?: Date | string;

  /**
   * 数値に変換できない時に返す値
   * デフォルトは空文字
   */
  nonDate?: Date | string;

  /**
   * 入力可能な最小値
   * デフォルトはnew Date(-8640000000000000)
   */
  min?: Date;

  /**
   * 入力可能な最大値
   * デフォルトはnew Date(8640000000000000)
   */
  max?: Date;

  /**
   * 入力中の数値に対する処理
   * trueの場合は、'-'、'.'のみや'1.'などの入力中の状態が許容される
   * デフォルトはfalse
   */
  interactive?: boolean;
};
