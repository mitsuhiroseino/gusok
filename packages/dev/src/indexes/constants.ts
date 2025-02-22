import fs from 'fs-extra';
import { IsMatchingPathCondition } from '../isMatchingPath';

/**
 * types.ts
 */
export const TYPES: IsMatchingPathCondition = {
  valueType: 'base',
  entryType: 'file',
  conditions: /^types.ts$/i,
};

/**
 * constants.ts
 */
export const CONSTANTS: IsMatchingPathCondition = {
  valueType: 'base',
  entryType: 'file',
  conditions: /^constants.(ts|tsx)$/i,
};

/**
 * TypeScriptとJavaScript
 */
export const TS_JS: IsMatchingPathCondition = {
  valueType: 'base',
  entryType: 'file',
  conditions: /.+\.(ts|tsx|js|jsx)$/i,
};

/**
 * 配下にindexファイルのあるディレクトリ
 */
export const HAS_INDEX_DIR: IsMatchingPathCondition = {
  entryType: 'dir',
  conditions: (values, { indexRegex }) => {
    const items = fs.readdirSync(values.path);
    for (const item of items) {
      if (indexRegex.test(item)) {
        return true;
      }
    }
    return false;
  },
};

/**
 * テストディレクトリ配下
 */
export const TEST_DIR: IsMatchingPathCondition = {
  valueType: 'path',
  conditions: /.+\/__test__\/.+/i,
};

/**
 * ファイル名またはディレクトリ名が`_`で始まる
 */
export const PRIVATE: IsMatchingPathCondition = {
  valueType: 'base',
  conditions: /^_/,
};

/**
 * 拡張子を除いたファイル名が親ディレクトリ名と同じ
 */
export const MAIN_FILE: IsMatchingPathCondition = {
  entryType: 'file',
  conditions: (values) => {
    return values.name === values.dirbase;
  },
};

/**
 * ツール類の入ったディレクトリ
 */
export const TOOLS_DIR: IsMatchingPathCondition = {
  entryType: 'dir',
  conditions: (values, { children }) => {
    const { base } = values;
    return (
      // 先頭が小文字
      base[0] === base[0].toLowerCase() &&
      // 子要素にディレクトリと同じ名称のファイルが無い
      children?.every((child) => child.split('.')[0] !== base)
    );
  },
};

/**
 * includeのデフォルト値
 */
export const DEFAULT_INCLUDE = [
  // TypeScript,JavaScriptのファイルを対象
  TS_JS,
  // 配下にindex.tsを持つディレクトリを対象
  HAS_INDEX_DIR,
];

/**
 * excludeのデフォルト値
 */
export const DEFAULT_EXCLUDE = [
  // __test__フォルダ配下の全てを除外
  TEST_DIR,
  // ディレクトリ名、ファイル名が_で始まるものを除外
  PRIVATE,
];

/**
 * exportTypeAllのデフォルト値
 */
export const DEFAULT_EXPORT_TYPE_ALL = [TYPES];

/**
 * exportAllのデフォルト値
 */
export const DEFAULT_EXPORT_ALL = [CONSTANTS];

/**
 * exportDefaultのデフォルト値
 */
export const DEFAULT_EXPORT_DEFAULT = [MAIN_FILE];

/**
 * exportAllAsのデフォルト値
 */
export const DEFAULT_EXPORT_ALL_AS = [TOOLS_DIR];
