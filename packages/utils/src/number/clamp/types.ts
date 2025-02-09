import { CLAMP_MODE } from './constants';

/**
 * 値が範囲を超えた時の制限方法
 */
export type ClampMode = (typeof CLAMP_MODE)[keyof typeof CLAMP_MODE];

export type ClampOptions = {
  /**
   * 値が最小値を下回っている場合の動作
   * デフォルトは`auto`
   *
   * - min: 最小値を返す
   * - max: 最大値を返す
   * - wrap: 値が一周しているというあつかいで算出した値を返す
   * - fold: 最小値と最大値の間を往復する形で算出た値を返す
   * - default: デフォルト値(未指定の場合は0)を返す
   * - auto: minと同じ動作
   */
  minClampMode?: ClampMode;

  /**
   * 値が最大値を超えている場合の動作
   * デフォルトは`auto`
   *
   * - min: 最小値を返す
   * - max: 最大値を返す
   * - wrap: 値が一周しているというあつかいで算出した値を返す
   * - fold: 最小値と最大値の間を往復する形で算出た値を返す
   * - default: デフォルト値(未指定の場合は0)を返す
   * - auto: maxと同じ動作
   */
  maxClampMode?: ClampMode;

  /**
   * デフォルト値
   */
  defaultValue?: number;
};
