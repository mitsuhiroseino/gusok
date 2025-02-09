/**
 * strはprefixで始まり、suffixで終わっているか
 * prefixとsuffixの間には最低1文字が必要
 * @param str 文字列
 * @param prefix 接頭語
 * @param suffix 接尾語
 */
export default function isEnclosedIn(str: string, prefix: string, suffix: string = prefix): boolean {
  if (str) {
    if (str.length < prefix.length + suffix.length) {
      // prefix+suffixよりも短い場合はfalse
      return false;
    }
    return str.startsWith(prefix) && str.endsWith(suffix);
  } else {
    return false;
  }
}
