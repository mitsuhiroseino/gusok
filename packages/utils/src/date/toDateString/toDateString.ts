import { isAfter, isBefore } from 'date-fns';
import isDate from 'lodash/isDate';
import { FORMATS, MAX_DATE, MIN_DATE } from '../constants';
import formatFn from '../format';
import parse from '../parse';
import { FormatType } from '../types';
import { ToDateStringOptions } from './types';

const COMPLEMENTS = [
  { token: 'yyyy', value: '2000' },
  { token: 'MM', value: '01' },
  { token: 'dd', value: '01' },
  { token: 'HH', value: '00' },
  { token: 'mm', value: '00' },
  { token: 'ss', value: '00' },
];

const toReturnValue = (value: Date | string | null, format: FormatType): string | null => {
  if (isDate(value)) {
    return formatFn(value, { format });
  }
  return value;
};

/**
 * 日付文字列に変換する
 * @param value 値
 * @param options オプション
 * @returns
 */
export default function toDecimalString(
  value: Date | string | null | undefined,
  options: ToDateStringOptions = {},
): string | null {
  const {
    format = FORMATS.YMD,
    empty = '',
    nonDate = '',
    min = MIN_DATE,
    max = MAX_DATE,
    interactive = false,
  } = options;

  if (value == null || value === '') {
    return toReturnValue(empty, format);
  } else if (isDate(value)) {
    return toReturnValue(value, format);
  }

  let isComplemented;
  let dateValue: Date;
  if (interactive) {
    // 入力しているところまでのフォーマット
    const sampleValue = COMPLEMENTS.reduce((result, { token, value }) => {
      return result.replaceAll(token, value);
    }, format as string);
    const complementedValue = value + sampleValue.substring(value.length);
    isComplemented = true;
    dateValue = parse(complementedValue, { formats: format });
  } else {
    dateValue = parse(value, { formats: format });
  }

  if (!dateValue) {
    // フォーマットに合致しない場合
    return toReturnValue(nonDate, format);
  } else if (isComplemented) {
    // 正しいフォーマットで入力中の場合
    return value;
  }

  // 正しいフォーマットで入力済みの場合
  let minDate;
  let maxDate;
  if (max.getTime() < min.getTime()) {
    minDate = max;
    maxDate = min;
  } else {
    minDate = min;
    maxDate = max;
  }

  if (isBefore(dateValue, minDate)) {
    return toReturnValue(minDate, format);
  }

  if (isAfter(dateValue, maxDate)) {
    return toReturnValue(maxDate, format);
  }

  return toReturnValue(dateValue, format);
}
