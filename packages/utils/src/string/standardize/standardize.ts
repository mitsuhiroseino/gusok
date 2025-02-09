import transform, { TRANSFORMATION_TYPES, TransformationType } from '../transform';
import { StandardizeOptions } from './types';

/**
 * 比較用に文字列の標準化を行う
 * @param value 文字列
 * @param options オプション
 * @returns 標準化された文字列
 */
export default function standardize(value: string, options: StandardizeOptions = {}): string {
  if (value) {
    // 文字列あり
    const {
        ignoreCase,
        ingoreWidth,
        ignoreKana,
        ignoreDakuon,
        ignoreSokuon,
        ignoreYouon,
        ignoreChouon,
        ignoreSpace,
        transformOptions,
      } = options,
      transformationTypes: TransformationType[] = [];

    if (ingoreWidth) {
      // 半角・全角の違いを無視する
      transformationTypes.push(TRANSFORMATION_TYPES.TO_HALF_WIDTH);
      transformationTypes.push(TRANSFORMATION_TYPES.TO_ZENKAKU);
    }
    if (ignoreCase) {
      // 英字の大文字・小文字の違いを無視する
      transformationTypes.push(TRANSFORMATION_TYPES.TO_LOCALE_LOWER_CASE);
    }
    if (ignoreKana) {
      // ひらがな・カタカナの違いを無視する
      transformationTypes.push(TRANSFORMATION_TYPES.TO_KATAKANA);
    }
    if (ignoreDakuon) {
      // 濁音(ば)・半濁音(ぱ)と清音(は)の違いを無視する
      transformationTypes.push(TRANSFORMATION_TYPES.TO_WITHOUT_DAKUON);
    }
    if (ignoreSokuon) {
      // 促音(っ)と清音(つ)の違いを無視する
      transformationTypes.push(TRANSFORMATION_TYPES.TO_WITHOUT_SOKUON);
    }
    if (ignoreYouon) {
      // 拗音(ゃ)と清音(や)の違いを無視する
      transformationTypes.push(TRANSFORMATION_TYPES.TO_WITHOUT_YOUON);
    }
    if (ignoreChouon) {
      // 長音(ー)を無視する
      transformationTypes.push(TRANSFORMATION_TYPES.TO_WITHOUT_YOUON);
    }
    if (ignoreSpace) {
      // スペースを無視する
      transformationTypes.push(TRANSFORMATION_TYPES.TO_WITHOUT_SPACE);
    }

    return transform(value, transformationTypes, transformOptions);
  } else if (value === null && 'nullValue' in options) {
    // nullの場合は別の値に置き換え
    return options.nullValue;
  } else if (value === undefined && 'undefinedValue' in options) {
    // undefinedの場合は別の値に置き換え
    return options.undefinedValue;
  } else {
    // 上記以外はそのまま返す
    return value;
  }
}
