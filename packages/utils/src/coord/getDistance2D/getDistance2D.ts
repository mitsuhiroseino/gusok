import getDiff2D from '../../coord/getDiff2D';
import ensureAccuracy from '../../number/ensureAccuracy';
import { GetDistance2DOptions } from './types';

/**
 * 始点と終点の差を求める
 * @param start 始点
 * @param end 終点
 * @param options オプション
 * @returns 始点と終点の差
 */
export default function getDistance2D(start: any, end: any, options: GetDistance2DOptions = {}) {
  const { accuracy, ...rest } = options,
    diff = getDiff2D(start, end, { ...rest, xKey: 'x', yKey: 'y' }),
    // 三角関数で算出
    distance = Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));

  if (accuracy == null) {
    return distance;
  } else {
    return ensureAccuracy(distance, accuracy);
  }
}
