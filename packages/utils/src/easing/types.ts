import { EASING_TYPE } from './constants';

/**
 * イージング種別
 */
export type EasingType = (typeof EASING_TYPE)[keyof typeof EASING_TYPE];

/**
 * イージング関数
 */
export type Easing = (rate: number) => number;

/**
 * イージング関数作成関数
 */
export type EasingCreater = (amplitude?: number, period?: number) => Easing;

/**
 * イージング関数作成関数群
 */
export type EasingCreaters = { [type in EasingType]: EasingCreater };
