import generateId from '../generateId';
import getId from '../getId';
import { EnsureIdOptions } from './types';

/**
 * 対象からIDを取得する。IDが設定されていない場合は生成する。
 * @param target
 * @param options
 * @returns
 */
export default function ensureId(target: object, options: EnsureIdOptions = {}) {
  const id = getId(target, options);
  return id != null ? id : generateId(options);
}
