import asArray from '../../array/asArray';
import pushAll from '../../array/pushAll';
import pushUnique from '../../array/pushUnique';
import Replacer from '../Replacer';
import { FUNCTIONS, PRESETS, TRANSFORMATIONS } from './constants';
import { TransformOptions, TransformationType } from './types';

// 文字列置換用インスタンスの作成
const replacer = new Replacer({ replacements: TRANSFORMATIONS }),
  // presetを展開して返す
  getTypes = (types: TransformationType | TransformationType[], withoutDuplicates?: boolean): TransformationType[] => {
    const replacementTypes = asArray(types),
      result: TransformationType[] = [],
      // 重複の有効／無効に応じたpushを行う
      push = withoutDuplicates ? pushUnique : pushAll;
    for (const type of replacementTypes) {
      const preset = PRESETS[type];
      if (preset) {
        // presetは展開して追加
        push(result, getTypes(preset, withoutDuplicates));
      } else {
        push(result, type);
      }
    }
    return result;
  };

/**
 * 文字列を指定のタイプへ変換します。
 *
 *  - toLowerCase: 英字を小文字に変換
 *  - toUpperCase: 英字を大文字に変換
 *  - toLocaleLowerCase: 英字をロケールに依存した対応付けに基づき小文字に変換
 *  - toLocaleUpperCase: 英字をロケールに依存した対応付けに基づき大文字に変換
 *  - toFullWidth: 半角を全角へ変換。下記を個別に指定することも可能
 *      - toFullWidthAlphabet: 半角英字を全角英字へ変換
 *      - toFullWidthNumber: 半角数字を全角数字へ変換
 *      - toFullWidthSign: 半角記号を全角記号へ変換
 *      - toFullWidthSpace: 半角スペースを全角スペースへ変換
 *  - toHalfWidth: 全角を半角へ変換。下記を個別に指定することも可能
 *      - toHalfWidthAlphabet: 全角英字を半角英字へ変換
 *      - toHalfWidthNumber: 全角数字を半角数字へ変換
 *      - toHalfWidthSign: 全角記号を半角記号へ変換
 *      - toHalfWidthSpace: 全角スペースを半角スペースへ変換
 *  - toZenkaku: 半角カナを全角カナへ変換
 *  - toHankaku: 全角カナを半角カナへ変換
 *  - toKatakana: ひらがなをカタカナへ変換
 *  - toHiragana: カタカナをひらがなへ変換
 *  - toWithoutDakuon: ひらがなとカタカナの濁音(`ば`、`ぱ`等)を清音(`は`等)に変換
 *  - toWithoutSokuon: ひらがなとカタカナの促音(`っ`等)を清音(`つ`等)に変換
 *  - toWithoutYouon: ひらがなとカタカナの拗音(`ゃ`等)を清音(`や`等)に変換
 *  - toWithoutChouon: 長音(`ー`)を削除
 *  - toWithoutSpace: 全角、半角スペースを削除
 *  - toHtmlLineFeed: 改行をHTMLの<br/>へ変換
 *  - toTextLineFeed: HTMLの<br/>を改行(\r\n)へ変換
 *  - toHtmlOnHtml: HTMLをそのままHTMLに表示するための変換
 *  - toTextOnHtml: 文字列をそのままHTMLに表示するための変換
 *  - escapeForHtml: HTMLで文字列として表示するための変換
 *  - unescapeFromHtml: escapeForHtmlの逆変換
 *  - escapeForRegex: 正規表現のリテラル部分を文字列で記述する際に必要なエスケープ。RegExpのコンストラクターに渡せる形式
 *  - escapeForString: プログラム内で文字列リテラルを記述する際に必要なエスケープ。"'"と"/"に"/"を付与する。
 *
 * @param str 変換元の文字列
 * @param types 変換タイプ
 * @param options オプション
 */
export default function transform(
  str: string,
  types: TransformationType | TransformationType[],
  options: TransformOptions = {},
): string {
  let target;
  if (str == null && !options.returnNullAsIs) {
    target = '';
  } else {
    target = str;
  }

  if (target) {
    const replacementTypes = getTypes(types, options.withoutDuplicates);
    const replacementMap = options.replacementMap;
    if (replacementTypes.some((type) => type in FUNCTIONS)) {
      // replacerを使わない変換あり
      let result = target;
      for (const type of replacementTypes) {
        const fn = FUNCTIONS[type];
        if (fn) {
          // replacerを使わない変換
          result = fn(result, options);
        } else {
          // replacerを使う変換
          result = replacer.replace(result, type);
        }
      }
      if (replacementMap) {
        result = replacer.replace(result, [], replacementMap);
      }
      return result;
    } else {
      // replacerを使う変換のみ
      return replacer.replace(target, replacementTypes, replacementMap);
    }
  } else {
    // 変換するものなし
    return target;
  }
}
