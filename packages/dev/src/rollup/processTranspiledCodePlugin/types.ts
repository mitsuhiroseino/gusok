/**
 * コンフィグ
 */
export type ProcessTranspiledCodePluginConfig = {
  /**
   * 文字列置換の設定
   */
  replacers?: Replacer[];
};

/**
 * 文字列置換
 */
export type Replacer = ReplacerFn | ReplacerConfig;

/**
 * 文字列置換設定
 */
export type ReplacerConfig = {
  target: RegExp;
  pattern: RegExp;
  replacement: string;
};

/**
 * 文字列置換関数
 */
export type ReplacerFn = (code: string, id: string) => string;
