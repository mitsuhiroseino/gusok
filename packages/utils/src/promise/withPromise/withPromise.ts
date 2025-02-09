import { WithPromiseOptions } from './types';

/**
 * コールバックにのみ対応している非同期処理をPromiseに対応させる
 * @param execute 対象の処理を実行する関数
 * @returns
 */
export default function withPromise<R = any[]>(
  execute: (callback: (...args: any[]) => void) => void,
  options: WithPromiseOptions = {},
): Promise<R> {
  const { argIndex } = options;
  return new Promise((resolve) => {
    const callback = (...args: any[]) => {
      let result: R;
      if (argIndex != null) {
        result = args[argIndex];
      } else {
        result = args as R;
      }
      resolve(result);
    };
    execute(callback);
  });
}
