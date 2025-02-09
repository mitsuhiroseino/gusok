import { StandardizeOptions } from '../../string/standardize';

/**
 * オプション
 */
export type CreateInsensitiveObjectOptions<T extends object> = StandardizeOptions & {
  /**
   * 対象のプロパティを持つオブジェクト
   */
  target?: T;

  /**
   * 継承されたプロパティを管理対象とするか
   *
   * - false: 管理対象とする
   * - true: 管理対象としない
   */
  ownProperty?: boolean;
};
