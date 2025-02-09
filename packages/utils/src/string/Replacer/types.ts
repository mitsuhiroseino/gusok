import { ReplacementMap } from '../replaceWithMap';

export { ReplacementMap } from '../replaceWithMap';

/**
 * コンフィグ
 */
export type ReplacerConfig = {
  /**
   * 置換用の設定
   */
  replacements?: ReplacementSetting[];
};

/**
 * 置換用の設定
 */
export type ReplacementSetting = {
  /**
   * 置換用のマップ
   */
  map: ReplacementMap;

  /**
   * 置換種別
   */
  type: string;

  /**
   * 逆置換種別
   */
  reverseType?: string;
};
