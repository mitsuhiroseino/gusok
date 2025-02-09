/**
 * 指定された日付型の値のUTC日時と同じローカル日時の日付型を作成します。
 * @param date 日付型の値
 * @returns
 */
export default function fromUTC(date: Date): Date {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  );
}
