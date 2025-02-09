import BigNumber from 'bignumber.js';
import isEmpty from 'lodash/isEmpty';
import trimEnd from 'lodash/trimEnd';
import { Pattern, PatternInfo } from '../toNumberPattern';
import { FormatWithPatternOptions } from './types';

/**
 * パターン情報を基に数値のフォーマットを行う
 * @param value フォーマット対象の値
 * @param pattern フォーマットパターン情報
 * @param options オプション
 * @returns
 */
export default function formatWithPattern(
  value: number | string,
  pattern: PatternInfo,
  options: FormatWithPatternOptions = {},
) {
  const bigNumber = new BigNumber(value),
    {
      negativeValuePattern,
      zeroValuePattern,
      nanString,
      noRounding,
      decimalPoint = '.',
      thousandsSeparator = ',',
    } = options;

  if (bigNumber.isNaN()) {
    // NaNの場合はフォーマットしない
    return nanString != null ? nanString : String(value);
  }

  const isZero = bigNumber.isZero(),
    isNegative = bigNumber.isNegative() && !isZero,
    // 今回適用されるパターン
    currentPattern =
      isZero && zeroValuePattern
        ? zeroValuePattern
        : isNegative && negativeValuePattern
          ? negativeValuePattern
          : pattern,
    { intPattern, intNumLength, decPattern, decNumLength, dp, ts, prefix, suffix } = currentPattern,
    // 小数点以下の桁数
    decimalPlaces = decPattern.length,
    // 小数点以下がパターンの桁数を超えた場合の丸め設定
    roundingMode = noRounding ? BigNumber.ROUND_DOWN : BigNumber.ROUND_HALF_UP,
    // フォーマット対象の絶対値
    fixedNumber = bigNumber.abs().toFixed(decimalPlaces, roundingMode);

  const [int, dec] = fixedNumber.split('.'),
    // 整数部を1桁毎に分解
    // パターンが"#"の場合に"0"は出力したくないので、"0"の場合は空配列
    intValue = int !== '0' ? int.split('').reverse() : [],
    decValue = dec ? trimEnd(dec, '0').split('') : [];

  // 整数桁
  let formatedValue = formatNum(intValue, intPattern, intNumLength, thousandsSeparator, true).reverse().join('');

  if (dp) {
    // 小数点
    formatedValue += decimalPoint;
    // 小数桁
    if (!isEmpty(decPattern)) {
      formatedValue += formatNum(decValue, decPattern, decNumLength, thousandsSeparator).join('');
    }
  }

  if (isNegative && !negativeValuePattern) {
    // 負の値で負の値用パターンが指定されてない場合は'-'を付ける
    formatedValue = '-' + formatedValue;
  }
  if (prefix != null) {
    formatedValue = prefix + formatedValue;
  }
  if (suffix != null) {
    formatedValue = formatedValue + suffix;
  }

  return formatedValue;
}

/**
 * パターンに従いvalueのフォーマットを行う
 * @param value フォーマット対象の文字列を文字の配列にしたもの
 * @param pattern フォーマットパターン
 * @param ts 桁区切り有無
 * @param overflow 桁あふれ出力有無
 * @returns
 */
function formatNum(
  value: string[],
  pattern: Pattern,
  numLength: number,
  thousandsSeparator: string = ',',
  overflow?: boolean,
): string[] {
  let p = 0;
  const patternLength = pattern.length;
  // valueをフォーマット
  let formattedValue = value.reduce((result, char, index) => {
    // patternの長さを超えるか#か0になるまで固定文字列か区切り文字の出力を確認
    while (p < patternLength && pattern[p] !== '0' && pattern[p] !== '#') {
      if (Array.isArray(pattern[p])) {
        // 固定文字列の出力
        result.push(...pattern[p]);
        p++;
      }
      if (pattern[p] === ',') {
        // 桁区切りは数値がある場合に出力する
        result.push(thousandsSeparator);
        p++;
      }
    }

    if (index < numLength || overflow) {
      // パターンの長さ以下かパターン以上の長さを許容している場合は出力
      result.push(char);
      p++;
    }

    return result;
  }, [] as string[]);

  // valueがpatternの桁数を下回っている場合は、余った0を付与
  for (p; p < patternLength; p++) {
    // ラベル
    if (Array.isArray(pattern[p]) && isNextNumZero(pattern, p)) {
      // #以外の前(先頭、末尾も含む)に設定された固定文字列は出力
      formattedValue.push(...pattern[p]);
      p++;
    }

    // 桁区切り
    if (pattern[p] === ',' && isNextNumZero(pattern, p)) {
      // 桁区切りは次が#以外の場合に出力する
      formattedValue.push(thousandsSeparator);
      p++;
    }

    // 0
    if (pattern[p] === '0') {
      formattedValue.push('0');
    }
  }
  return formattedValue;
}

/**
 * 次の数値は0か
 * @param pattern パターン
 * @param index 開始位置
 * @returns 0の場合にtrue、#または数値がない場合にfalse
 */
function isNextNumZero(pattern: Pattern, index: number): boolean {
  for (const token of pattern.slice(index + 1)) {
    if (token === '0') {
      return true;
    } else if (token === '#') {
      return false;
    }
  }
  return false;
}
