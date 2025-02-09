import { MeasureOptions, MeasureReturnValue } from '../measure';

/**
 * measureAsync関数のオプション
 */
export type MeasureAsyncOptions<A extends any[] = any[]> = MeasureOptions<A>;

/**
 * measureAsync関数の戻り値
 */
export type MeasureAsyncReturnValue<R = any> = MeasureReturnValue<R>;
