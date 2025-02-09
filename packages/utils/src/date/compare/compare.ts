import preCompare from '../../lang/preCompare';
import format from '../format';
import { CompareOptions } from './types';

/**
 * 指定のフォーマットを基に日時の比較を行う
 * @param value1 比較対象1
 * @param value2 比較対象2
 * @param options オプション
 * @returns 比較結果
 */
export default function compare(value1: Date, value2: Date, options: CompareOptions = {}): number {
  // nullかundefinedだった場合の比較
  const preResult = preCompare(value1, value2, options);
  if (preResult !== undefined) {
    return preResult;
  }

  // null、undefined以外の比較
  let val1, val2;
  if (options.format) {
    // フォーマットした値で比較
    val1 = format(value1, options) || '';
    val2 = format(value2, options) || '';
    return val1 === val2 ? 0 : val1 > val2 ? 1 : -1;
  } else {
    // エポック秒で比較
    val1 = value1 ? value1.getTime() : 0;
    val2 = value2 ? value2.getTime() : 0;
    return val1 - val2;
  }
}
