export type ToLiteralOptions = ToLiteralOptionsBase & {
  /**
   * trueの場合、indent、lineSeparator、separatorを下記の値で出力する
   * indent、lineSeparator、separatorを個別に設定した場合はそちらの値が有効
   *
   * - indent: "    "
   * - lineSeparator: "\r\n"
   * - separator: ": "
   */
  formatting?: boolean;

  /**
   * インデント桁数
   */
  indent?: number;

  /**
   * 改行コードとして使用する文字列
   */
  lineSeparator?: string;

  /**
   * オブジェクトのキーと値の区切り後のスペースの桁数
   */
  separatorSpace?: number;
};

/**
 * 内部的なオプション
 */
export type ToLiteralInternalOptions = ToLiteralOptionsBase & {
  /**
   * インデントとして使用する文字列
   */
  indent: string;

  /**
   * 改行コードとして使用する文字列
   */
  lineSeparator: string;

  /**
   * オブジェクトのキーと値の区切り後のスペース
   */
  separatorSpace: string;

  /**
   * 現在のネストレベル
   */
  level: number;

  /**
   * ベースになるインデント
   */
  baseIndent: string;
};

/**
 * オプションのベース
 */
export type ToLiteralOptionsBase = {
  /**
   * 出力するネストの上限
   */
  limit?: number;

  /**
   * 日付型の項目を出力する際のフォーマット。未指定の場合はtoISOString()の戻り値
   */
  dateFormat?: string;

  /**
   * undefinedの出力。デフォルトは"undefined"
   *
   * - undefined: undefinedを出力
   * - null: nullを出力
   * - omit: 出力しない
   */
  undefinedOutput?: 'undefined' | 'null' | 'omit';

  /**
   * nullの出力。デフォルトは"null"
   *
   * - null: nullを出力
   * - omit: 出力しない
   */
  nullOutput?: 'null' | 'undefined' | 'omit';

  /**
   * Mapの出力。デフォルトは"object"
   *
   * - object: objectと同じ形式で出力
   * - type: クラス名('[Map]')を出力
   * - omit: 出力しない
   */
  mapOutput?: 'object' | 'type' | 'omit';

  /**
   * Map以外のIterableなインスタンスの出力。デフォルトは"array"
   *
   * - array: arrayと同じ形式で出力
   * - type: クラス名('[Set]'など)を出力
   * - omit: 出力しない
   */
  iterableOutput?: 'array' | 'type' | 'omit';

  /**
   * 関数の出力。デフォルトは"function"
   *
   * - string: 関数の内容を文字列で出力
   * - type: typeofの結果('[function]')を出力
   * - omit: 出力しない
   */
  functionOutput?: 'string' | 'type' | 'omit';

  /**
   * 任意のクラスのインスタンスの出力。デフォルトは"string"
   *
   * - string: String(instance)の戻り値を出力
   * - type: クラス名を出力
   * - omit: 出力しない
   */
  instanceOutput?: 'string' | 'type' | 'omit';

  /**
   * キーでソートした順に出力
   */
  sortByKey?: boolean;
};
