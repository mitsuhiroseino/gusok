import formatDate from 'date-fns/format';
import fromUTC from '../fromUTC';
import { FormatOptions } from './types';

const FORMAT = 'yyyy/MM/dd HH:mm:ss.SSS';

/**
 * 日付型の値のフォーマットを行う
 * @param value 日付型の値
 * @param options オプション
 * @returns
 */
export default function format(value: Date, options: FormatOptions = {}): string | null {
  const { format = FORMAT, utc, ...dateFnsOptions } = options;
  let date;
  if (utc) {
    date = fromUTC(value);
  } else {
    date = value;
  }
  return formatDate(date, format, dateFnsOptions);
}
