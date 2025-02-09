export type GetTypeOrderOptions = {
  /**
   * undefined,null以外の優先度を0とした場合のundefinedの優先度
   * デフォルトは-2
   */
  undefinedOrder?: -2 | -1 | 0 | 1 | 2;

  /**
   * undefined,null以外の優先度を0とした場合のnullの優先度
   * デフォルトは-1
   */
  nullOrder?: -2 | -1 | 0 | 1 | 2;
};
