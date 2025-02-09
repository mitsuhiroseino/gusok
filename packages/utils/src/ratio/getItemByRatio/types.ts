/**
 * オプション
 */
export type GetItemByRatioOptions = {
  /**
   * itemsの各要素間の値を補間する
   */
  interpolation?: boolean;

  /**
   * 規定の値補間処理で任意の値に任意の値を加算する為の関数
   * 未指定の場合は frame1 + frame2 で算出
   * smooth=trueでframesの要素がnumberではない場合は必須
   * @param frame1
   * @param frame2
   * @returns
   */
  calcSum?: (frame1: any, frame2: any) => any;

  /**
   * 規定の値補間処理でstartとendの差を算出する為の関数
   * 未指定の場合は endFrame - startFrame で算出
   * smooth=trueでframesの要素がnumberではない場合は必須
   * @param startFrame
   * @param endFrame
   * @returns
   */
  calcDifference?: (startFrame: any, endFrame: any) => any;

  /**
   * 規定の値補間処理で任意の値の乗算を行う為の関数
   * 未指定の場合は frame * multiplier で算出
   * smooth=trueでframesの要素がnumberではない場合は必須
   * @param frame
   * @param multiplier
   * @returns
   */
  calcProduct?: (frame: any, multiplier: number) => any;

  /**
   * 独自の値の補間処理
   * @param frames
   * @param ratio
   * @param options
   * @returns
   */
  interpolateValue?: (frames: any[], ratio: number, options: GetItemByRatioOptions) => any;
};

/**
 * getItemByRatioの戻り値
 * [frame, index]
 */
export type GetItemByRatioResult = [any, number];
