import isNumber from 'lodash/isNumber';
import editTypedValue from '../../lang/editTypedValue';

/**
 * 値の差を算出する
 * @param value1 値1
 * @param value2 値2
 * @returns 結果
 */
export default function calcDifference(
  value1: { [key: string]: any } | number[] | number,
  value2: { [key: string]: any } | number[] | number,
): any {
  return editTypedValue<number>(value1, value2, (v1, v2) => v1 - v2, isNumber);
}
