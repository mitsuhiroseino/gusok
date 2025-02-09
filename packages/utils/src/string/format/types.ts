import { AnyObject } from '../../types';
import extractTokens from '../extractTokens';

export type FormatOptions = {
  /**
   * メッセージに埋め込むパラメーター
   */
  params?: AnyObject;

  /**
   * トークン抽出用関数
   * デフォルトはbracket=['{{','}}']のextractTokensが利用される。
   * それ以外のprefix,suffixにする必要がある場合は当オプションに、
   * createExtractTokensで作成した関数を設定する
   * @param str
   * @param stripEnclosures
   * @returns
   */
  extractTokensFn?: typeof extractTokens;
};
