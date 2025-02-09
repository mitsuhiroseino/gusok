/**
 * 比較方法
 */
export const COMPARE_MODE = {
  /**
   * `===`による比較
   */
  STRICT: 'strict',

  /**
   * `==`による比較
   */
  LOOSE: 'loose',

  /**
   * `lodash.isEqual()`による比較
   */
  DEEP: 'deep',
} as const;
