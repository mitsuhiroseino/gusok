import toNumberPattern, { PatternInfo } from '../toNumberPattern';
import formatWithPattern from './formatWithPattern';
import { FormatOptions } from './types';

/**
 * 数値のフォーマットを行う
 * @param value 数値型の値
 * @param options オプション
 * @returns 成形された文字列
 */
export default function format(value: number | string, options: FormatOptions = {}): string | null {
  const { format = '#,##0.###', negativeValueFormat, zeroValueFormat, ...rest } = options,
    positiveValuePattern = toNumberPattern(format) as PatternInfo,
    negativeValuePattern = toNumberPattern(negativeValueFormat),
    zeroValuePattern = toNumberPattern(zeroValueFormat);
  return formatWithPattern(value, positiveValuePattern, {
    negativeValuePattern,
    zeroValuePattern,
    ...rest,
  });
}
