import { IsValidNumberOptions } from './types';

/**
 * 有効な数値であることを判定する
 * @param value
 * @param options
 * @returns
 */
export default function isValidNumber(value: any, options: IsValidNumberOptions = {}): boolean {
  if (options.allowInfinity) {
    if (value === Number.NEGATIVE_INFINITY || value === Number.POSITIVE_INFINITY) {
      return true;
    }
  }
  return typeof value === 'number' && isFinite(value);
}
