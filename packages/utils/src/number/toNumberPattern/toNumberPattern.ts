import last from 'lodash/last';
import isEnclosedIn from '../../string/isEnclosedIn';
import { Pattern, PatternInfo } from './types';

/**
 * フォーマットを分解するための正規表現
 */
const REGEXP_FORMAT_TO_PATTERN = /"([^"]*)"|0|#|\.|,/g;

/**
 * フォーマット文字列からパターン情報を作成する
 * @param format フォーマット文字列
 * @returns
 */
export default function toNumberPattern(format: string | undefined): PatternInfo | undefined {
  if (format == null) {
    return;
  }
  const pattern = toPattern(format, REGEXP_FORMAT_TO_PATTERN),
    dpIndex = pattern.indexOf('.'),
    // 小数点の有無
    dp = dpIndex > -1,
    // 整数部のパターン(prefix,suffixを含む)
    intPattern = dp ? pattern.slice(0, dpIndex).reverse() : pattern.reverse(),
    intNumLength = intPattern.filter((token) => token === '0' || token === '#').length,
    // 小数部のパターン(prefix,suffixを含む & 余分な'.'は除外)
    decPattern = dp ? pattern.slice(dpIndex + 1).filter((token) => token !== '.') : [],
    decNumLength = decPattern.filter((token) => token === '0' || token === '#').length,
    // 桁区切りの有無
    ts = intPattern.includes(',');

  let prefix, suffix;
  // prefix
  prefix = getXfix(last(intPattern));
  if (prefix != null) {
    intPattern.pop();
  }
  if (dp) {
    // 小数点あり
    // suffix
    suffix = getXfix(last(decPattern));
    if (suffix != null) {
      decPattern.pop();
    }
  } else {
    // 小数点なし
    // suffix
    if (intPattern.length > 1) {
      suffix = getXfix(intPattern[0]);
      if (suffix != null) {
        intPattern.shift();
      }
    }
  }

  return { intPattern, intNumLength, decPattern, decNumLength, dp, ts, prefix, suffix };
}

/**
 * tokenがlabelだった場合、ラベル文字列を返す
 * @param token パターントークン
 * @returns
 */
function getXfix(token: any): string | undefined {
  return Array.isArray(token) ? token.join('') : undefined;
}

/**
 * フォーマット文字列をパターンに変換する
 * @param format フォーマット文字列
 * @param regex パターン正規表現
 * @returns
 */
function toPattern(format: string, regex: RegExp): Pattern {
  const matchArray = format.match(regex);
  if (matchArray) {
    return matchArray.slice(0).reduce((result, token) => {
      // #,0と固定文字列を見分けられるようにする
      if (isEnclosedIn(token, '"')) {
        // 固定文字列(label)
        const label = token.substring(1, token.length - 1),
          lastItem = last(result);
        if (Array.isArray(lastItem)) {
          // 1つ前もlabelの場合は纏める
          lastItem.push(label);
        } else {
          result.push([label]);
        }
      } else {
        // 数値 or 桁区切り or 小数点
        result.push(token);
      }
      return result;
    }, [] as any);
  } else {
    // マッチするもの無し
    return [];
  }
}
