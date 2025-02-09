import preCompare from '../../lang/preCompare';
import standardize from '../standardize';
import { CompareOptions } from './types';

/**
 * 2つの文字列の比較を行う
 * @param value1 文字列1
 * @param value2 文字列2
 * @param options オプション
 * @returns
 */
export default function compare(value1: string, value2: string, options: CompareOptions = {}): number {
  // nullかundefinedだった場合の比較
  const preResult = preCompare(value1, value2, options);
  if (preResult !== undefined) {
    return preResult;
  }

  // null、undefined以外の比較
  // 値を標準化
  const val1 = standardize(value1, options),
    val2 = standardize(value2, options);
  // 比較
  return val1 === val2 ? 0 : val1 > val2 ? 1 : -1;
}
