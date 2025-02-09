import debounce from 'lodash/debounce';

/**
 * debounceで実際に実行されるまでに渡された引数を纏めて対象の関数に渡して実行する関数を作成する
 * debounceでキャンセルされた実行分も纏めて実行したい場合に使用する
 * @param fn 対象の関数
 * @param wait 実行を待つ時間
 * @param debounceOprions debounceのオプション
 * @returns 引数を纏めて対象の関数を実行する関数
 */
export default function bunch<R = unknown>(
  fn: (argsList: any[][]) => R,
  wait?: number,
  debounceOprions?: any,
): (...args: any[]) => R | undefined {
  // 実際に実行されるまでに渡された引数のリスト
  const argsList: any[][] = [],
    // 引数のリストを対象の関数に渡して実行する関数
    debouncedFn = debounce(
      (latestArgsList: any[][]) => {
        const list = latestArgsList.concat([]);
        // 実行が確定したら引数のリストはクリア
        latestArgsList.length = 0;
        return fn(list);
      },
      wait,
      debounceOprions,
    );
  // 引数を溜め込んで実行する関数
  return (...args: any[]) => {
    argsList.push(args);
    return debouncedFn(argsList);
  };
}
