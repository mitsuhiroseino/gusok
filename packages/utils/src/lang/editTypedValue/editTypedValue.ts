import clone from 'lodash/clone';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';

/**
 * オブジェクト直下の値、配列直下の値、値の編集をする
 * 要素内全ての数値から指定の値を引くなどの計算をする際に利用することを想定
 * @param targetValue 編集編集にふさわしい値
 * @param value 編集で使用する値
 * @param edit 2つの値を引数にとる編集用の関数
 * @param isTargetType 編集対象であるか判定を行うための関数
 * @returns 結果
 */
export default function editTypedValue<T = any>(
  targetValue: { [key: string]: any } | T[] | T,
  value: { [key: string]: any } | T[] | T,
  edit: (val1: T, val2: T) => T,
  isTargetType: (value: any) => boolean,
): any {
  const editFn: (val1: any, val2: any) => T = edit;
  if (isPlainObject(targetValue)) {
    // オブジェクトの場合
    if (isTargetType(value)) {
      // valueが編集にふさわしい値の場合はオブジェクト配下の編集にふさわしい値を対象にして編集する
      return mapValues((item) => (isTargetType(item) ? editFn(item, value) : item));
    } else if (isPlainObject(value)) {
      // valueがオブジェクトの場合はオブジェクト配下の同じキーの値を対象にして編集する
      return mapValues((item, key) =>
        isTargetType(item) && isTargetType(value[key]) ? editFn(item, value[key]) : item,
      );
    } else {
      return { ...(targetValue as any) };
    }
  } else if (Array.isArray(targetValue)) {
    // 配列の場合
    if (isTargetType(value)) {
      // valueが編集にふさわしい値の場合は配列配下の編集にふさわしい値を対象にして編集する
      return targetValue.map((item) => editFn(item, value));
    } else if (Array.isArray(value)) {
      // valueが配列の場合は配列配下の同じインデックスの値を対象にして編集する
      const len = value.length;
      return targetValue.map((item, i) => (i < len ? editFn(item, value[i]) : item));
    } else {
      // valueが配列以外の値の場合は新しい配列にして返す
      return targetValue.concat([]);
    }
  } else if (isTargetType(targetValue)) {
    // それ以外の場合
    if (isTargetType(value)) {
      // valueが編集にふさわしい値の場合は編集にふさわしい値を対象にして編集する
      return editFn(targetValue, value);
    } else {
      // valueが編集にふさわしい値ではない場合は基の値をクローンして返す
      return clone(targetValue);
    }
  }
  // 上記以外はクローンした値を返す
  return clone(targetValue);
}
