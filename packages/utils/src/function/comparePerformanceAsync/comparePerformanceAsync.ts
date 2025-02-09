import rotate from '../../array/rotate';
import { tabulateResult } from '../comparePerformance';
import measureAsync from '../measureAsync';
import { MeasurementAsyncAgenda, MeasurementAsyncResult, RequiredTimeAsyncResult } from './types';

/**
 * 任意の関数の実行時間を測定し比較する
 * @param agenda
 * @returns
 */
export default async function comparePerformanceAsync<A extends Array<unknown> = Array<unknown>, R = any>(
  agenda: MeasurementAsyncAgenda<A>,
): Promise<MeasurementAsyncResult<A, R>> {
  // 開始日時
  const start = new Date(),
    { id = String(start.getTime()), targets, args, getArgs, iteration = 10, tests = 10, warmingUp } = agenda,
    // measureAsync関数の引数
    opts = { args, getArgs, iteration },
    // 各測定回の結果
    results: RequiredTimeAsyncResult[] = [],
    // 各測定対象の戻り値
    returnValues = {};

  if (warmingUp) {
    // ウォーミングアップ
    const warmingUpOpts = { ...opts, iteration: 1 };
    await Promise.all(targets.map((target) => measureAsync(target.fn, warmingUpOpts)));
  }

  // 測定する順番を変えながら測定を行う
  let processingOrder = targets;
  for (let i = 0; i < tests; i++) {
    // 指定回数分測定する
    // このループ1回分が測定結果を一覧にした際の1行分
    const result = {};
    for (const target of processingOrder) {
      // 計測
      const { time, returnValue } = await measureAsync(target.fn, opts),
        targetId = target.id;

      // 計測結果
      result[targetId] = time;
      // 戻り値
      returnValues[targetId] = returnValue;
    }
    // 1回分の測定結果
    results.push(result);
    // 測定する順番を入れ替え
    processingOrder = rotate(processingOrder);
  }

  // 平均値の計算を行う
  const averageResult = tabulateResult(targets, results),
    // 終了日時
    end = new Date();

  // 測定結果を返す
  return {
    id,
    results,
    returnValues,
    start,
    end,
    ...averageResult,
  };
}
