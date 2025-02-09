export type ParseOptions = {
  /**
   * trueとして扱う値
   * ここに設定された値以外はfalseとして扱う
   */
  trueValues?: any[];

  /**
   * falseとして扱う値
   * ここに設定された値以外はtrueとして扱う
   * trueValuesが設定されている場合は無効
   */
  falseValues?: any[];

  /**
   * trueValues,falseValuesの比較をdeepEqualで行う
   */
  deepEqual?: boolean;
};
