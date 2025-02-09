import identity from 'lodash/identity';
import rebuild from '../rebuild';
import { CleanOptions } from './types';

function cleanFn<T>(arg: T): T | undefined {
  return arg == null ? undefined : arg;
}

/**`
 * undefinedの要素を削除します。
 * @param target
 */
export default function clean(target: any, options: CleanOptions = {}): any {
  const { removeNull, ...rest } = options,
    fn = removeNull ? cleanFn : identity;
  return rebuild(target, fn, rest);
}
