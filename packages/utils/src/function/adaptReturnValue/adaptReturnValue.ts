/**
 * fnの戻り値をadapterFnで編集した値を返す関数を生成する
 * @param fn
 * @param adapterFn
 * @returns
 */
export default function adaptReturnValue(
  fn: (...args: any[]) => unknown,
  adapterFn: (returnValue: unknown, ...args: any[]) => unknown | undefined | void,
) {
  return (...args: any[]): unknown => {
    // 編集した戻り値を返す
    const returnValue: unknown = fn(...args);
    let adaptedReturnValue: unknown | undefined | void = adapterFn(returnValue, ...args);
    if (adaptedReturnValue === undefined) {
      // 何も返してこない場合はただの後処理。元の戻り値を返す
      adaptedReturnValue = returnValue;
    }
    return adaptedReturnValue;
  };
}
