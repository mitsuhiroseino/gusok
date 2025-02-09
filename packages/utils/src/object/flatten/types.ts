export type FlattenOptions = {
  /**
   * 出力のキーをパス形式にしない
   */
  noPathKeys?: boolean;

  /**
   * 出力のキーがパス形式の場合の親キーと子キーを区切る文字
   */
  keySeparator?: string;

  /**
   * 配列はフラットにしない
   */
  ignoreArray?: boolean;
};
