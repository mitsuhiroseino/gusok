import preCompare from '../../lang/preCompare';
import { CompareOptions } from './types';

/**
 * 真偽値の比較を行う
 * @param value1 比較対象1
 * @param value2 比較対象2
 * @param options オプション
 * @returns 比較結果
 */
export default function compare(value1: boolean, value2: boolean, options: CompareOptions = {}): number {
  // nullかundefinedだった場合の比較
  const preResult = preCompare(value1, value2, options);
  if (preResult !== undefined) {
    return preResult;
  }

  // null、undefined以外の比較
  const preferFalse = options.preferFalse;
  let val1 = value1 ? 1 : 0,
    val2 = value2 ? 1 : 0;
  if (preferFalse) {
    // 0と1を反転
    val1 = -~-val1;
    val2 = -~-val2;
  }
  return val1 - val2;
}
