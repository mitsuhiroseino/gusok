import { VALUE_TYPE } from './constants';

/**
 * 型種別
 */
export type ValueType = (typeof VALUE_TYPE)[keyof typeof VALUE_TYPE];
