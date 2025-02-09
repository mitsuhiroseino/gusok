/**
 * オプション
 */
export type GetDistance1DOptions = {
  /**
   * 任意の値をgetDistanceに渡す場合に利用できる領域
   */
  extraOptions?: any;

  /**
   * 距離を絶対値で取得
   */
  abs?: boolean;

  /**
   * 距離の精度
   * 未指定の場合は精度の補正なし
   */
  accuracy?: number;

  /**
   * 軸が最小値～最大値の間でループしていることを想定して距離を算出する
   */
  wrap?: boolean;

  /**
   * 軸の下限
   * loop=trueの場合必須
   */
  minValue?: number;

  /**
   * 軸の上限
   * loop=trueの場合必須
   */
  maxValue?: number;
};
