import applyIf from '../applyIf';

/**
 * 非同期の関数として実行する
 * @param fn
 * @param args
 */
export default function asAsync<A extends unknown[], R>(fn: (...args: A) => R, args?: A): Promise<R> {
  return Promise.resolve().then(() => {
    return applyIf(fn, args);
  });
}
