export type GetRollupConfigOptions = {
  /**
   * 出力形式
   */
  format?: 'cjs' | 'es';

  /**
   * ビルド対象の拡張子
   */
  extentions?: string[];

  /**
   * ビルド除外ファイル・ディレクトリパターン
   */
  exclude?: RegExp[];

  /**
   * 型定義ファイルの出力
   */
  declaration?: boolean;

  /**
   * ソースマップの出力
   */
  sourceMap?: boolean;

  /**
   * 出力ファイルの拡張子
   */
  outputExtention?: string;

  /**
   * ツリーシェイキングの有無
   */
  treeshake?: boolean;

  /**
   * babel設定ファイルのパス
   */
  babelConfigPath?: string;

  /**
   * typescript設定ファイルのパス
   */
  tsConfigPath?: string;
};
