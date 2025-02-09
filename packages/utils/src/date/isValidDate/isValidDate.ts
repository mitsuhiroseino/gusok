import isDate from 'lodash/isDate';

/**
 * 正しい日付型の値か
 * 不正な日付型、および日付型以外はfalse
 * @param date 値
 * @returns
 */
export default function isValidDate(date: any): boolean {
  return isDate(date) && date.toString() !== 'Invalid Date';
}
