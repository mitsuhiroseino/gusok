import slice from 'lodash/slice';
import getPointByRatio from '../getPointByRatio';
import { GetPathByRatioOptions, GetPathByRatioResult } from './types';

/**
 * 指定のrateまでのpathを返す
 * @param path point(緯度経度を持ったオブジェクト)の配列
 * @param rate 始点からの割合(0～1)
 * @param options オプション
 * @returns 指定のrateまでのpath
 */
export default function getPathByRatio(
  path: any[],
  rate: number,
  options: GetPathByRatioOptions = {},
): GetPathByRatioResult[] {
  const point = getPointByRatio(path, rate, options),
    newPath = slice(path, 0, point.index);
  newPath.push(point);
  return newPath;
}
