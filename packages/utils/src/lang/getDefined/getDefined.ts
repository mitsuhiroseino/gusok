/**
 * 渡された引数のうち最も左側のundefinedでないものを返す
 * @param args
 */
export default function getDefined<V = any>(...args: V[]): V | undefined {
  const length = args.length;
  for (let i = 0; i < length; i++) {
    const value = args[i];
    if (value !== undefined) {
      return value;
    }
  }
  return;
}
