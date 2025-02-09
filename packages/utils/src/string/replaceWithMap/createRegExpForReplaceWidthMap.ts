import escapeForRegex from '../escapeForRegex';
import { ReplacementMap } from './types';

/**
 * マップによる置換用正規表現作成
 * @param map 置換マップ
 * @returns 置換用正規表現
 */
export default function createRegExpForReplaceWidthMap(map: ReplacementMap) {
  const escapedValues = Object.keys(map)
    .sort((a: string, b: string): number => b.length - a.length)
    .map((value) => escapeForRegex(value));
  return new RegExp(`(${escapedValues.join('|')})`, 'g');
}
