import getAnyKey from '../../collection/getAnyKey';
import getDistance1D from '../getDistance1D';
import { GetDiff2DOptions } from './types';

const X_KEY = 'x',
  Y_KEY = 'y';

/**
 * 始点と終点の各座標の差を求める
 * @param start 始点
 * @param end 終点
 * @param options オプション
 * @returns 始点と終点の各座標の差
 */
export default function getDiff2D(start: any, end: any, options: GetDiff2DOptions = {}) {
  const {
      abs,
      xKeys = X_KEY,
      xWrap,
      xMinValue,
      xMaxValue,
      yKeys = Y_KEY,
      yWrap,
      yMinValue,
      yMaxValue,
      xKey = X_KEY,
      yKey = Y_KEY,
      extraOptions,
      ...options1D
    } = options,
    xStartKey = getAnyKey(start, xKeys) || X_KEY,
    xEndKey = getAnyKey(end, xKeys) || X_KEY,
    xDiff = getDistance1D(start[xStartKey], end[xEndKey], {
      wrap: xWrap,
      minValue: xMinValue,
      maxValue: xMaxValue,
      extraOptions: { axis: xKey, ...extraOptions },
      ...options1D,
    }),
    yStartKey = getAnyKey(start, yKeys) || Y_KEY,
    yEndKey = getAnyKey(end, yKeys) || Y_KEY,
    yDiff = getDistance1D(start[yStartKey], end[yEndKey], {
      wrap: yWrap,
      minValue: yMinValue,
      maxValue: yMaxValue,
      extraOptions: { axis: yKey, ...extraOptions },
      ...options1D,
    });

  return abs ? { [xKey]: Math.abs(xDiff), [yKey]: Math.abs(yDiff) } : { [xKey]: xDiff, [yKey]: yDiff };
}
