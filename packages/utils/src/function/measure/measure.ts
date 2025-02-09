import { MeasureOptions, MeasureReturnValue } from './types';

/**
 * 関数を指定回数実行しかかった時間を測定する
 * 実行回数を指定しなかった場合は10回実行する
 * @param fn 測定対象の関数
 * @param options オプション
 * @returns
 */
export default function measure<A extends any[] = any[], R extends any = any>(
  fn: (...args: A) => R,
  options: MeasureOptions<A> = {},
): MeasureReturnValue<R> {
  const { iteration = 10, args = [], getArgs = () => args } = options;
  // 指定回数分実行
  let returnValue,
    // 所要時間
    time = 0;
  for (let i = 0; i < iteration; i++) {
    // 引数の取得
    const currentArgs: any = getArgs();
    // 計測
    const start = performance.now();
    returnValue = fn.apply(null, currentArgs);
    time += performance.now() - start;
  }

  return { time, returnValue };
}
