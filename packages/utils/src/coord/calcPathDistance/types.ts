import { GetDistance2DOptions } from '../getDistance2D';

/**
 * オプション
 */
export type CalcPathDistanceOptions = Omit<GetDistance2DOptions, 'getDistance'> & {
  /**
   * 入力にdistanceDeltaが設定されている場合でも、
   * 改めてdistance,distanceDeltaの値を計算する
   */
  recalc?: boolean;

  /**
   * 距離を算出するための関数
   * @param start
   * @param end
   * @returns
   */
  getDistance?: (start: any, end: any, options?: GetDistance2DOptions) => number;
};

/**
 * 結果
 */
export type CalcPathDistanceResult<P extends any = any> = P & {
  /**
   * 前の点からの距離
   */
  distanceDelta: number;

  /**
   * 始点からの距離
   */
  distance: number;

  /**
   * パス内でのindex
   */
  index: number;
};
