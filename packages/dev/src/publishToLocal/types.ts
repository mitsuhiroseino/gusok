export type PushToLocalOptions = {
  /**
   * お試し
   * ファイルの操作は行わない
   */
  trial?: boolean;

  /**
   * ローカル用にpackage.jsonを更新したい場合に指定する差分またはpackage.jsonを編集する処理
   */
  editPackageJson?: ((packageJson: { [key: string]: any }) => { [key: string]: any }) | { [key: string]: any };
};
