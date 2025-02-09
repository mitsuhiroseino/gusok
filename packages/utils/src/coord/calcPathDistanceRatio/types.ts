/**
 * 入力
 */
export type CalcPathDistanceRatioInput<P extends any = any> = P & {
  /**
   * 前の点からの距離
   */
  distanceDelta: number;

  /**
   * 始点からの距離
   */
  distance: number;
};

/**
 * オプション
 */
export type CalcPathDistanceRatioOptions = {};

/**
 * 結果
 */
export type CalcPathDistanceRatioResult<P extends any = any> = CalcPathDistanceRatioInput<P> & {
  /*
   * 全体の距離に対する、始点から対象の点までの距離の割合(0～1)
   */
  ratio: number;
};
