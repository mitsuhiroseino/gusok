import { DIFFERENCE_TYPE, VALUE_TYPE } from './constants';

/**
 * 不一致種別
 */
export type DifferenceType = (typeof DIFFERENCE_TYPE)[keyof typeof DIFFERENCE_TYPE];

/**
 * 型種別
 */
export type ValueType = (typeof VALUE_TYPE)[keyof typeof VALUE_TYPE];

/**
 * 比較結果
 */
export type CompareResult = {
  /**
   * キー
   */
  key?: string | number;

  /**
   * 比較対象1
   */
  value1?: unknown;

  /**
   * 比較対象1の型
   */
  type1?: ValueType | null;

  /**
   * 比較対象2
   */
  value2?: unknown;

  /**
   * 比較対象2の型
   */
  type2?: ValueType | null;

  /**
   * 子要素の比較結果(配列、オブジェクトの場合のみ)
   */
  children?: CompareResult[];

  /**
   * 不一致種別
   */
  difference?: DifferenceType | null;
};
