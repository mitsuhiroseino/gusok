import { RelayAsyncOptions } from './types';

/**
 * 非同期関数を前の処理の完了を待って順番に実行する
 * @param fns 非同期関数の配列
 * @param options オプション
 */
export default function relayAsync(
  fns: ((...args: unknown[]) => Promise<any>)[],
  options: RelayAsyncOptions = {},
): Promise<any[]> {
  const { args = [], returnValueToArg } = options;
  let currentArgs = args;
  return fns.reduce(
    (promise, fn) => {
      // 前から渡されたpromiseに処理をつなげる
      return promise.then((results) => {
        // 前のpromiseのthenの中で非同期関数を実行することで、
        // 前の処理が完了してから次の処理が実行される
        return fn.apply(null, currentArgs).then((result) => {
          // resultに処理結果を追加して次のpromiseに渡す
          results.push(result);
          if (returnValueToArg) {
            currentArgs = [result];
          }
          return results;
        });
      });
      // 最初のpromiseはresolveの戻り値
    },
    Promise.resolve([] as any[]),
  );
}
