import getTypeOrder from '../getTypeOrder';
import { PreCompareOptions } from './types';

/**
 * 以下の比較結果が出た場合のみ戻り値を返す
 * - インスタンスが同じ
 * - 何れかまたは両方がnullまたはundefined
 * @param value1 比較対象1
 * @param value2 比較対象2
 * @param options オプション
 * @returns 比較結果
 */
export default function preCompare(value1: any, value2: any, options: PreCompareOptions = {}): number | undefined {
  if (value1 === value2) {
    // 同じインスタンス
    return 0;
  }
  if (value1 == null || value2 == null) {
    // どちらかまたは共にnullかundefinedの場合
    const order1 = getTypeOrder(value1, options),
      order2 = getTypeOrder(value2, options);
    return order1 - order2;
  }
  return;
}
