/**
 * rebuild関数のオプション
 */
export type RebuildOptions = {
  /**
   * 処理対象とするネストの深さ
   * 未指定の場合は末端まで処理
   */
  level?: number;

  /**
   * 再構築の対象に配列を含めない
   */
  excludeArray?: boolean;

  /**
   * 再構築の対象にオブジェクトを含めない
   */
  excludeObject?: boolean;
};
