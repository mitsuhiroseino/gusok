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
   * - dirpath: '/'で区切られた親ディレクトリのフルパス
   * - base: 拡張子付きの親ディレクトリ名
   * - name: 拡張子を除いた親ディレクトリ名
   * - ext: '.'を含む親ディレクトリの拡張子。拡張子が無い場合は空文字
   */
  valueType?:
    | 'path'
    | 'base'
    | 'name'
    | 'ext'
    | 'dirpath'
    | 'dirbase'
    | 'dirname'
    | 'dirext';

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
  conditions: string | RegExp | ConditionFn | (string | RegExp | ConditionFn)[];
};

/**
 * カスタム条件関数
 */
export type ConditionFn = (
  values: ConditionValues,
  options?: Record<string, any>,
) => boolean;

/**
 * 検証対象の値
 */
export type ConditionValues = {
  path: string;
  dirpath: string;
  dirbase: string;
  dirname: string;
  dirext: string;
} & ParsedPath;
