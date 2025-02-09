/**
 * 指定の時間後に関数を実行します。
 * @param time 実行待ち時間(ms)
 * @param fn 実行する関数
 * @param args 関数の実行時に渡す引数
 * @returns promise
 */
export default function wait(time: number, fn: (...args: any[]) => any, args: any[] = []): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn.apply(null, args));
    }, time);
  });
}
