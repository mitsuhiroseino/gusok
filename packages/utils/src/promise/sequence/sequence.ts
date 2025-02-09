/**
 * 非同期の処理を前の処理が完了した後に順番に実行する
 * @param promises プロミスの配列
 * @returns
 */
export default function sequence<T = unknown>(promises: Promise<T>[]): Promise<T[]> {
  let currentPromise = Promise.resolve<T[]>([]);
  for (const promise of promises) {
    currentPromise = currentPromise.then((results) => {
      return promise.then((result) => {
        results.push(result);
        return results;
      });
    });
  }
  return currentPromise;
}
