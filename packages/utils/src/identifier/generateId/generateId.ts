import { v4 as uuidv4 } from 'uuid';
import { GenerateIdOptions } from './types';

/**
 * uuid v4に準拠した文字列を生成する。
 * @param options
 * @returns
 */
export default function generateId(options: GenerateIdOptions = {}): string {
  const { prefix = '', suffix = '' } = options;
  return `${prefix}${uuidv4()}${suffix}`;
}
