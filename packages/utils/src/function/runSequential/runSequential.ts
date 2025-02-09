/**
 * 非同期関数の直列実行を行う
 * @param fns 非同期関数の配列
 * @returns
 */
export default function runSequential<R = any>(fns: (() => Promise<R>)[]): Promise<R[]> {
  // 直列実行
  return fns.reduce((currentPromise, fn) => {
    const nextPromise = currentPromise.then((results) => {
      // 前の処理が完了したら次の関数を実行
      return fn().then((result) => {
        // 処理結果は前のpromiseから受け取った配列に追加
        results.push(result);
        return results;
      });
    });
    return nextPromise;
  }, Promise.resolve<R[]>([]));
}
