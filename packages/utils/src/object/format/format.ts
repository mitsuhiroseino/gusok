import { FormatOptions } from './types';

/**
 * オブジェクトのフォーマットを行う
 * @param value オブジェクト型の値
 * @param options オプション
 * @returns
 */
export default function format(value: any, options: FormatOptions = {}): string | null {
  const { replacer, space } = options;
  return JSON.stringify(value, replacer, space);
}
