import { MeasurementAgenda, MeasurementResult, RequiredTimeResult } from '../comparePerformance';

/**
 * 測定する要素
 */
export type MeasurementAsyncTarget<A extends Array<unknown> = unknown[]> = {
  /**
   * ID
   */
  id: string;

  /**
   * 測定対象の関数
   * @param args
   * @returns
   */
  fn: (...args: A) => Promise<any>;
};

/**
 * 測定の議題
 */
export type MeasurementAsyncAgenda<A extends Array<unknown> = any[]> = MeasurementAgenda<A>;

/**
 * 計測された処理時間
 */
export type RequiredTimeAsyncResult = RequiredTimeResult;

/**
 * 測定結果
 */
export type MeasurementAsyncResult<A extends Array<unknown>, R = any> = MeasurementResult<A, R>;
