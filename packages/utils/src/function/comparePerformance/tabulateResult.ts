import { MeasurementTarget, RequiredTimeResult, TabulatedResult } from './types';

/**
 * 測定結果を集計する
 * @param targets 測定対象
 * @param tests 測定回数
 * @param total 測定結果の合計
 * @returns
 */
export default function tabulateResult<A extends Array<unknown> = Array<unknown>>(
  targets: MeasurementTarget<A>[],
  results: RequiredTimeResult[],
): TabulatedResult<A> {
  // 平均値の計算を行う
  // 各測定対象毎の平均値
  const tests = results.length,
    // 各測定対象の処理時間の合計
    total = results.reduce((ttl, result) => {
      for (const targetId in result) {
        ttl[targetId] = (ttl[targetId] || 0) + result[targetId];
      }
      return ttl;
    }, {}),
    average: RequiredTimeResult = {};

  // 各測定対象の平均の合計
  for (const target of targets) {
    const targetId = target.id;
    // 測定対象毎の平均
    average[targetId] = total[targetId] / tests;
  }

  // 全体の平均(全測定結果の合計 / (測定対象数 * 測定回数))
  const totalAverage = Object.values(total).reduce((sum, value) => sum + value, 0) / (targets.length * tests),
    // 順位
    order = Object.entries(average)
      .sort((a, b) => a[1] - b[1])
      .map(([id]) => targets.find((target) => target.id === id)) as MeasurementTarget<A>[];

  // 測定結果を返す
  return {
    average,
    totalAverage,
    order,
  };
}
