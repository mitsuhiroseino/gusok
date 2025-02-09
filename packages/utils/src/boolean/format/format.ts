import { FormatOptions } from './types';

/**
 * 真偽値のフォーマットを行う
 * @param value 真偽値型の値
 * @param options オプション
 * @returns
 */
export default function format(value: boolean, options: FormatOptions = {}): string | null {
  const { trueString = 'true', falseString = 'false' } = options;
  if (value) {
    return trueString;
  } else {
    return falseString;
  }
}
