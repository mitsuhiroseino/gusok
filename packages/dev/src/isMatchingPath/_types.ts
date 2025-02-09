import { ParsedPath } from 'path';

/**
 * 条件設定
 */
export type ConditionConfig = {
  /**
   * 検査対象の値
   *
   * - path: '/'で区切られたフルパス
   * - base: 拡張子付きのディレクトリ名 or ファイル名
   * - name: 拡張子を除いたディレクトリ名 or ファイル名
   * - ext: '.'を含む拡張子。拡張子が無い場合は空文字
   */
  valueType?: 'path' | 'base' | 'name' | 'ext';

  /**
   * 検査対象の種別
   *
   * - dir: ディレクトリ
   * - file: ファイル
   * - both: ディレクトリ & ファイル
   */
  entryType?: 'dir' | 'file' | 'both';

  /**
   * 一致条件
   * 配列で指定した場合はand条件とする
   *
   * - string: 指定された文字列を含むものに一致
   * - RegExp: 指定された正規表現に一致
   */
  conditions: string | RegExp | (string | RegExp)[];
};

/**
 * カスタム条件関数
 */
export type ConditionFn = (values: ConditionValues) => boolean;

/**
 * 検証対象の値
 */
export type ConditionValues = { path: string } & ParsedPath;
