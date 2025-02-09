export type FormatOptions = {
  /**
   * フォーマット形式
   * https://date-fns.org/v2.29.3/docs/format
   */
  format?: string;

  /**
   * UTCの日時でフォーマットを行う
   */
  utc?: boolean;

  // 以下はdate-fns.formatのオプション
  // https://date-fns.org/v2.29.3/docs/format#arguments
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
};
