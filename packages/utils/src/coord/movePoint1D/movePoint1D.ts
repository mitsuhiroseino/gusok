import getDefined from '../../lang/getDefined';
import clamp from '../../number/clamp';
import { MovePoint1DOptions } from './types';

/**
 * 移動後の位置を求める
 * @param point 現在位置
 * @param distance 移動距離
 * @param options オプション
 * @returns 移動後の位置
 */
export default function movePoint1D(point: number, distance: number, options: MovePoint1DOptions = {}) {
  const { minValue, maxValue, ...rest } = options,
    value = point + distance;
  if (minValue == null && maxValue == null) {
    return value;
  } else {
    return clamp(
      value,
      getDefined(minValue, Number.NEGATIVE_INFINITY) as number,
      getDefined(maxValue, Number.POSITIVE_INFINITY) as number,
      rest,
    );
  }
}
