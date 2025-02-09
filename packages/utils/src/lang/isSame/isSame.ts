import isEqual from 'lodash/isEqual';
import isEqualWith from 'lodash/isEqualWith';
import { COMPARE_MODE } from './constants';
import { IsSameOptions } from './types';

const EQUAL = {
  // 厳密な比較
  [COMPARE_MODE.STRICT]: (value1: unknown, value2: unknown, options: IsSameOptions) => {
    return value1 === value2;
  },
  // 緩い比較
  [COMPARE_MODE.LOOSE]: (value1: unknown, value2: unknown, options: IsSameOptions) => {
    return value1 == value2;
  },
  // 構造の比較
  [COMPARE_MODE.DEEP]: (value1: unknown, value2: unknown, options: IsSameOptions) => {
    if (options.customizer) {
      // customizerがある場合
      return isEqualWith(value1, value2, options.customizer as any);
    } else {
      return isEqual(value1, value2);
    }
  },
};
const EQUAL_WITH_CUSTOMIZER = {
  // 厳密な比較
  [COMPARE_MODE.STRICT]: (value1: unknown, value2: unknown, options: IsSameOptions) => {
    const customizer: any = options.customizer,
      result = customizer(value1, value2);
    if (result == null) {
      return value1 === value2;
    } else {
      return result;
    }
  },
  // 緩い比較
  [COMPARE_MODE.LOOSE]: (value1: unknown, value2: unknown, options: IsSameOptions) => {
    const customizer: any = options.customizer,
      result = customizer(value1, value2);
    if (result == null) {
      return value1 == value2;
    } else {
      return result;
    }
  },
  // 構造の比較
  [COMPARE_MODE.DEEP]: (value1: unknown, value2: unknown, options: IsSameOptions) => {
    const customizer: any = options.customizer;
    return isEqualWith(value1, value2, customizer);
  },
};

/**
 * 2つの値が等しいことを判定する
 * @param value1 比較する値1
 * @param value2 比較する値2
 * @param options オプション
 * @returns 比較結果
 */
export default function isSame(value1: unknown, value2: unknown, options: IsSameOptions = {}): boolean {
  const { compareMode = COMPARE_MODE.STRICT, customizer } = options;
  if (customizer) {
    // customizerありの比較
    return EQUAL_WITH_CUSTOMIZER[compareMode](value1, value2, options);
  } else {
    // 比較
    return EQUAL[compareMode](value1, value2, options);
  }
}
