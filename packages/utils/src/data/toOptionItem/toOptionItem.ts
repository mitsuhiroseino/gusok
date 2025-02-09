import isObject from 'lodash/isObject';
import { ToOptionItemOptions } from './types';

/**
 * オブジェクト、配列、それ以外の値を`{ value: 'bar', label: 'foo' }`形式に変換する
 * @param item 任意の値
 * @returns `{ value: 'bar', label: 'foo' }`形式の値
 */
export default function toOptionItem<O = { value: unknown; label: string }>(
  item: any,
  options: ToOptionItemOptions = {},
): O {
  let value, label;
  if (Array.isArray(item)) {
    // 配列の場合
    const { valueFrom = 0, labelFrom = 1 } = options;
    value = item[valueFrom];
    label = item[labelFrom];
  } else if (isObject(item)) {
    // オブジェクトの場合
    const { valueFrom = 'value', labelFrom = 'label' } = options;
    value = item[valueFrom];
    label = item[labelFrom];
  } else {
    // 上記以外の場合
    value = item;
    label = item;
  }

  // 指定の形式で返す
  const { valueTo = 'value', labelTo = 'label' } = options;
  return {
    [valueTo]: value,
    [labelTo]: label,
  } as O;
}
