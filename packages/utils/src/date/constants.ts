/**
 * 日付型の最小値
 */
export const MIN_DATE = new Date(-8640000000000000);
/**
 * 日付型の最大値
 */
export const MAX_DATE = new Date(8640000000000000);

/**
 * 既定のフォーマット
 */
export const FORMATS = {
  Y: 'yyyy',
  YM: 'yyyy-MM',
  YMD: 'yyyy-MM-dd',
  YMDH: 'yyyy-MM-dd HH',
  YMDHM: 'yyyy-MM-dd HH:mm',
  YMDHMS: 'yyyy-MM-dd HH:mm:ss',
  H: 'HH',
  HM: 'HH:mm',
  HMS: 'HH:mm:ss',
} as const;
