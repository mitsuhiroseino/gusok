import createRegExpForReplaceWidthMap from './createRegExpForReplaceWidthMap';
import { ReplacementMap } from './types';

/**
 * mapに渡された内容を元にstrの文字列を置換します。
 *
 * 例:
 *     str: 'abcdefgfedcba'
 *     map: { bc: 'BC', f: 'F' }
 *     returns: 'aBCdeFgFedcba'
 *
 * @param str 対象の文字列
 * @param map 置換用のマップ
 * @param regexp 文字検索用の正規表現
 * @returns
 */
export default function replaceWithMap(
  str: string,
  map: ReplacementMap,
  regexp: RegExp = createRegExpForReplaceWidthMap(map),
): string {
  return str.replace(regexp, (match: string, capture: string) => map[capture]);
}
