export type WithPromiseOptions = {
  /**
   * コールバックに渡された引数のうち、プロミスで返す引数のインデックスを指定する
   * 未指定の場合は全ての引数を配列形式で返す。
   */
  argIndex?: number;
};
