import { ToPositiveNumberOptions } from './types';

/**
 * 正の数に変換する。
 * デフォルトでは負の数だった場合にnullを返す。
 * @param value 値
 * @param options オプション
 * @returns
 */
export default function toPositiveNumber(
  value: number | null | undefined,
  options: ToPositiveNumberOptions = {},
): number | null | undefined {
  if (value == null) {
    // null,undefinedの場合
    if ('defaultValue' in options) {
      return options.defaultValue;
    } else {
      return value;
    }
  } else if (value > 0) {
    // 正の数はそのまま
    return value;
  } else if (value < 0) {
    // 負の数の場合
    if ('negativeValue' in options) {
      if (options.negativeValue === 'abs') {
        return Math.abs(value);
      } else {
        return options.negativeValue;
      }
    } else {
      return null;
    }
  }
}
