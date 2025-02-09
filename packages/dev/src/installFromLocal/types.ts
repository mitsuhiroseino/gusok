export type InstallFromLocalOptions = {
  /**
   * package.jsonのパス
   * デフォルトは`./package.json`
   */
  packageJsonPath?: string;

  /**
   * node_modulesのパス
   * デフォルトは`./node_modules`
   */
  nodeModulesPath?: string;

  /**
   * お試し
   * ファイルの操作は行わない
   */
  trial?: boolean;
};
