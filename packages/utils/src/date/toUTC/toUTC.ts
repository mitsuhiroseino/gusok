import newUTC from '../newUTC';

/**
 * 指定された日付型の値のローカル日時と同じUTC日時の日付型を作成します。
 * @param date 日付型の値
 * @returns
 */
export default function toUTC(date: Date): Date {
  return newUTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
}
