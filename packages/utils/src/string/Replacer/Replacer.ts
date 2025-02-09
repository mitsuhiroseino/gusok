import invert from 'lodash/invert';
import isEqual from 'lodash/isEqual';
import asArray from '../../array/asArray';
import replaceWithMap, { ReplacementMap, createRegExpForReplaceWidthMap } from '../replaceWithMap';
import { ReplacementSetting, ReplacerConfig } from './types';

/**
 * Mapを用いた文字列の置換を行うクラス
 */
export default class Replacer {
  /**
   * マップのキャッシュ
   */
  private _cache: { [type: string]: { map: ReplacementMap; regexp: RegExp; additionalMap?: ReplacementMap } } = {};

  /**
   * 登録された順変換の全type
   */
  private _types: string[] = [];

  /**
   * 登録された逆変換の全type
   */
  private _reverseType: string[] = [];

  constructor(config: ReplacerConfig = {}) {
    const { replacements } = config;
    if (replacements) {
      this.addReplacements(replacements);
    }
  }

  /**
   * 置換用のマップの一括追加
   * @param maps
   */
  addReplacements(replacements: ReplacementSetting[]) {
    for (const { map, type, reverseType } of replacements) {
      this.add(map, type, reverseType);
    }
  }

  /**
   * 置換用のマップを追加する
   * @param map マップ
   * @param type キー→値に変換する際の名称
   * @param reverseType 値→キーに変換する際の名称
   */
  add(map: ReplacementMap, type: string, reverseType?: string) {
    const me = this;
    // 正方向のマップ
    me._cache[type] = {
      map,
      regexp: createRegExpForReplaceWidthMap(map),
    };
    me._types.push(type);

    if (reverseType) {
      // 逆方向のマップ
      const reverse: ReplacementMap = invert(map);
      me._cache[reverseType] = {
        map: reverse,
        regexp: createRegExpForReplaceWidthMap(reverse),
      };
      me._reverseType.push(reverseType);
    }
  }

  /**
   * マップを用いて変換を行う
   * @param str 変換元文字列
   * @param types 行う変換の名称を指定した配列。未指定の場合は現在登録されている全ての順変換を実施
   * @param additionalMap 追加のマップ
   * @returns
   */
  replace(str: string, types: string | string[] = this._types, additionalMap?: ReplacementMap): string {
    const { map, regexp } = this._getReplacementInfo(types, additionalMap);
    // mapを用いて置換を実行
    return replaceWithMap(str, map, regexp);
  }

  /**
   * 置換用マップ&正規表現を取得する。
   * 対象の情報が存在しない場合は作成する
   * @param types 行う変換の名称を指定した配列。未指定の場合は現在登録されている全ての順変換を実施
   * @param additionalMap 追加のマップ
   * @returns
   */
  private _getReplacementInfo(types: string | string[], additionalMap?: ReplacementMap) {
    const replacementType = asArray(types).join('|');
    const cache = this._cache[replacementType];
    if (cache && isEqual(cache.additionalMap, additionalMap)) {
      return cache;
    } else {
      let mergedMap = {};
      for (const type of types) {
        if (type in this._cache) {
          const map = this._getReplacementInfo(type).map;
          mergedMap = Object.assign(mergedMap, map);
        }
      }
      if (additionalMap) {
        // additionalMapを最後にマージすることで、置換対象がと既存のマップと重複していても追加分が有効になる
        mergedMap = Object.assign(mergedMap, additionalMap);
      }
      const replacementInfo = { map: mergedMap, regexp: createRegExpForReplaceWidthMap(mergedMap), additionalMap };
      this._cache[replacementType] = replacementInfo;
      return replacementInfo;
    }
  }
}
