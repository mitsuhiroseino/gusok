/**
 * 正の整数であることを判定する
 * @param value
 * @returns
 */
export default function isPositiveInteger(value: any): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}
