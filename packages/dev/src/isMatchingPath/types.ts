import { ConditionConfig, ConditionFn } from './_types';

/**
 * 一致条件
 *
 * - string: 指定された文字列がパスに含まれているものに一致する際にtrue
 * - RegExp: 指定された正規表現にパスが一致する際にtrue
 * - ConditionConfig: 条件設定に従って検査し一致したときにtrue
 */
export type IsMatchingPathCondition =
  | string
  | RegExp
  | ConditionConfig
  | ConditionFn;

export type IsMatchingPathOptions = {
  /**
   * ConditionFnに渡すオプション
   */
  conditionOptions?: Record<string, any>;
};
