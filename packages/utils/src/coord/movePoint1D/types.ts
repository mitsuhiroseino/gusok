import { ClampOptions } from '../../number/clamp';

/**
 * オプション
 */
export type MovePoint1DOptions = ClampOptions & {
  /**
   * 値の下限
   * 未指定の場合は下限なし
   */
  minValue?: number;

  /**
   * 値の上限
   * 未指定の場合は上限なし
   */
  maxValue?: number;
};
