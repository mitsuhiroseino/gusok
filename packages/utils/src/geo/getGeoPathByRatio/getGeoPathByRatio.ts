import slice from 'lodash/slice';
import getGeoPointByRatio from '../getGeoPointByRatio';
import { GetGeoPathByRatioOptions, GetGeoPathByRatioResult } from './types';

/**
 * 指定のratioまでのpathを返す
 * @param path point(緯度経度を持ったオブジェクト)の配列
 * @param ratio 始点からの割合(0～1)
 * @param options オプション
 * @returns 指定のratioまでのpath
 */
export default function getGeoPathByRatio(
  path: any[],
  ratio: number,
  options: GetGeoPathByRatioOptions = {},
): GetGeoPathByRatioResult[] {
  const point = getGeoPointByRatio(path, ratio, options),
    newPath = slice(path, 0, point.index);
  newPath.push(point);
  return newPath;
}
