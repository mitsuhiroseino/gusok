import { CalcRatioValueOptions } from './types';

/**
 * 割合に応じた値を返す
 * @param value テンプレート
 * @param ratio 割合
 * @param options オプション
 * @returns
 */
export default function calcRatioValue(value: Date, ratio: number, options: CalcRatioValueOptions = {}): Date {
  const { initialValue } = options,
    initial = initialValue == null ? 0 : initialValue.getTime(),
    diff = value.getTime() - initial,
    currentDiff = diff * ratio;
  return new Date(initial + currentDiff);
}
