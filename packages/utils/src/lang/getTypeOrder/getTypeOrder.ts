import getDefined from '../getDefined';
import { GetTypeOrderOptions } from './types';

/**
 * 値の型に応じた順番を返す
 * @param value 値
 * @param options オプション
 * @returns 優先度
 */
export default function getTypeOrder(value: any, options: GetTypeOrderOptions = {}): number {
  if (value === undefined) {
    return getDefined(options.undefinedOrder, -2) as number;
  } else if (value === null) {
    return getDefined(options.nullOrder, -1) as number;
  } else {
    return 0;
  }
}
