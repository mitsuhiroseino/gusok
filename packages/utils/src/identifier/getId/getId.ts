import { GetIdOptions } from './types';

/**
 * 対象からIDを取得する
 * @param target
 * @param options
 * @returns
 */
export default function getId(target: object, options: GetIdOptions = {}) {
  const { property = '$id' } = options;
  return target[property];
}
