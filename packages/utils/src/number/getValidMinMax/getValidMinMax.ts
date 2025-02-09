/**
 * 最小値と最大値を正しく設定する
 * @param min 最小値
 * @param max 最大値
 * @returns [最小値, 最大値]
 */
export default function getValidMinMax(
  min: number,
  max: number,
  defaultMin: number = Number.MIN_VALUE,
  defaultMax: number = Number.MAX_VALUE,
) {
  const minValue = min != null ? min : defaultMin,
    maxValue = max != null ? max : defaultMax;
  if (minValue < maxValue) {
    return [minValue, maxValue];
  } else {
    return [maxValue, minValue];
  }
}
