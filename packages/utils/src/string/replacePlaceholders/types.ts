/**
 * replacePlaceholdersのオプション
 */
export type ReplacePlaceholdersOptions = {
  /**
   * プレイスホルダーを括る文字
   * デフォルトは`{{`,`}}`
   */
  bracket?: [string, string];

  /**
   * 置換対象が存在しなかったプレイスホルダーは削除する
   */
  removePlaceholders?: boolean;

  /**
   * プレイスホルダーに'.'が含まれていてもvalues直下の値で置換する
   */
  flatKeys?: boolean;
};
