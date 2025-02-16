export type VerOptions = {
  /**
   * ワークスペースのパッケージjsonのパス
   * デフォルトは`./package.json`
   */
  workspacePackageJsonPath?: string;

  /**
   * パッケージが置かれたディレクトリのパス
   * デフォルトは`./packages`
   */
  packagesPath?: string;
};
