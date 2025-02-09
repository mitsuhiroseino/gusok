import { GetDistance1DOptions } from '../getDistance1D';

/**
 * オプション
 */
export type GetDiff2DOptions = Omit<GetDistance1DOptions, 'wrap' | 'minValue' | 'maxValue'> & {
  /**
   * X軸の値を持つプロパティのキー
   * 未指定の場合は`x`
   */
  xKeys?: string | number | (string | number)[];

  /**
   * X軸が最小値～最大値の間でループしていることを想定して距離を算出する
   */
  xWrap?: boolean;

  /**
   * X軸の下限
   * loopX=trueの場合必須
   */
  xMinValue?: number;

  /**
   * X軸の上限
   * loopX=trueの場合必須
   */
  xMaxValue?: number;

  /**
   * Y軸の値を持つプロパティのキー
   * 未指定の場合は`y`
   */
  yKeys?: string | number | (string | number)[];

  /**
   * Y軸が最小値～最大値の間でループしていることを想定して距離を算出する
   */
  yWrap?: boolean;

  /**
   * Y軸の下限
   * loopY=trueの場合必須
   */
  yMinValue?: number;

  /**
   * Y軸の上限
   * loopY=trueの場合必須
   */
  yMaxValue?: number;

  /**
   * 戻り値でX軸の値を持つプロパティ
   * デフォルトは`x`
   */
  xKey?: string;

  /**
   * 戻り値でY軸の値を持つプロパティ
   * デフォルトは`y`
   */
  yKey?: string;
};
