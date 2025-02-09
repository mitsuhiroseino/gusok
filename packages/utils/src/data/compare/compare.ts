import isBoolean from 'lodash/isBoolean';
import isDate from 'lodash/isDate';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import size from 'lodash/size';
import { DIFFERENCE_TYPE, NO_VALUE, VALUE_TYPE } from './constants';
import { CompareResult, DifferenceType, ValueType } from './types';

/**
 * オブジェクト
 */
type UnknownObject = {
  [key: string]: unknown;
};

/**
 * 配列
 */
type UnknownArray = unknown[];

/**
 * 値の比較を行います。比較した結果は要素毎にObject形式で返却します。
 * 要素毎の結果の内容:
 *
 *  - value1: value1の値
 *  - type1: value1の値の型
 *  - value2: value2の値
 *  - type2: value2の値の型
 *  - result: 比較結果
 *     - null: 一致
 *     - 'value': 値の不一致
 *     - 'type': 型の不一致
 *     - 'key': キーの不一致(要素の有無)
 *     - 'size': 要素数の不一致(value1,value2がオブジェクト、配列の場合のみ)
 *     - 'children': 子要素に不一致あり
 *  - children: 子要素の比較結果(value1,value2がオブジェクト、配列の場合のみ)
 *
 * @param value1 比較対象1
 * @param value2 比較対象2
 * @return 比較結果
 */
export default function compare(value1: unknown, value2: unknown): CompareResult {
  let difference: DifferenceType = DIFFERENCE_TYPE.NO_DIFFERENCE,
    children: CompareResult[] | null = null;
  const type1: ValueType = typeOf(value1),
    type2: ValueType = typeOf(value2);

  if (value1 !== NO_VALUE && value2 !== NO_VALUE) {
    // 両方値がある場合のみ比較
    if (type1 === type2) {
      // 型が同じ
      if (type1 === VALUE_TYPE.OBJECT) {
        // object
        const object1 = value1 as UnknownObject,
          object2 = value2 as UnknownObject;
        if (size(object1) !== size(object2)) {
          // 要素数の不一致
          difference = DIFFERENCE_TYPE.SIZE;
        }
        // 子要素も比較
        children = _compareObject(object1, object2);
      } else if (type1 === VALUE_TYPE.ARRAY) {
        // 配列
        const array1 = value1 as UnknownArray,
          array2 = value2 as UnknownArray;
        if (array1.length !== array2.length) {
          // 要素数の不一致
          difference = DIFFERENCE_TYPE.SIZE;
        }
        // 子要素も比較
        children = _compareArray(array1, array2);
      } else if (type1 === VALUE_TYPE.DATE) {
        // 日付
        const date1 = value1 as Date,
          date2 = value2 as Date;
        if (date1.getTime() !== date2.getTime()) {
          // 値の不一致
          difference = DIFFERENCE_TYPE.VALUE;
        }
      } else {
        // その他はインスタンスの比較
        if (value1 !== value2) {
          // 値の不一致
          difference = DIFFERENCE_TYPE.VALUE;
        }
      }
    } else {
      // 型の不一致
      difference = DIFFERENCE_TYPE.TYPE;
    }
  } else {
    // どちらかがない場合
    difference = DIFFERENCE_TYPE.KEY;
  }
  // 比較結果の作成
  const compareResult: CompareResult = {
    value1,
    type1,
    value2,
    type2,
    difference,
  };
  if (children) {
    // 子要素あり
    compareResult.children = children;
    if (
      compareResult.difference === DIFFERENCE_TYPE.NO_DIFFERENCE &&
      children.some((child) => child.difference !== DIFFERENCE_TYPE.NO_DIFFERENCE)
    ) {
      // 子要素に不一致あり
      compareResult.difference = DIFFERENCE_TYPE.CHILDREN;
    }
  }
  return compareResult;
}

/**
 * オブジェクト配下の要素を比較します
 * 1. object1に存在する要素をobject2の要素と比較
 * 2. object2のみに存在する要素をobject1と比較(全てキー不一致)
 *
 * @param object1 比較対象1
 * @param object2 比較対象2
 * @return 比較結果
 */
function _compareObject(object1: UnknownObject, object2: UnknownObject): CompareResult[] {
  const results: CompareResult[] = [],
    rest1 = { ...object2 };

  // object1 -> object2の比較
  for (const key in object1) {
    // 値を取得
    const value1 = object1[key],
      value2 = key in object2 ? object2[key] : NO_VALUE;
    // 比較
    const result = compare(value1, value2);
    result.key = key;
    results.push(result);
    delete rest1[key];
  }

  // object2のみに存在する要素の比較
  for (const key in rest1) {
    // 比較
    // object1には無い要素の比較なので第一引数は必ずNO_VALUE
    const result = compare(NO_VALUE, object2[key]);
    result.key = key;
    results.push(result);
  }
  // 結果をキー順にソートして返す
  return results.sort((result1, result2) => {
    const key1: any = result1.key,
      key2: any = result2.key;
    return key1 > key2 ? 1 : -1;
  });
}

/**
 * 配列配下の要素を比較します
 * 1. array1に存在する要素をarray2の要素と比較
 * 2. array2のみに存在する要素をarray1と比較(全てキー不一致)
 *
 * @param array1 比較対象1
 * @param array2 比較対象2
 * @return 比較結果
 */
function _compareArray(array1: UnknownArray, array2: UnknownArray): CompareResult[] {
  const results: CompareResult[] = [],
    length1 = array1.length,
    length2 = array2.length;

  // array1 -> array2の比較
  for (let index = 0; index < length1; index++) {
    // 値を取得
    const value1 = array1[index],
      value2 = index < length2 ? array2[index] : NO_VALUE;
    // 比較
    const result = compare(value1, value2);
    result.key = index;
    results.push(result);
  }

  // array2のみに存在する要素の比較
  for (let index = length1; index < length2; index++) {
    // 比較
    // array1には無い要素の比較なので第一引数は必ずNO_PROPERTY
    const result = compare(NO_VALUE, array2[index]);
    result.key = index;
    results.push(result);
  }

  return results;
}

/**
 * 値種別を取得する
 * @param value
 * @returns
 */
function typeOf(value: unknown): ValueType {
  if (value === NO_VALUE) {
    return VALUE_TYPE.NO_TYPE;
  } else if (value === undefined) {
    return VALUE_TYPE.UNDEFINED;
  } else if (value === null) {
    return VALUE_TYPE.NULL;
  } else if (isString(value)) {
    return VALUE_TYPE.STRING;
  } else if (isNumber(value)) {
    return VALUE_TYPE.NUMBER;
  } else if (isBoolean(value)) {
    return VALUE_TYPE.BOOLEAN;
  } else if (isDate(value)) {
    return VALUE_TYPE.DATE;
  } else if (Array.isArray(value)) {
    return VALUE_TYPE.ARRAY;
  } else if (isPlainObject(value)) {
    return VALUE_TYPE.OBJECT;
  } else if (isFunction(value)) {
    return VALUE_TYPE.FUNCTION;
  } else {
    return VALUE_TYPE.UNKNOWN;
  }
}
