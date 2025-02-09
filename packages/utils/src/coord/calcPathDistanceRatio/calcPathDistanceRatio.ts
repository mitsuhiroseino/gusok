import { CalcPathDistanceRatioInput, CalcPathDistanceRatioResult } from './types';

/**
 * 各点の全体の距離との比を算出する
 * @param path 距離(distance)の値を持ったオブジェクトの配列
 * @return 各点の全体の距離との比を設定したパス
 */
export default function calcPathDistanceRatio<P extends any = any>(
  path: CalcPathDistanceRatioInput<P>[],
): CalcPathDistanceRatioResult<P>[] {
  if (!path) {
    return [];
  }

  // ratioを算出
  const result: CalcPathDistanceRatioResult<P>[] = [];
  if (path.length === 1) {
    result.push({ ...path[0], ratio: 1 });
  } else {
    const distance = path[path.length - 1].distance;
    for (const point of path) {
      // ここまでの距離 / 全体の距離
      result.push({ ...point, ratio: point.distance / distance });
    }
  }

  return result;
}
