import * as geolib from 'geolib';
import { GetDistance2DOptions } from '../../coord/getDistance2D';
import getPointByRatio from '../../coord/getPointByRatio';
import { GetGeoPointByRatioOptions, GetGeoPointByRatioResult } from './types';

const GET_DISTANCE = (start: any, end: any, options: GetDistance2DOptions = {}) =>
  geolib.getDistance(start, end, options.accuracy);

/**
 * 経路(位置情報の配列)を基に指定の割合の位置を返す
 * @param path 経路
 * @param ratio 始点からの割合(0～1)
 * @param options オプション
 * @returns 指定の割合に対応する位置
 */
export default function getGeoPointByRatio(
  path: any[],
  ratio: number,
  options: GetGeoPointByRatioOptions = {},
): GetGeoPointByRatioResult {
  const { xKey: keyX = 'lng', yKey: keyY = 'lat', ...rest } = options;

  return getPointByRatio(path, ratio, {
    ...rest,
    xKeys: geolib.longitudeKeys as (string | number)[],
    yKeys: geolib.latitudeKeys as (string | number)[],
    xKey: keyX,
    yKey: keyY,
    getDistance: GET_DISTANCE,
  });
}
