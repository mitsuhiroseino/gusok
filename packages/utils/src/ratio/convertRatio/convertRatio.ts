import clamp from '../../number/clamp';

/**
 * 開始時の値から終了時の値間の割合を、
 * 最小値から最大値の間の割合に変換する
 * @param minValue 最小値
 * @param maxValue 最大値
 * @param startValue 開始時の値
 * @param endValue 終了時の値
 * @param ratio 開始時の値を0、終了時の値を1としたときの割合
 * @returns 最小値を0、最大値を1としたときの割合
 */
export default function convertRatio(
  minValue: number,
  maxValue: number,
  startValue: number,
  endValue: number,
  ratio: number,
): number {
  // 例:
  // minValue(<)が0、maxValue(>)が10、
  // startValue(#)が3.4、endValue(*)が8.4、
  // ratio(?)が0.4の場合の、
  // minValueからmaxValue間における割合(!)を算出

  //   0    1    2    3    4    5    6    7    8    9    10
  //   <----+----+----+-#--+----+----+----+----+-*--+---->
  //
  const start = clamp(startValue, minValue, maxValue);
  const end = clamp(endValue, minValue, maxValue);

  //   0    1    2    3    4    5    6    7    8    9    10
  //   <----+----+----+-#--+----+----+----+----+-*--+---->
  //   |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  //   この長さを算出
  const rangeDiff = maxValue - minValue;

  //   0    1    2    3    4    5    6    7    8    9    10
  //   <----+----+----+-#--+----+----+----+----+-*--+---->
  //   |================|
  //   rangeDiffに対するminValueからinitialValue(#)までの長さの割合を算出
  const initialValRatio = (start - minValue) / rangeDiff;

  //   0    1    2    3    4    5    6    7    8    9    10
  //   <----+----+----+-#--+----+----+----+----+-*--+---->
  //   |=========================================|
  //   rangeDiffに対するminValueからvalue(*)までの長さの割合を算出
  const valRatio = (end - minValue) / rangeDiff;

  //   0    1    2    3    4    5    6    7    8    9    10
  //   <----+----+----+-#--+----+----+----+----+-*--+---->
  //                    0                        1
  //                    |=========?==============|
  //                    progress(?)はこの範囲を0～1として遷移しているので、
  //   0                                                 1
  //   |==========================!======================|
  //   この範囲を0～1として考えた場合のratio(!)はいくつになるのかを算出
  const result = initialValRatio + (valRatio - initialValRatio) * ratio;

  return result;
}
