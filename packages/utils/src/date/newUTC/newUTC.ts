/**
 * UTCで値を指定してDate型のインスタンスを作成します。
 * @param year UTC年
 * @param month UTC月
 * @param date UTC日
 * @param hours UTC時
 * @param minutes UTC分
 * @param seconds UTC秒
 * @param milliseconds UTCミリ秒
 * @returns
 */
export default function newUTC(
  year: number,
  month: number = 0,
  date: number = 1,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
  milliseconds: number = 0,
): Date {
  return new Date(Date.UTC(year, month, date, hours, minutes, seconds, milliseconds));
}
