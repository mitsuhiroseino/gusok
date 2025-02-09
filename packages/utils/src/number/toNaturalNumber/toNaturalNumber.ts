import isNumber from 'lodash/isNumber';
import toPositiveNumber from '../toPositiveNumber';
import { ToNaturalNumberOptions } from './types';

/**
 * 自然数に変換する。
 * デフォルトでは正整数に対応し、範囲外の値はnullを返す。
 * オプションのzeroValueに0を指定することで非負整数にも対応
 * @param value 値
 * @param options オプション
 * @returns
 */
export default function toNaturalNumber(
  value: number | null | undefined,
  options: ToNaturalNumberOptions = {},
): number | null | undefined {
  if (value === 0) {
    // 0の場合
    if ('zeroValue' in options) {
      return options.zeroValue;
    } else {
      return null;
    }
  } else {
    // 上記以外の場合
    // 正の数に変換
    const positive = toPositiveNumber(value, options);
    if (isNumber(positive)) {
      // 変換された値が数値の場合は小数以下を切り捨て
      return Math.floor(positive);
    } else {
      return positive;
    }
  }
}
