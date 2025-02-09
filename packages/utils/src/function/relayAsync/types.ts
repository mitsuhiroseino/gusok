/**
 * relayAsync関数のオプション
 */
export type RelayAsyncOptions<A extends any[] = any[]> = {
  /**
   * 関数に渡す引数
   */
  args?: A;

  /**
   * 前の関数の戻り値を次の関数の引数にする
   */
  returnValueToArg?: boolean;
};
