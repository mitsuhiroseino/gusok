import { MeasureAsyncOptions, MeasureAsyncReturnValue } from './types';

/**
 * 関数を指定回数実行しかかった時間を測定する
 * @param fn 測定対象の関数
 * @param args 測定対象の関数を実行する際に渡す引数
 * @param iteration 実行回数。未指定の場合は10回
 * @returns
 */
export default function measureAsync<A extends any[] = any[], R extends any = any | undefined>(
  fn: (...args: A) => Promise<R>,
  options: MeasureAsyncOptions = {},
): Promise<MeasureAsyncReturnValue<R>> {
  const { iteration = 10, args = [], getArgs = () => args } = options;
  // 指定回数分実行
  let promise = Promise.resolve<MeasureAsyncReturnValue<R>>({ time: 0, returnValue: undefined });
  for (let i = 0; i < iteration; i++) {
    promise = promise.then((previousResult) => {
      // 引数の取得
      const currentArgs: any = getArgs();
      return new Promise((resolve, reject) => {
        // 計測
        const start = performance.now();
        fn.apply(null, currentArgs)
          .then((returnValue) => {
            const time = previousResult.time + performance.now() - start;
            // 次に渡す
            resolve({ time, returnValue });
            return returnValue;
          })
          .catch((e) => reject(e));
      });
    });
  }
  return promise;
}
