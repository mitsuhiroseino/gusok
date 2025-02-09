export type DistinctArrayOptions<I> = {
  /**
   * 重複していることを判定するためのプロパティ
   * 未指定の場合は要素そのもので重複を判定
   */
  idProp?: string | number | ((item: I) => unknown);

  /**
   * 後勝ちの場合はtrue
   */
  overwrite?: boolean;

  /**
   *
   */
  items?: I[];
};
