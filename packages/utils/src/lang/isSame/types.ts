import { COMPARE_MODE } from './constants';

/**
 * 比較方法
 */
export type CompareMode = (typeof COMPARE_MODE)[keyof typeof COMPARE_MODE];

/**
 * isSame関数のオプション
 */
export type IsSameOptions = {
  /**
   * 比較方法
   * - 未指定 or strict: 値1 === 値2
   * - loosely: 値1 == 値2
   * - deeply: 値1 と 値2の構造が同じであること
   */
  compareMode?: CompareMode;

  /**
   * equalityType='deeply'の場合: lodash.isEqualWithのcustomizer
   * equalityType='deeply'以外の場合: value1,value2のみ有効。boolean以外の値を返した際には通常の比較を行う
   * @param value1
   * @param value2
   * @param indexOrKey
   * @param value1Parent
   * @param value2Parent
   * @param stack
   * @returns
   */
  customizer?: (
    value1: any,
    value2: any,
    indexOrKey?: PropertyKey | undefined,
    value1Parent?: any,
    value2Parent?: any,
    stack?: any,
  ) => boolean | void;
};
