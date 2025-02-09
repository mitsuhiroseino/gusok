import { customAlphabet } from 'nanoid';
import { UuidOptions } from './types';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 16);

/**
 * 英大文字、英小文字、数字を含む、重複する可能性が殆ど無い16桁(デフォルト)の文字列を生成する。
 * @param options
 * @returns
 */
export default function uuid(options: UuidOptions = {}): string {
  const { prefix = '', suffix = '', digitsNumber } = options;
  return `${prefix}${nanoid(digitsNumber)}${suffix}`;
}
