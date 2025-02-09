import { ReplacementMap, TransformOptions } from '../transform';

/**
 * standardize関数のオプション
 */
export type StandardizeOptions = {
  /**
   * 値がnullの場合に置き換える値
   */
  nullValue?: string;
  /**
   * 値がundefinedの場合に置き換える値
   */
  undefinedValue?: string;

  /**
   * 英字の大文字・小文字の違いを無視する
   */
  ignoreCase?: boolean;

  /**
   * 半角・全角の違いを無視する
   */
  ingoreWidth?: boolean;

  /**
   * ひらがな・カタカナの違いを無視する
   */
  ignoreKana?: boolean;

  /**
   * 濁音(ば)・半濁音(ぱ)と清音(は)の違いを無視する
   */
  ignoreDakuon?: boolean;

  /**
   * 促音(っ)と清音(つ)の違いを無視する
   */
  ignoreSokuon?: boolean;

  /**
   * 拗音(ゃ)と清音(や)の違いを無視する
   */
  ignoreYouon?: boolean;

  /**
   * 長音(ー)を無視する
   */
  ignoreChouon?: boolean;

  /**
   * スペースを無視する
   */
  ignoreSpace?: boolean;

  /**
   * 文字列変換用のオプション
   */
  transformOptions?: TransformOptions;
};
