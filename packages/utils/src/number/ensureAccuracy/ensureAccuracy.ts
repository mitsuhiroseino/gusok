/**
 * 指定の精度の値を返す
 * @param value 値
 * @param accuracy 精度
 * @returns 指定の精度の値
 */
export default function ensureAccuracy(value: number, accuracy: number) {
  return Math.round(value / accuracy) * accuracy;
}
