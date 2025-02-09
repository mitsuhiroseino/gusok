import remove from 'lodash/remove';

/**
 * 非同期イテレーターを指定の数分並列実行する
 * @param asyncIterator 非同期イテレーター
 * @param parallelCount 並列実行数
 * @returns
 */
export default async function execAsyncIterator<R = any>(
  asyncIterator: AsyncIterator<R>,
  parallelCount: number,
  callback?: (result: R) => Promise<void>,
): Promise<R[]> {
  const results = [];

  let done = false;
  const promises = [];
  while (!done) {
    // イテレーターのpromiseを取得
    const promise = asyncIterator.next().then((next) => {
      // 終わったpromiseは削除
      remove(promises, promise);
      if (next.done) {
        // ループ終了フラグを立てる
        done = true;
      } else {
        // 結果を取得
        const value = next.value;
        results.push(value);
        if (callback) {
          // コールバックを実行
          return callback(value);
        }
      }
    });

    // promiseを持っておく
    promises.push(promise);
    if (promises.length === parallelCount) {
      // 並列数が上限に達した場合は何れかが終わるまで待つ
      await Promise.race(promises);
    }
  }

  if (promises.length) {
    // 残りが終わるのを待つ
    await Promise.all(promises);
  }

  return results;
}
