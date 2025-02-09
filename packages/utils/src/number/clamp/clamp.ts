import { CLAMP_MODE } from './constants';
import { ClampOptions } from './types';

const { MIN, MAX, WRAP, FOLD, DEFAULT, AUTO } = CLAMP_MODE;

// 値の取得処理
const CLAMP = {
  // 最小値
  [MIN]: (value: number, min: number, max: number, defaultValue: number) => min,
  // 最大値
  [MAX]: (value: number, min: number, max: number, defaultValue: number) => max,
  // 値が一周しているというあつかいで算出
  [WRAP]: (value: number, min: number, max: number, defaultValue: number) => {
    const range = Math.abs(max - min);
    // 整数倍周回した余り
    let remainingValue = (value - min) % range;
    if (remainingValue < 0) {
      // 余りがマイナスの場合はプラスに補正
      remainingValue += range;
    }
    // 最小値＋残りの値が答え
    return min + remainingValue;
  },
  // 最小値と最大値の間を往復する形で算出
  [FOLD]: (value: number, min: number, max: number, defaultValue: number) => {
    const range = Math.abs(max - min);
    // 整数倍往復した後の余り
    let remainingValue = (value - min) % (2 * range);
    if (remainingValue < 0) {
      // 余りがマイナスの場合はプラスに補正
      remainingValue += 2 * range;
    }
    if (remainingValue <= range) {
      // 往路の場合の答え
      return min + remainingValue;
    } else {
      // 復路の場合の答え
      return max - (remainingValue - range);
    }
  },
  // デフォルト値
  [DEFAULT]: (value: number, min: number, max: number, defaultValue: number) => defaultValue,
};

/**
 * 指定の範囲に収まるよう値を調整する
 * @param value 値
 * @param min 最小値
 * @param max 最大値
 * @param options オプション
 * @returns
 */
export default function clamp(value: number, min: number, max: number, options: ClampOptions = {}) {
  const { minClampMode = AUTO, maxClampMode = AUTO, defaultValue = 0 } = options;
  const minValue = Math.min(min, max);
  const maxValue = Math.max(min, max);

  if (value < minValue) {
    // 下限未満
    return CLAMP[minClampMode === AUTO ? MIN : minClampMode](value, minValue, maxValue, defaultValue);
  } else if (value > maxValue) {
    // 上限超え
    return CLAMP[maxClampMode === AUTO ? MAX : maxClampMode](value, minValue, maxValue, defaultValue);
  } else {
    // 範囲内
    return value;
  }
}
