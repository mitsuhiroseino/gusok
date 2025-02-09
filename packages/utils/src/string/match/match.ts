import examineRelationship from '../../lang/examineRelationship';
import compare from '../compare';
import { MatchOptions } from './types';

/**
 * 文字列の比較を行う
 * @param value1 比較対象1
 * @param value2 比較対象2
 * @param options オプション
 * @returns 比較結果
 */
export default function match(value1: string, value2: string, options: MatchOptions = {}): boolean {
  const result = compare(value1, value2, options);
  return examineRelationship(result, options);
}
