import { MeasureOptions } from '../measure';

/**
 * 測定する対象
 */
export type MeasurementTarget<A extends Array<unknown>> = {
  /**
   * ID
   */
  id: string;

  /**
   * 測定対象の関数
   * @param args
   * @returns
   */
  fn: (...args: A) => any;
};

/**
 * 測定の議題
 */
export type MeasurementAgenda<A extends Array<unknown>> = MeasureOptions<A> & {
  /**
   * ID
   */
  id?: string;

  /**
   * 測定対象
   */
  targets: MeasurementTarget<A>[];

  /**
   * 1回の測定で対象の関数を実行する回数
   */
  tests?: number;

  /**
   * trueの場合、測定前に各測定対象を1回ずつ実行する
   */
  warmingUp?: boolean;
};

/**
 * 計測された処理時間
 */
export type RequiredTimeResult = {
  /**
   * 測定対象毎の処理時間
   */
  [targetId: string]: number;
};

/**
 * 集計結果
 */
export type TabulatedResult<A extends Array<unknown>, R = any> = {
  /**
   * 測定結果毎の平均
   */
  average: RequiredTimeResult;

  /**
   * 全体の平均
   */
  totalAverage: number;

  /**
   * 順位
   */
  order: MeasurementTarget<A>[];
};

/**
 * 測定結果
 */
export type MeasurementResult<A extends Array<unknown>, R = any> = TabulatedResult<A> & {
  /**
   * ID
   */
  id?: string;

  /**
   * 測定結果
   */
  results: RequiredTimeResult[];

  /**
   * 測定結果毎の戻り値(最後の処理分のみ)
   */
  returnValues: { [targetId: string]: R };

  /**
   * 測定開始日時
   */
  start: Date;

  /**
   * 測定終了日時
   */
  end: Date;
};
