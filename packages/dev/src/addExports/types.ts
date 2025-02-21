import { IsMatchingPathCondition } from '../isMatchingPath';

export type AddExportsOptions = {
  /**
   * package.jsonのパス
   */
  packageJsonPath?: string;

  /**
   * ビルドしたパッケージが置かれたディレクトリの名称
   */
  dist?: string;

  /**
   * indexファイルを作る対象
   * 未指定の場合は下記の条件がデフォルトで適用される
   *
   * - ファイル名が`_`で始まらず拡張子が`.ts`,`.tsx`,`.js`,`.jsx`のもの
   * - ディレクトリ名が`_`で始まらないもの
   */
  include?: IsMatchingPathCondition[];

  /**
   * indexファイルを作る対象から除外するもの
   */
  exclude?: IsMatchingPathCondition[];

  /**
   * お試し
   * ファイルの操作は行わない
   */
  dryRun?: boolean;
};
