import isBoolean from 'lodash/isBoolean';
import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import size from 'lodash/size';
import compareBoolean from '../../boolean/compare';
import compareDate from '../../date/compare';
import preCompare from '../../lang/preCompare';
import compareNumber from '../../number/compare';
import compareString from '../../string/compare';
import { CompareOptions } from './types';

/**
 * 配列の比較を行う
 * @param value1 比較対象1
 * @param value2 比較対象2
 * @param options オプション
 * @returns 比較結果
 */
export default function compare(value1: any[], value2: any[], options: CompareOptions = {}): number {
  const { booleanOptions, dateOptions, numberOptions, stringOptions, ...rest } = options;

  // 事前にundefined,nullの為の比較を行う
  const preResult = preCompare(value1, value2, rest);
  if (preResult !== undefined) {
    return preResult;
  }

  const size1 = size(value1),
    size2 = size(value2);
  if (size1 > 0 && size2 > 0) {
    // どちらも空ではない場合
    const length = Math.min(size1, size2);
    // 各要素の比較で決める
    for (let i = 0; i < length; i++) {
      // 要素の型に応じた比較を行う
      const v1 = value1[i],
        v2 = value2[i];
      let result;
      switch (true) {
        case isBoolean(v1) && isBoolean(v2):
          result = compareBoolean(v1, v2, booleanOptions);
          break;
        case isDate(v1) && isDate(v2):
          result = compareDate(v1, v2, dateOptions);
          break;
        case isNumber(v1) && isNumber(v2):
          result = compareNumber(v1, v2, numberOptions);
          break;
        case isString(v1) && isString(v2):
          result = compareString(v1, v2, stringOptions);
          break;
        case Array.isArray(v1) && Array.isArray(v2):
          result = compare(v1, v2, options);
          break;
        default:
          result = 0;
          break;
      }
      if (result !== 0) {
        // 要素同士の比較で差があった場合は結果を返す
        return result;
      }
    }
    // 要素の比較で決まらなかった場合は要素数で決める
    return size1 - size2;
  } else {
    // 共にまたはどちらかが空の場合
    if (size1 === 0 && size2 === 0) {
      // サイズが共に0の場合は空配列の方がnull、undefindより優勢
      return value1 && value2 ? 0 : value1 ? 1 : -1;
    } else {
      // どちらかが空の場合は要素のある方が優勢
      return size1 - size2;
    }
  }
}
