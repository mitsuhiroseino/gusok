import getDistance2D from '../getDistance2D';
import { CalcPathDistanceOptions, CalcPathDistanceResult } from './types';

/**
 * pathの起点からの長さを算出する
 * @param path 緯度経度を持ったオブジェクトの配列
 * @return pathに始点からの距離、始点からの距離の全体に占める割合、indexを付与したデータ
 */
export default function calcPathDistance(path: any[], options: CalcPathDistanceOptions = {}): CalcPathDistanceResult[] {
  if (!path) {
    return [];
  }
  const { recalc, getDistance = getDistance2D, ...rest } = options,
    pathLength = path.length;

  // 前の位置及び開始位置から各ポイントまでの距離を算出
  let distance = 0;
  const result: CalcPathDistanceResult[] = [];
  for (let index = 0; index < pathLength; index++) {
    let start = path[index - 1],
      end = path[index],
      distanceDelta = 0;
    if (start) {
      if ('distanceDelta' in end === false || recalc) {
        // 2点間の距離を取得
        distanceDelta = getDistance(start, end, rest);
      } else {
        distanceDelta = end.distanceDelta;
      }
      // 始点からの距離に加算
      distance += distanceDelta;
    }
    result.push({
      ...end,
      distanceDelta,
      distance,
      index,
    });
  }

  return result;
}
