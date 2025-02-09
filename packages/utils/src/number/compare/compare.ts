import preCompare from '../../lang/preCompare';
import { CompareOptions } from './types';

/**
 * 数値の比較を行う
 * @param value1 比較対象1
 * @param value2 比較対象2
 * @param options オプション
 * @returns 比較結果
 */
export default function compare(value1: number, value2: number, options: CompareOptions = {}): number {
  // nullかundefinedだった場合の比較
  const preResult = preCompare(value1, value2, options);
  if (preResult !== undefined) {
    return preResult;
  }

  // null、undefined以外の比較
  return value1 - value2;
}
