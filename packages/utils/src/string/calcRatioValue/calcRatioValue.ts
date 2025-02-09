import { CalcRatioValueOptions } from './types';

/**
 * 割合に応じた長さの文字列を返す
 * @param value 文字列
 * @param ratio 割合
 * @param options オプション
 * @returns
 */
export default function calcRatioValue(value: string, ratio: number, options: CalcRatioValueOptions = {}): string {
  const { initialValue } = options;
  if (ratio === 1) {
    return value;
  } else {
    if (initialValue == null) {
      // 新しい値のみ
      const length = value.length,
        currentLength = Math.floor(length * ratio);
      return value.substring(0, currentLength);
    } else {
      // 古い値の削除 & 新しい値
      const initialLength = initialValue.length,
        length = value.length,
        initialRatio = initialLength / (initialLength + length),
        ratio = 1 - initialRatio;

      if (initialRatio > ratio) {
        // 古い値の削除
        const currentLength = initialLength - Math.floor(initialLength * (ratio / initialRatio));
        return initialValue.substring(0, currentLength);
      } else {
        // 新しい値
        const currentLength = Math.floor(length * ((ratio - initialRatio) / ratio));
        return value.substring(0, currentLength);
      }
    }
  }
}
