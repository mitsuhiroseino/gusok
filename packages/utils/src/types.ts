import { IdentifiableProps } from './identifier';

/**
 * 任意のオブジェクト
 */
export type AnyObject<V = any> = Record<PropertyKey, V>;

/**
 * 任意のオプション
 */
export type AnyOptions = AnyObject<any>;

/**
 * mixin定義用のコンストラクター
 */
export type Constructor<I = any> = new (...args: any[]) => I;

/**
 * 識別可能な要素の設定
 */
export type IdentifiableConfig = Optional<Identifiable, '$id'>;

/**
 * 識別可能な要素
 */
export interface Identifiable extends Optional<IdentifiableProps, '$idName'> {}

/**
 * JSON.stringifyを利用する機能用のオプション
 */
export type JsonStringifyOptions = {
  /**
   * 特定のキー、値の場合に任意の値を出力する場合に指定
   * @param key キー
   * @param value 値
   * @returns 任意の値
   */
  replacer?: (key: string, value: any) => any;

  /**
   * インデントに設定するスペース
   */
  space?: string | number;
};

/**
 * JSON.parseを利用する機能用のオプション
 */
export type JsonParseOptions = {
  /**
   * 特定のキー、値の場合に任意の値を出力する場合に指定
   * @param key
   * @param value
   * @returns
   */
  reviver?: (key: string, value: any) => any;
};

/**
 * 指定のプロパティをオプショナルにするユーティリティ型
 */
export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

/**
 * 指定のプロパティを必須にするユーティリティ型
 */
export type Essential<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * Oに設定したRecord型のキーのユニオン型
 * Vを指定するとその型が設定されているキーのみのユニオン型
 */
export type Keys<O extends Record<PropertyKey, unknown>, V = any> = {
  [K in keyof O]: O[K] extends V ? K : never;
}[keyof O];

/**
 * Oに設定したRecord型のキーを使用した値がFの型のRecord型
 * Vを指定するとその型が設定されているキーのみのRecord型
 */
export type Flags<O extends Record<PropertyKey, unknown>, V = any, F = boolean> = Record<Keys<O, V>, F>;
