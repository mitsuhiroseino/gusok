import clamp, { CLAMP_MODE, ClampOptions } from '../../number/clamp';
import ensureAccuracy from '../../number/ensureAccuracy';
import getValidMinMax from '../../number/getValidMinMax';
import { GetDistance1DOptions } from './types';

/**
 * 1次元軸上の始点から終点の距離を求める
 * @param start 始点
 * @param end 終点
 * @param options オプション
 * @returns 始点から終点の距離
 */
export default function getDistance1D(start: number, end: number, options: GetDistance1DOptions = {}) {
  const { abs, wrap, minValue, maxValue, accuracy } = options;

  let distance;
  if (wrap && minValue != null && maxValue != null) {
    // ループした領域での距離を求める
    const [min, max] = getValidMinMax(minValue, maxValue);
    distance = _getLoopedDistance(start, end, min, max);
  } else {
    // 単純な距離を求める
    distance = end - start;
  }

  if (accuracy != null) {
    // 精度の補正
    distance = ensureAccuracy(distance, accuracy);
  }

  // 絶対値の場合は正の数を返す
  return abs ? Math.abs(distance) : distance;
}

/**
 * 最大値と最小値がつながった軸を踏まえた距離計算する
 * @param start 始点
 * @param end 終点
 * @param min 最小値
 * @param max 最大値
 * @returns 始点から終点の距離
 */
function _getLoopedDistance(start: number, end: number, min: number, max: number) {
  const clampOptions: ClampOptions = { minClampMode: CLAMP_MODE.WRAP, maxClampMode: CLAMP_MODE.WRAP },
    startValue = clamp(start, min, max, clampOptions),
    endValue = clamp(end, min, max, clampOptions),
    diff = endValue - startValue,
    diffAbs = Math.abs(diff),
    range = Math.abs(max - min);

  let distance, isNegative;
  if (diffAbs <= range / 2) {
    // 正順の方が近い
    distance = diffAbs;
    // 正順の場合は単純なto - fromがマイナスの場合にマイナス
    isNegative = diff < 0;
  } else {
    // 逆順の方が近い
    distance = range - diffAbs;
    // 逆順の場合は単純なto - fromがプラスの場合にマイナス
    isNegative = diff > 0;
  }

  if (isNegative) {
    // 負の方向へ移動した距離
    distance = -distance;
  }

  return distance;
}
