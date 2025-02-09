import { PatternInfo } from '../toNumberPattern';

/**
 * format関数のオプション
 */
export type FormatOptions = FormatOptionsBase & {
  /**
   * フォーマット形式
   * negativeValueFormatなどが指定されている場合は、デフォルトのフォーマットとして使用
   * thousandsSeparator,decimalPointに任意の値を設定している場合でも、下記に従った設定が必要
   *
   * - 0: 数値を出力
   * - #: 値がある場合のみ数値を出力
   * - ,: 桁区切り
   * - .: 小数点(2つ以上指定した場合、左から見て最初の1つ以外は除外される)
   */
  format?: string;

  /**
   * 負の値のフォーマット形式
   * 未指定の場合はformatと同じ形式の先頭に"-"を付与した形式
   * 指定できる内容はformatと同じ
   */
  negativeValueFormat?: string;

  /**
   * ゼロのフォーマット形式
   * 未指定の場合はformatと同じ形式の先頭に"-"を付与した形式
   * 指定できる内容はformatと同じ
   */
  zeroValueFormat?: string;

  /**
   * ロケール
   * formatが指定されている場合は無効
   */
  locales?: string | string[];

  /**
   * Intl.NumberFormatのオプション
   * formatが指定されている場合は無効
   */
  numberFormatOptions?: NumberFormatOptions;
};

type NumberFormatOptions = {
  compactDisplay?: 'short' | 'long' | undefined;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero' | undefined;
  unit?: string | undefined;
  unitDisplay?: 'short' | 'long' | 'narrow' | undefined;
  currencyDisplay?: string | undefined;
  currencySign?: string | undefined;
};

/**
 * formatWithPattern関数のオプション
 */
export type FormatWithPatternOptions = FormatOptionsBase & {
  /**
   * 負の値のフォーマットパターン
   */
  negativeValuePattern?: PatternInfo;

  /**
   * ゼロのフォーマットパターン
   */
  zeroValuePattern?: PatternInfo;
};

/**
 * format関連関数の共通オプション
 */
type FormatOptionsBase = {
  /**
   * NaNの場合の値
   * 未指定の場合は入力値を文字列に変換した値を返す
   */
  nanString?: string;

  /**
   * 四捨五入無し
   */
  noRounding?: boolean;

  /**
   * 桁区切り
   * 未指定の場合は','
   */
  thousandsSeparator?: string;

  /**
   * 小数点
   * 未指定の場合は'.'
   */
  decimalPoint?: string;
};
