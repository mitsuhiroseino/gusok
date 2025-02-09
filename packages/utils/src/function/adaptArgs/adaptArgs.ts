/**
 * adaptFnで引数を編集した後にorgFnを実行する関数を生成する
 * @param fn
 * @param adapterFn
 * @returns
 */
export default function adaptArgs(
  fn: (...args: any[]) => unknown,
  adapterFn: (...args: any[]) => any[] | undefined | void,
) {
  return (...args: any[]): unknown => {
    // 編集した引数を本来の関数に渡して実行
    let adaptedArgs: any = adapterFn(...args);
    if (adaptedArgs === undefined) {
      // 何も返してこない場合はただの前処理。元の引数で実行
      adaptedArgs = args;
    }
    return fn.apply(null, adaptedArgs);
  };
}
