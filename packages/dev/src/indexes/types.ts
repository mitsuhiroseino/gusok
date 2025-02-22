import { IsMatchingPathCondition } from '../isMatchingPath';

export type IndexesOptions = {
  /**
   * 処理対象のパス\
   * デフォルトは`src`
   */
  srcPath?: string;

  /**
   * indexのファイル名\
   * デフォルトは`index.ts`
   */
  indexFileName?: string;

  /**
   * indexファイルを作る対象\
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
   * 同じindexファイル内にデフォルトエクスポートがある場合でも名前付きエクスポートをする\
   * デフォルトエクスポートしたモジュールをcjsへ変換したものへアクセスする際に、\
   * defaultという名前付きでアクセスしても問題ない場合はtrue
   */
  includeNamedWithDefault?: boolean;

  /**
   * exportの形式を下記にしたいもの
   *
   * ```
   * export * from './abc';
   * ```
   */
  exportAll?: IsMatchingPathCondition[];

  /**
   * exportの形式を下記にしたいもの
   *
   * ```
   * export * as abc from './abc';
   * ```
   */
  exportAllAs?: IsMatchingPathCondition[];

  /**
   * exportの形式を下記にしたいもの
   *
   * ```
   * export { default } from './abc';
   * ```
   */
  exportDefault?: IsMatchingPathCondition[];

  /**
   * exportの形式を下記にしたいもの
   *
   * ```
   * export { default as abc } from './abc';
   * ```
   */
  exportDefaultAs?: IsMatchingPathCondition[];

  /**
   * exportの形式を下記にしたいもの
   *
   * ```
   * export type * from './abc';
   * ```
   */
  exportTypeAll?: IsMatchingPathCondition[];

  /**
   * お試し\
   * ファイルの操作は行わない
   */
  dryRun?: boolean;
};
