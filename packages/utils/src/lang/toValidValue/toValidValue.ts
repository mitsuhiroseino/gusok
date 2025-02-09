import typeOf, { VALUE_TYPE } from '../typeOf';
import { ToValidValueOptions } from './types';

/**
 * 型にふさわしい値に変換する
 * @param value 値
 * @param type 値として想定している型
 * @param options オプション
 * @returns
 */
export default function toValidValue<V = unknown>(value: any, options: ToValidValueOptions<V> = {}): V {
  if (!options.validType) {
    // 型の指定なし
    if (value != null) {
      // 置き換え無し
      // パフォーマンスを考え、正常な値はできるだけ簡単な処理のみで返す
      return value;
    } else {
      if (value === undefined && 'undefinedValue' in options) {
        // undefinedの場合の代替値
        return options.undefinedValue as V;
      } else if (value === null && 'nullValue' in options) {
        // nullの場合の代替値
        return options.nullValue as V;
      }
      return value;
    }
  } else {
    // 型の指定あり
    // 型の判定
    const type = typeOf(value),
      { validType = VALUE_TYPE.ANY } = options;
    if (type === validType) {
      // 指定の型だった場合
      return value;
    } else if (type === VALUE_TYPE.UNDEFINED && 'undefinedValue' in options) {
      // undefinedの場合の代替値
      return options.undefinedValue as V;
    } else if (type === VALUE_TYPE.NULL && 'nullValue' in options) {
      // nullの場合の代替値
      return options.nullValue as V;
    } else if ('defaultValue' in options) {
      // 想定外の型の場合の代替値
      return options.defaultValue as V;
    }
    // 指定の型ではないが、置き換える値が設定されていない場合
    return value;
  }
}
