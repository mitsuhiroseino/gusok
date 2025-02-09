export type ExtractTokensFn = {
  /**
   * トークン抽出関数
   */
  (str: string, stripEnclosures?: boolean): string[];
  /**
   * トークンのプレフィックス
   */
  PREFIX: string;
  /**
   * トークンのサフィックス
   */
  SUFFIX: string;
};
