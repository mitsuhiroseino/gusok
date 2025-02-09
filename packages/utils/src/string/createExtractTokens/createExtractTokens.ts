import escapeForRegex from '../escapeForRegex';
import { ExtractTokensFn } from './types';

/**
 * プレイスホルダー内のトークンを抽出する関数を作成する
 * @param bracket プレイスホルダーの開始・終了を示す文字列
 * @returns
 */
export default function createExtractTokens(bracket: string | [string, string] = ['{{', '}}']): ExtractTokensFn {
  if (!Array.isArray(bracket)) {
    bracket = [bracket, bracket];
  }
  const [prefix, suffix] = bracket;
  const escapedPrefix = escapeForRegex(prefix);
  const escapedSuffix = escapeForRegex(suffix);
  // デフォルトの場合: /\{\{([^{}]+)\}\}/g
  const pattern = `${escapedPrefix}([^${escapedPrefix}${escapedSuffix}]+)${escapedSuffix}`;
  const regex = new RegExp(pattern, 'g');
  const prefixLength = prefix.length;
  const suffixLength = suffix.length;

  const fn = (str: string, stripEnclosures = false): string[] => {
    // tokenを抽出
    const tokens = str.match(regex);
    if (tokens == null) {
      // tokenなし
      return [];
    }
    if (stripEnclosures) {
      // bracketを削除する
      return tokens.map(function (token) {
        return token.substring(prefixLength, token.length - suffixLength);
      });
    } else {
      // bracketを削除しない
      return tokens;
    }
  };
  fn.PREFIX = prefix;
  fn.SUFFIX = suffix;
  return fn;
}
