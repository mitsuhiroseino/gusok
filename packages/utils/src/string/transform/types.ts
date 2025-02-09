import { ReplacementMap } from '../Replacer';
import { TRANSFORMATION_TYPES } from './constants';

export { ReplacementMap } from '../Replacer';

export type TransformationType = (typeof TRANSFORMATION_TYPES)[keyof typeof TRANSFORMATION_TYPES];

/**
 * transform関数のオプション
 */
export type TransformOptions = {
  /**
   * typeが`toLocaleLowerCase`または`toLocaleUpperCase`の場合に有効
   */
  locales?: string | string[];

  /**
   * nullやundefinedはそのまま返す
   */
  returnNullAsIs?: boolean;

  /**
   * 変換タイプの重複を許可しない。
   * trueを指定した場合は、変換タイプが重複した場合に先に指定したものだけが有効となる
   */
  withoutDuplicates?: boolean;

  /**
   * マップを用いた置換設定
   */
  replacementMap?: ReplacementMap;
};
