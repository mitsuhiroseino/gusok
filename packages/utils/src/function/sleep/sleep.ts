/**
 * 指定の時間の間、処理を停止します
 * @param time 停止時間(ms)
 */
export default function sleep(time: number): void {
  // Date.now()よりもperformance.now()の方がやや性能が良かったのでperformance.now()を使う
  const start = performance.now();
  while (time > performance.now() - start) {}
}
