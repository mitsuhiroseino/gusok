import isSame from '../../lang/isSame';
import hasOwnProperty from '../hasOwnProperty';
import { GenericRecord } from '../types';
import { UpdateOptions } from './types';

/**
 * valuesに設定された値でobjectを更新する
 * 値の変更が無いキーは更新しない
 * @param object 更新対象のオブジェクト
 * @param values 更新する値を持ったオブジェクト
 * @param options オプション
 * @returns 更新されたキーと以前の値
 */
export default function update(object: GenericRecord, values: GenericRecord, options?: UpdateOptions): GenericRecord {
  const updated: GenericRecord = {},
    keys = Object.keys(values);
  for (const key of keys) {
    if (hasOwnProperty(values, key)) {
      const value = values[key],
        oldValue = object[key];
      if (!isSame(oldValue, value, options)) {
        updated[key] = oldValue;
        object[key] = values[key];
      }
    }
  }
  return updated;
}
